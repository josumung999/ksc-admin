"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { cn, fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { buttonVariants } from "@/components/ui/button";
import ProductItem, { ProductElement } from "@/components/Cards/ProductItem";
import Link from "next/link";
import DataPagination from "@/components/common/pagination";
import { useState } from "react";
import { Pagination } from "@/components/Tables/Pagination";
import FilterProductsForm from "@/components/Forms/Products/FilterProductsForm";

const ProductsPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryIdFilter, setCategoryIdFilter] = useState<
    string | undefined
  >();
  const [statusFilter, setStatusFilter] = useState<string | undefined>("");

  const { data, isLoading, error } = useSWR(
    `/api/v1/products?${statusFilter ? `status=${statusFilter}` : ""}&page=${currentPage}&limit=${limitPerPage}${
      categoryIdFilter ? `&categoryId=${categoryIdFilter}` : ""
    }${searchTerm ? `&search=${searchTerm}` : ""}`,
    fetcher,
  );

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useSWR("/api/v1/categories", fetcher);

  const categories = categoriesData?.data?.records;

  const products = data?.data?.records;
  const totalPages = data?.data?.meta?.totalPages;
  const totalRecords = data?.data?.meta?.total || 0;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les produits" />

      <div className="flex w-full flex-row items-center justify-end space-x-2">
        <Link
          className={cn(buttonVariants({ variant: "default" }), "bg-primary")}
          href="/manage/products/create"
        >
          Ajouter un produit
        </Link>
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : products?.length > 0 ? (
          <>
            <FilterProductsForm
              categoryIdFilter={categoryIdFilter}
              setCategoryIdFilter={setCategoryIdFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              categories={categories}
              setCurrentPage={setCurrentPage}
            />
            {products?.map((item: ProductElement) => (
              <ProductItem key={item.id} product={item} />
            ))}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={totalRecords}
              limitPerPage={limitPerPage}
              onPageChange={setCurrentPage}
            />
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

      <DataPagination totalPages={totalPages} />
    </DefaultLayout>
  );
};

export default ProductsPage;
