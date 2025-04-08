"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { useState } from "react";
import { Pagination } from "@/components/Tables/Pagination";
import { CreateCompteButton } from "@/components/Forms/Comptes/CreateCompteButton";
import ComptesTable from "@/components/Tables/Comptes";

const AccountingPlan = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(10);

  const { data, isLoading, error } = useSWR(
    `/api/v1/accounting/comptes?page=${currentPage}&limit=${limitPerPage}`,
    fetcher,
  );
  const ohadaAccounts = data?.data?.records;
  const totalRecords = data?.data?.totalRecords || 0;
  const totalPages = data?.data?.totalPages || 1;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Plan Comptable" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateCompteButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : ohadaAccounts?.length > 0 ? (
          <>
            <ComptesTable data={ohadaAccounts} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={totalRecords}
              limitPerPage={limitPerPage}
              onPageChange={setCurrentPage}
            />
          </>
        ) : error ? (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Une erreur est survenue
            </EmptyPlaceholder.Title>
          </EmptyPlaceholder>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>Aucun compte trouvé</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Commencez par créer un nouveau compte
            </EmptyPlaceholder.Description>
            <CreateCompteButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default AccountingPlan;
