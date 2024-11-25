"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { CreateClientButton } from "@/components/Forms/Clients/CreateClientButton";
import { clientType } from "@/types/clientType";
import React from "react";
import { useRouter } from "next/router";
interface clientPops {
  client: clientType;
}

//////////////////////////////in working ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////

const ClientDetails: React.FC<clientPops> = ({ client }) => {
  //we need to fetch again the client's data (must implement other features like "purchaced product....")
  const router = useRouter();

  return (
    <DefaultLayout>
      <Breadcrumb pageName={"Informations du client"} />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateClientButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        Client details here
      </div>
    </DefaultLayout>
  );
};

export default ClientDetails;
