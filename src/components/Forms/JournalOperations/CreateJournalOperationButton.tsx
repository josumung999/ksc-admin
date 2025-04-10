import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import JournalOperationForm from "./CreateJournalOperationForm";
import useSWR, { mutate } from "swr";
import { fetcher } from "@/lib/utils";
import { useState } from "react";
import PendingOperationsTable from "./PendingOperationsTable";
import axios from "axios";
import { AuthStore } from "@/store/authStore";
import { toast } from "react-toastify";
import { useRef } from "react";
import { useStoreState } from "pullstate";
import { JournalOperationStore } from "@/store/journalOperationStore";

interface Props {
  journalId: string;
  operationsKey?: string;
}

export function CreateJournalOperationButton({
  journalId,
  operationsKey,
}: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, error } = useSWR(
    "/api/v1/accounting/classes",
    fetcher,
  );
  const ohadaClasses = data?.data?.records;
  const {
    data: accountsData,
    isLoading: accountsLoading,
    error: accountsError,
  } = useSWR("/api/v1/accounting/comptes/all", fetcher);
  const ohadaAccounts = accountsData?.data?.records;
  const {
    data: rubricsData,
    isLoading: rubricsLoading,
    error: rubricsError,
  } = useSWR("/api/v1/accounting/rubrics", fetcher);
  const rubrics = rubricsData?.data?.records;

  const {
    data: departmentsData,
    isLoading: departmentsLoading,
    error: departmentsError,
  } = useSWR("/api/v1/accounting/departments", fetcher);
  const departments = departmentsData?.data?.records;
  const operations = useStoreState(JournalOperationStore);

  const handleSaved = () => {
    setTimeout(() => {
      tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 200); // Small delay to ensure DOM is updated
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="lg">
          <Plus className="mr-2 h-4 w-4" />
          Opération
        </Button>
      </SheetTrigger>
      <SheetContent className="lg:min-w-[40vw]">
        <SheetHeader>
          <SheetTitle>Enregistrer une opération</SheetTitle>
          <SheetDescription>
            Utilisez ce formulaire pour enregistrer une opération
          </SheetDescription>
        </SheetHeader>
        {isLoading ||
        accountsLoading ||
        rubricsLoading ||
        departmentsLoading ? (
          <div className="flex h-[30vh] items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
          </div>
        ) : error || accountsError || rubricsError || departmentsError ? (
          <p className="text-meta-1">
            Erreur:{" "}
            {error?.message ||
              accountsError?.message ||
              rubricsError?.message ||
              departmentsError?.message ||
              "Une erreur est survenue"}
          </p>
        ) : (
          <ScrollArea className="h-[100vh] w-full gap-4 py-4 pb-32">
            <JournalOperationForm
              accounts={ohadaAccounts}
              classes={ohadaClasses}
              journalId={journalId}
              setOpen={setOpen}
              rubrics={rubrics}
              departments={departments}
              onSaved={handleSaved}
            />
            <div ref={tableRef}>
              <PendingOperationsTable
                accounts={ohadaAccounts}
                classes={ohadaClasses}
              />
            </div>

            {operations.length === 2 && (
              <div className="mt-6 flex justify-end">
                <Button
                  disabled={loading}
                  onClick={async () => {
                    try {
                      setLoading(true);
                      for (const op of operations) {
                        await axios.post(
                          "/api/v1/journalOperations/create",
                          {
                            ...op,
                            amount: parseFloat(op.amount.replace(",", ".")),
                            date: new Date(op.date).toISOString(),
                          },
                          {
                            headers: {
                              Authorization:
                                "Bearer " + AuthStore.getRawState().user?.token,
                            },
                          },
                        );
                      }

                      toast.success("Les opérations ont été enregistrées");
                      JournalOperationStore.update(() => []);
                      mutate(operationsKey ?? null);
                      setOpen(false);
                    } catch (err) {
                      toast.error("Erreur lors de la confirmation");
                      console.error(err);
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {loading ? "Patientez..." : "Confirmer les 2 opérations"}
                </Button>
              </div>
            )}
          </ScrollArea>
        )}
      </SheetContent>
    </Sheet>
  );
}
