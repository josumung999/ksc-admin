"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreateClassButton } from "@/components/Forms/Classes/CreateClassButton";
import ClassesTable from "@/components/Tables/Classes";

const ClassesPage = () => {
  const { data, isLoading, error } = useSWR(
    "/api/v1/accounting/classes",
    fetcher,
  );
  const classes = data?.data?.records;

  console.log("Classes Comptables: ", classes);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Classes comptables" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateClassButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : classes?.length > 0 ? (
          <ClassesTable data={classes} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune classe comptable trouvée
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Commencez par créer une nouvelle classe comptable
            </EmptyPlaceholder.Description>
            <CreateClassButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ClassesPage;
