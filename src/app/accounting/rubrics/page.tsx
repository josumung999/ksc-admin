"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";

import { useState } from "react";
import { CreateRubricButton } from "@/components/Forms/Rubrics/CreateRubricButton";
import RubricsTable from "@/components/Tables/Rubrics";

const RubricsSettings = () => {
  const { data, isLoading, error } = useSWR(
    `/api/v1/accounting/rubrics`,
    fetcher,
  );

  const rubrics = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Rubriques comptables" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateRubricButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : rubrics?.length > 0 ? (
          <RubricsTable data={rubrics} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune rubrique trouvée
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Aucune rubrique n&apos;a été trouvée pour cette recherche
            </EmptyPlaceholder.Description>
            <CreateRubricButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default RubricsSettings;
