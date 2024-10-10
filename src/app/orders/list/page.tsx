import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Gérer les commandes -  EasyLife Admin",
  description: "Gérer les commandes -  EasyLife Admin",
};

const Orders = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Gérer les commandes" />
      </div>
    </DefaultLayout>
  );
};

export default Orders;
