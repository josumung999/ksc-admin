import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Gérer les profils d'utilisateurs -  EasyLife Admin",
  description: "Gérer les profils d'utilisateurs -  EasyLife Admin",
};

const Profiles = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Gérer les profils d'utilisateurs" />
      </div>
    </DefaultLayout>
  );
};

export default Profiles;
