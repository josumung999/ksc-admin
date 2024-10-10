import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Gérer les véhicules -  EasyLife Admin",
  description: "Gérer les véhicules -  EasyLife Admin",
};

const Vehicles = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Gérer les véhicules" />
      </div>
    </DefaultLayout>
  );
};

export default Vehicles;
