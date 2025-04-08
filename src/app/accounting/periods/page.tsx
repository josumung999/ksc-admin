"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreatePeriodComptableButton } from "@/components/Forms/PeriodComptables/CreatePeriodComptableButton";
import PeriodComptablesTable from "@/components/Tables/PeriodComptables";

const PeriodComptables = () => {
  const { data, isLoading, error } = useSWR(
    "/api/v1/accounting/periodes",
    fetcher,
  );
  const periodComptable = data?.data?.records;

  console.log("Period Comptables: ", periodComptable);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Périodes comptables" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreatePeriodComptableButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : periodComptable?.length > 0 ? (
          <PeriodComptablesTable data={periodComptable} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune période comptable trouvée
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Commencez par créer une nouvelle période comptable
            </EmptyPlaceholder.Description>
            <CreatePeriodComptableButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default PeriodComptables;
