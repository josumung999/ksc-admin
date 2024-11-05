"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreatePermissionButton } from "@/components/Forms/Permissions/CreatePermissionButton";
import Permissions from "@/components/Tables/Permissions";
import { CreateAttributeButton } from "@/components/Forms/Attributes/CreateAttributeButton";
import AttributesTable from "@/components/Tables/Attributes";

const ProductsAttributesPage = () => {
  const { data, isLoading, error } = useSWR("/api/v1/attributes", fetcher);
  const attributes = data?.data?.records;

  console.log("attributes", attributes);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les attributs" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateAttributeButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : attributes?.length > 0 ? (
          <AttributesTable data={attributes} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucun attribut trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Commencez par ajouter les attributs de produit
            </EmptyPlaceholder.Description>
            <CreateAttributeButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProductsAttributesPage;
