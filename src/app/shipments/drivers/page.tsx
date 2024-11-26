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
      <Breadcrumb pageName="Gérer les livreurs" />
    </DefaultLayout>
  );
};

export default Drivers;
