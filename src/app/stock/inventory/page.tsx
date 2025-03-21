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
import { ProductInventoryElement } from "@/types/productType";
import { useState } from "react";
import FilterCreateOrderForm from "@/components/Forms/orders/FilterCreateOrderForm";
import { Pagination } from "@/components/Tables/Pagination";
const ProductsInventoryPage = ({ searchParams }: { searchParams: any }) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryIdFilter, setCategoryIdFilter] = useState<
    string | undefined
  >();
  const [statusFilter, setStatusFilter] = useState<string | undefined>("");
  //load all the products data
  const { data, isLoading, error } = useSWR(
    `/api/v1/products?${statusFilter ? `status=${statusFilter}` : ""}&page=${currentPage}&limit=${limitPerPage}${
      categoryIdFilter ? `&categoryId=${categoryIdFilter}` : ""
    }${searchTerm ? `&search=${searchTerm}` : ""}`,
    fetcher,
  );

  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    error: erroCategories,
  } = useSWR("/api/v1/categories", fetcher);

  const products = data?.data?.records;

  const categories = categoriesData?.data?.records;

  const totalPages = data?.data?.meta?.totalPages || 1;
  const totalRecords = data?.data?.meta?.total || 0;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Inventaire" />
      <div className="flex min-h-screen flex-col gap-10">
        {isLoadingCategories ? null : (
          <FilterCreateOrderForm
            categoryIdFilter={categoryIdFilter}
            setCategoryIdFilter={setCategoryIdFilter}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            categories={categories}
            setCurrentPage={setCurrentPage}
          />
        )}
        {isLoading ? (
          <DataLoader />
        ) : products?.length > 0 ? (
          <>
            {products?.map((item: ProductInventoryElement) => (
              <ProductInventoryItem key={item.id} product={item} />
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
