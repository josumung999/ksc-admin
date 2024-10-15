"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import Roles from "@/components/Tables/Roles";
import { CreateRoleButton } from "@/components/Forms/Roles/CreateRoleButton";

const RolesSettings = () => {
  const { data, isLoading, error } = useSWR("/api/v1/roles", fetcher);
  const roles = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les Rôles" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateRoleButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : roles?.length > 0 ? (
          <Roles data={roles} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>Aucun rôle trouvé</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Aucun rôle trouvé
            </EmptyPlaceholder.Description>
            <CreateRoleButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default RolesSettings;
