import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Créer une commande -  EasyLife Admin",
  description: "Créer une commande -  EasyLife Admin",
};

const CreateOrder = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Créer commande" />
      </div>
    </DefaultLayout>
  );
};

export default CreateOrder;
