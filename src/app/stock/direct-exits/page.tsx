import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Sorties directe -  EasyLife Admin",
  description: "Sorties directe -  EasyLife Admin",
};

const DirectExits = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Sorties directe" />
      </div>
    </DefaultLayout>
  );
};

export default DirectExits;
