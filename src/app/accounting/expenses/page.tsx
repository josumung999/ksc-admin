"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import SpendingsTable from "@/components/Tables/Spendings";

const ExpensesPage = () => {
  const { data, isLoading, error } = useSWR(
    `/api/v1/accounting/journalOperations?type=LIABILITY&status=INTERNAL`,
    fetcher,
  );
  const operations = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dépenses" />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : operations?.length > 0 ? (
          <SpendingsTable data={operations} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune dépense trouvée
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Commencez par enregistrer des dépenses
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ExpensesPage;
