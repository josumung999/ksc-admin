"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { BalanceComptableEntry, fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { useState } from "react";
import { AuthStore } from "@/store/authStore";
import BalanceSheetForm from "@/components/Forms/BalanceSheet";
import BalanceComptableTable from "@/components/Tables/BalanceSheet";
import BalanceSheetActions from "@/components/Forms/BalanceSheet/BalanceSheetActions";

const BalanceComptable = () => {
  const [records, setRecords] = useState<{
    data: BalanceComptableEntry[];
    currency: string;
    year: string;
  }>({
    data: [],
    currency: "",
    year: "",
  });
  const { user } = AuthStore.useState();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Balance Comptable" />

      <>
        <div className="w-full">
          <BalanceSheetForm
            setRecords={setRecords}
            setIsLoading={setIsLoading}
            setError={setError}
          />
        </div>

        <div className="flex min-h-screen flex-col gap-10">
          {isLoading ? (
            <DataLoader />
          ) : records?.data?.length > 0 ? (
            <>
              <BalanceSheetActions
                balanceEntries={records?.data}
                meta={{
                  exercise: `Exercice ${records?.year}`,
                  reportNumber: Math.floor(100000 + Math.random() * 900000),
                  printedBy: `${user?.firstName} ${user?.lastName}`,
                  printedDate: new Date(),
                  currency: records?.currency,
                }}
              />
              <BalanceComptableTable
                data={records?.data}
                currency={records.currency}
              />
            </>
          ) : (
            <EmptyPlaceholder>
              <EmptyPlaceholder.Icon />
              <EmptyPlaceholder.Title>
                Aucune entrée trouvée
              </EmptyPlaceholder.Title>
              <EmptyPlaceholder.Description>
                Aucune donnée de balance comptable trouvée pour cette année
              </EmptyPlaceholder.Description>
            </EmptyPlaceholder>
          )}
        </div>
      </>
    </DefaultLayout>
  );
};

export default BalanceComptable;
