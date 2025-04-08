import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Edit } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { CreatePeriodComptableForm } from "./CreatePeriodComptable.tsx";

interface UpdatePeriodComptableButtonProps {
  periodComptable: any;
}

export function UpdatePeriodComptableButton({
  periodComptable,
}: UpdatePeriodComptableButtonProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useSWR(
    "/api/v1/accounting/exercices",
    fetcher,
  );
  const exercises = data?.data?.records;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="border-none hover:text-meta-3"
          variant="outline"
          size="icon"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier période comptable</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour modifier cet période comptable
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLoading ? (
            <div className="flex h-[30vh] items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
          ) : error ? (
            <p className="text-meta-1">
              Erreur: {error?.message || "Une erreur est survenue"}
            </p>
          ) : (
            <CreatePeriodComptableForm
              exercices={exercises}
              setOpen={setOpen}
              periodComptable={periodComptable}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
