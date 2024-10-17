import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Gérer les articles -  EasyLife Admin",
  description: "Gérer les articles -  EasyLife Admin",
};

const Articles = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Gérer les articles" />
      </div>
    </DefaultLayout>
  );
};

export default Articles;
