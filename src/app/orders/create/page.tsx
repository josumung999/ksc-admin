"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreateUserButton } from "@/components/Forms/Users/CreateUserButton";
import UsersTable from "@/components/Tables/Users";
import { useState } from "react";
import { clientType } from "@/components/types_interfaces/clientType";
import SearchDialogClient from "@/components/common/searchBar/order/client";
import ClientInformations from "@/components/Forms/orders/client/clientInformation";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderClientDetail from "@/components/Sections/orders/clientDisplayDetail";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
const NewOrder = () => {
  //   const { data, isLoading, error } = useSWR(
  //     "/api/v1/auth/users?page=1&limit=10",
  //     fetcher,
  //   );
  //   const users = data?.data?.records;

  const [clientData, setClientData] = useState<clientType | null | undefined>(
    null,
  );

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Creer une commende" />

      <div className="flex w-full flex-row items-center justify-end"></div>

      <div className=" flex min-h-screen w-full flex-col justify-between gap-5 md:flex-row">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <p className="font-bold">Information du client</p>
            {clientData && (
              <Button
                onClick={() => setClientData(null)}
                className="p-1"
                variant={"outline"}
              >
                {" "}
                <Edit className="h-5 w-5" />
              </Button>
            )}
          </div>
          <ScrollArea>
            {!clientData && <ClientInformations setData={setClientData} />}
            {clientData && <OrderClientDetail client={clientData} />}
          </ScrollArea>
        </div>

        <ScrollArea>
          <ClientInformations setData={setClientData} />
        </ScrollArea>
      </div>
    </DefaultLayout>
  );
};

export default NewOrder;
