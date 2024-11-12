"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreateCategoryButton } from "@/components/Forms/Categories/CreateCategoryButton";
import Categories from "@/components/Tables/Categories";

const CategoriesPage = () => {
  const { data, isLoading, error } = useSWR("/api/v1/categories", fetcher);
  const categories = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les Catégories" />

      <div className="flex w-full flex-row items-center justify-end">
        <CreateCategoryButton />
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : categories?.length > 0 ? (
          <Categories data={categories} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucune catégorie trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Aucune catégorie trouvé
            </EmptyPlaceholder.Description>
            <CreateCategoryButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default CategoriesPage;
