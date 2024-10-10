import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Gérer les clients -  EasyLife Admin",
  description: "Gérer les clients -  EasyLife Admin",
};

const Clients = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Gérer les clients" />
      </div>
    </DefaultLayout>
  );
};

export default Clients;
