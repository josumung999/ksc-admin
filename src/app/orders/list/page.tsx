"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrdersTable from "@/components/Tables/Orders";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
// export const metadata: Metadata = {
//   title: "Gérer les commandes -  EasyLife Admin",
//   description: "Gérer les commandes -  EasyLife Admin",
// };

const Orders = () => {
  const data = [
    {
      client: {
        name: "Jonh doe",
        phoneNumber: "+243993889439",
      },
      date: "12/12/2012",
      totalPrice: 112,
      deliveryman: {
        name: "Olinge Junior",
        phoneNumber: "+243993889439",
      },
      status: "CANCEL",
    },
    {
      client: {
        name: "Jonh doe",
        phoneNumber: "+243993889439",
      },
      date: "12/12/2012",
      totalPrice: 112,
      deliveryman: {
        name: "Olinge Junior",
        phoneNumber: "+243993889439",
      },
      status: "DONE",
    },
  ];

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

      {/* <div className="flex w-full flex-row items-center justify-end">
        <CreateClientButton />
      </div> */}

      {/* search by client implemented soon  */}
      {/* <SearchBar
        link="/manage/clients"
        type="search"
        placeholder="Chercher un client"
      /> */}

      {/* <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : clients?.length > 0 ? (
          <Clients data={clients} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>Aucun client trouvé</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Aucun client trouvé
            </EmptyPlaceholder.Description>
            <CreateClientButton />
          </EmptyPlaceholder>
        )}
      </div> */}

      <OrdersTable data={data} />
      {/* <DataPagination length={clients} /> */}
    </DefaultLayout>
  );
};

export default Orders;
