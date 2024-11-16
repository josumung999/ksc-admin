"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { cn, fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { buttonVariants } from "@/components/ui/button";
import ProductInventoryItem from "@/components/Cards/Inventory/ProductIventoryItem";
import Link from "next/link";
import { SearchBar } from "@/components/common/searchBar";
import { ProductInventoryElement } from "@/components/types_interfaces/productType";

const ProductsInventoryPage = ({ searchParams }: { searchParams: any }) => {
  //default of searchName Params is ""
  const searchName: string = searchParams.searchName ?? "";
  //load all the products data
  const { data, isLoading, error } = useSWR(
    `/api/v1/products?searchName=${searchName}`,
    fetcher,
  );

  const products = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Inventaire" />

      <SearchBar
        link="/stock/inventory"
        type="search"
        placeholder="Chercher un produit"
      />
      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : products?.length > 0 ? (
          <>
            {products?.map((item: ProductInventoryElement) => (
              <ProductInventoryItem key={item.id} product={item} />
            ))}
          </>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucun produit trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Veuillez créer un produit pour voir son iventaire
            </EmptyPlaceholder.Description>
            <Link
              className={cn(
                buttonVariants({ variant: "default" }),
                "bg-primary",
              )}
              href="/manage/products/create"
            >
              Ajouter un produit
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProductsInventoryPage;
