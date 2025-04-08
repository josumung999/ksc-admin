"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import DepartmentsTable from "@/components/Tables/Departments";
import { CreateDepartmentButton } from "@/components/Forms/Departments/CreateDepartmentButton";

const DepartmentSettings = () => {
  const { data, isLoading, error } = useSWR(
    `/api/v1/accounting/departments`,
    fetcher,
  );

  const departments = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Départements" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateDepartmentButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : departments?.length > 0 ? (
          <DepartmentsTable data={departments} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucun département trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Aucun département n&apos;a été trouvé pour cette recherche
            </EmptyPlaceholder.Description>
            <CreateDepartmentButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default DepartmentSettings;
