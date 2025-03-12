"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrdersTable from "@/components/Tables/Orders";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import useSWR from "swr";
import { OrderType } from "@/types/getOrderType";
import { fetcher } from "@/lib/utils";
import { useState } from "react";
import { Pagination } from "@/components/Tables/Pagination";
import FilterOrdersForm from "@/components/Forms/orders/FilterOrdersForm";

const Orders = () => {
  const [statusFilter, setStatusFilter] = useState<string | undefined>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(10);

  const { data, isLoading, error } = useSWR(
    `/api/v1/orders?${statusFilter ? `status=${statusFilter}` : ""}&page=${currentPage}&limit=${limitPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    fetcher,
  );

  const orders = data?.data?.records;
  const ordersData: OrderType[] = orders;
  const totalPages: number = data?.data?.meta?.totalPages || 1;

  const totalRecords = data?.data?.meta?.total || 0;
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les commandes" />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : ordersData ? (
          <>
            <FilterOrdersForm
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              setCurrentPage={setCurrentPage}
              setStatusFilter={setStatusFilter}
              statusFilter={statusFilter}
            />

            {ordersData.length > 0 ? (
              <>
                <OrdersTable data={ordersData} />

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalRecords={totalRecords}
                  limitPerPage={limitPerPage}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <EmptyPlaceholder>
                <EmptyPlaceholder.Icon />
                <EmptyPlaceholder.Title>
                  Aucune commande trouvée
                </EmptyPlaceholder.Title>
              </EmptyPlaceholder>
            )}
          </>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune commande trouvée
            </EmptyPlaceholder.Title>
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Orders;
