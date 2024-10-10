import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Gérer les paniers -  EasyLife Admin",
  description: "Gérer les paniers -  EasyLife Admin",
};

const Carts = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Paniers" />
      </div>
    </DefaultLayout>
  );
};

export default Carts;
