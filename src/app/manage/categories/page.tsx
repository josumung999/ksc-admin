import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Gérer les catégories -  EasyLife Admin",
  description: "Gérer les catégories -  EasyLife Admin",
};

const Categories = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Gérer les catégories" />
      </div>
    </DefaultLayout>
  );
};

export default Categories;
