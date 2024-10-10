import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Avis Clients -  EasyLife Admin",
  description: "Avis Clients -  EasyLife Admin",
};

const Reviews = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Avis clients" />
      </div>
    </DefaultLayout>
  );
};

export default Reviews;
