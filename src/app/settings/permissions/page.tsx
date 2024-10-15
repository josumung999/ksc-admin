"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreatePermissionButton } from "@/components/Forms/Permissions/CreatePermissionButton";
import Permissions from "@/components/Tables/Permissions";

const PermissionsSettings = () => {
  const { data, isLoading, error } = useSWR("/api/v1/permissions", fetcher);
  const permissions = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les Permissions" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreatePermissionButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : permissions?.length > 0 ? (
          <Permissions data={permissions} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune permission trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Aucune permission trouvé
            </EmptyPlaceholder.Description>
            <CreatePermissionButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default PermissionsSettings;
