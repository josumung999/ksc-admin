import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Gérer les listes de souhaits -  KSC Supermarché Admin",
  description: "Créer les listes de souhaits -  KSC Supermarché Admin",
};

const WishList = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Listes de souhaits" />
      </div>
    </DefaultLayout>
  );
};

export default WishList;
