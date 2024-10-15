"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreateUserButton } from "@/components/Forms/Users/CreateUserButton";

const UserSettings = () => {
  const { data, isLoading, error } = useSWR(
    "/api/v1/auth/users?page=1&limit=10",
    fetcher,
  );
  const users = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les utilisateurs" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateUserButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : users?.length > 0 ? (
          <p>Users table here</p>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucun utilisateur trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Aucun utilisateur trouvé
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default UserSettings;
