import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export const metadata: Metadata = {
  title: "Avis Clients -  KSC Supermarché Admin",
  description: "Avis Clients -  KSC Supermarché Admin",
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
