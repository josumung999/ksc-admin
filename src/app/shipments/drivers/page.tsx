import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Gérer les chauffeurs -  EasyLife Admin",
  description: "Gérer les chauffeurs -  EasyLife Admin",
};

const Drivers = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Gérer les chauffeurs" />
      </div>
    </DefaultLayout>
  );
};

export default Drivers;
