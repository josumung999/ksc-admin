import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Créer un produit -  EasyLife Admin",
  description: "Créer un produit -  EasyLife Admin",
};

const CreateProduct = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Créer un produit" />
    </DefaultLayout>
  );
};

export default CreateProduct;
