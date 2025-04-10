import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import DateRangePicker from "@/components/Forms/DateRangePicker";
import { CreateJournalOperationButton } from "@/components/Forms/JournalOperations/CreateJournalOperationButton";
import JournalOperationsTable from "@/components/Tables/JournalOperations";
import { Pagination } from "@/components/Tables/Pagination";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { cn, fetcher } from "@/lib/utils";
import { AuthStore } from "@/store/authStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

export interface Props {
  journal: any;
}
export const formSchema = z.object({
  dateRange: z
    .array(z.date())
    .length(2, { message: "Veuillez choisir une plage de 2 dates" }),
});

export type FormData = z.infer<typeof formSchema>;
const JournalOperations: React.FC<Props> = ({ journal }) => {
  const { user } = AuthStore.useState();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = form;
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(10);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const operationsKey = `/api/v1/accounting/journalOperations?id=${journal.id}&page=${currentPage}&limit=${limitPerPage}${startDate ? `&startDate=${startDate}` : ""}${endDate ? `&endDate=${endDate}` : ""}`;

  const { data, isLoading, error } = useSWR(operationsKey, fetcher);

  const operations = data?.data?.records;
  const totalRecords = data?.data?.totalRecords || 0;
  const totalPages = data?.data?.totalPages || 1;
  const totalDebit = data?.data?.totalDebit || 0;
  const totalCredit = data?.data?.totalCredit || 0;

  const onSubmit = async (data: FormData) => {
    const [start, end] = data.dateRange;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-row items-center justify-between">
        <div className="flex-1">
          <Form {...form}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-row items-center gap-x-2"
            >
              <div className="w-[300px]">
                <Controller
                  name="dateRange"
                  control={control}
                  render={({ field }) => (
                    <DateRangePicker
                      name="dateRange"
                      control={control}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.dateRange && (
                  <p className="text-meta-1">{errors.dateRange.message}</p>
                )}
              </div>
              <Button className="p-6" type="submit">
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </Form>
        </div>
        <CreateJournalOperationButton
          journalId={journal.id}
          operationsKey={operationsKey}
        />
      </div>
      {isLoading ? (
        <div className="flex h-[30vh] items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      ) : operations?.length > 0 ? (
        <>
          <JournalOperationsTable
            data={operations}
            onDelete={() => console.log("Delete clicked")}
            journalStatus={journal.status}
            totalDebit={totalDebit}
            totalCredit={totalCredit}
          />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalRecords={totalRecords}
            limitPerPage={limitPerPage}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon />
          <EmptyPlaceholder.Title>
            Aucune opération pour le moment
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Commencez par enregistrer une opération
          </EmptyPlaceholder.Description>
          <CreateJournalOperationButton
            journalId={journal.id}
            operationsKey={operationsKey}
          />
        </EmptyPlaceholder>
      )}
    </div>
  );
};

export default JournalOperations;
