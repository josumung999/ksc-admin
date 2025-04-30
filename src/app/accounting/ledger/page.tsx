"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { useState } from "react";
import { AuthStore } from "@/store/authStore";
import AccountLedgerForm from "@/components/Forms/AccountLedger";
import AccountLedgerActions from "@/components/Forms/AccountLedger/AccountLedgerActions";
import AccountLedgerTable from "@/components/Tables/AccountLedger";

const GrandLivre = () => {
  const [records, setRecords] = useState<any>({
    data: [],
  });
  const { user } = AuthStore.useState();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {
    data: ohadaAccountsData,
    isLoading: ohadaAccountsLoading,
    error: ohadaAccountsError,
  } = useSWR(`/api/v1/accounting/comptes/all`, fetcher);
  const accounts = ohadaAccountsData?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Grand Livre Comptable" />

      {ohadaAccountsLoading ? (
        <DataLoader />
      ) : accounts ? (
        <>
          <div className="w-full">
            <AccountLedgerForm
              setRecords={setRecords}
              setIsLoading={setIsLoading}
              setError={setError}
              accounts={accounts}
            />
          </div>

          <div className="flex min-h-screen flex-col gap-10">
            {isLoading ? (
              <DataLoader />
            ) : records?.data?.length > 0 ? (
              <>
                <AccountLedgerActions
                  ledgerData={records?.data}
                  meta={{
                    exercise: "Exercice",
                    reportNumber: Math.floor(100000 + Math.random() * 900000),
                    printedBy: `${user?.firstName} ${user?.lastName}`,
                    printedDate: new Date(),
                    account: String(
                      records?.data[0]?.sousCompte?.intermediateAccount,
                    ),
                    currency: records?.currency,
                  }}
                />
                <AccountLedgerTable
                  data={records?.data}
                  currencyCode={records.currency}
                />
              </>
            ) : (
              <EmptyPlaceholder>
                <EmptyPlaceholder.Icon />
                <EmptyPlaceholder.Title>
                  Aucune entrée trouvée
                </EmptyPlaceholder.Title>
                <EmptyPlaceholder.Description>
                  Les données du grand livre s&apos;afficheront ici
                </EmptyPlaceholder.Description>
              </EmptyPlaceholder>
            )}
          </div>
        </>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon />
          <EmptyPlaceholder.Title>Aucune entrée trouvée</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Les données du grand livre s&apos;afficheront ici
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
    </DefaultLayout>
  );
};

export default GrandLivre;
