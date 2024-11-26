"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrdersTable from "@/components/Tables/Orders";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import useSWR from "swr";
import { OrderType } from "@/types/getOrderType";
import DataPagination from "@/components/common/pagination";
import { fetcher } from "@/lib/utils";
import DatePickerWithRange from "@/components/ui/date-pickerWithRange";
import { DateRange } from "react-day-picker";
import { useState } from "react";

const Orders = () => {
  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const { data, isLoading, error } = useSWR(
    `/api/v1/orders?${date?.from && date?.to ? `startDate=${date.from.toISOString().slice(0, 10)}&endDate=${date.to.toISOString().slice(0, 10)}` : ""}&page=1`,
    fetcher,
  );

  const orders = data?.data?.records;
  const ordersData: OrderType[] = orders?.orders;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les commandes" />

      <div className="flex w-full justify-end">
        <Link href={"/orders/create"}>
          <Button
            variant={"outline"}
            size={"lg"}
            className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-4 py-4 text-center font-medium text-white hover:bg-opacity-90 dark:bg-slate-200 dark:text-black lg:px-5 xl:px-6"
          >
            <Plus size={15} /> Commande
          </Button>
        </Link>
      </div>

      <DatePickerWithRange setDateParant={setDate} />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : ordersData?.length > 0 ? (
          <div className="flex flex-col gap-10">
            <OrdersTable data={ordersData} />
            <DataPagination totalPages={orders?.meta?.totalPages} />
          </div>
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
