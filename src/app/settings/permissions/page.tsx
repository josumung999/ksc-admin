import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Gérer les permissions -  EasyLife Admin",
  description: "Gérer les permissions -  EasyLife Admin",
};

const PermissionSettings = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Gérer les permissions" />
      </div>
    </DefaultLayout>
  );
};

export default PermissionSettings;
