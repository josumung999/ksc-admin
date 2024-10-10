import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Inventaire -  EasyLife Admin",
  description: "Inventaire -  EasyLife Admin",
};

const DirectEntries = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Inventaire" />
      </div>
    </DefaultLayout>
  );
};

export default DirectEntries;
