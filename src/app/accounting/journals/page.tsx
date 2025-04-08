"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import JournalsTable from "@/components/Tables/Journals";
import { CreateJournalButton } from "@/components/Forms/Journals/CreateJournalButton";

const Journals = () => {
  const { data, isLoading, error } = useSWR(
    "/api/v1/accounting/journals",
    fetcher,
  );
  const journals = data?.data?.records;

  console.log("Journaux Comptables: ", journals);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Journaux comptables" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateJournalButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : journals?.length > 0 ? (
          <JournalsTable data={journals} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucun journal trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Commencez par créer un nouveau journal
            </EmptyPlaceholder.Description>
            <CreateJournalButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Journals;
