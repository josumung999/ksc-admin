import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Performances des livreurs -  EasyLife Admin",
  description: "Performances des livreurs -  EasyLife Admin",
};

const Performances = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Performances des livreurs" />
      </div>
    </DefaultLayout>
  );
};

export default Performances;
