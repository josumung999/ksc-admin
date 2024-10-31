"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreatePermissionButton } from "@/components/Forms/Permissions/CreatePermissionButton";
import Permissions from "@/components/Tables/Permissions";
import { CreateCategoryButton } from "@/components/Forms/Categories/CreateCategoryButton";
import Categories from "@/components/Tables/Categories";
import { Button } from "@/components/ui/button";
import ProductItem, { ProductElement } from "@/components/Cards/ProductItem";

const ProductsPage = () => {
  const { data, isLoading, error } = useSWR("/api/v1/products", fetcher);
  const products = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les produits" />

      <div className="flex w-full flex-row items-center justify-end">
        <Button>Créer un produit</Button>
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : products?.length > 0 ? (
          <>
            {products?.map((item: ProductElement) => (
              <ProductItem key={item.id} product={item} />
            ))}
          </>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucun produit trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Veuillez créer un produit pour commencer
            </EmptyPlaceholder.Description>
            <Button>Créer un produit</Button>
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProductsPage;
