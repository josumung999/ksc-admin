"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreateExerciceComptableButton } from "@/components/Forms/ExerciceComptables/CreateExerciceComptableButton";
import ExercicesComptablesTable from "@/components/Tables/ExercicesComptables";

const ExercicesComptables = () => {
  const { data, isLoading, error } = useSWR(
    "/api/v1/accounting/exercices",
    fetcher,
  );
  const exercicesComptables = data?.data?.records;

  console.log("Exercices Comptables: ", exercicesComptables);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Exercices Comptables" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateExerciceComptableButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : exercicesComptables?.length > 0 ? (
          <ExercicesComptablesTable data={exercicesComptables} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucun exercice comptable trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Commencez par créer un nouvel exercice comptable
            </EmptyPlaceholder.Description>
            <CreateExerciceComptableButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ExercicesComptables;
