"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import ImmobilisationsTable from "@/components/Tables/Immobilisations";

const ImmobilisationsPage = () => {
  const { data, isLoading, error } = useSWR(
    "/api/v1/accounting/immobilisations",
    fetcher,
  );
  const immobilisations = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Immobilisations" />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : immobilisations?.length > 0 ? (
          <ImmobilisationsTable data={immobilisations} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune immobilisation trouvée
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Commencez par enregistrer des immobilisations
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ImmobilisationsPage;
