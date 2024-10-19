"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { DependencyType } from "@/components/ui/auto-form/types";
import { toast } from "@/hooks/use-toast";
import { fetcher } from "@/lib/utils";
import { AuthStore } from "@/store/authStore";
import { handleChange } from "@/store/newProductStore";
import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import * as z from "zod";

const useFormSchema = (token: string, selectedCategory: any) => {
  const {
    data,
    error,
    isLoading: loading,
  } = useSWR("/api/v1/categories", fetcher, {
    revalidateOnFocus: true,
  });

  const [category, setCategory] = React.useState<string | null>(null);

  const schema = React.useMemo(() => {
    if (!data) return null;

    const categories = data?.data?.records;

    const categoriesWithNoParent = categories
      ?.filter((cat: any) => cat.parentId === null)
      .map((cat: any) => cat.name);

    const selectedSubCategories =
      category && category !== "Aucune"
        ? categories
            .find((cat: any) => cat?.name === category)
            ?.subcategories.map((sub: any) => sub.name) || []
        : [];

    return z.object({
      category: z
        .enum(["Aucune", ...categoriesWithNoParent])
        .describe("Catégorie principale")
        .default(selectedCategory ? selectedCategory?.parent?.name : "")
        .transform((val) => {
          setCategory(val);
          return val;
        }),

      subCategory: z
        .enum(["Aucune", ...selectedSubCategories])
        .describe("Sous-catégorie")
        .default("")
        .optional(),
    });
  }, [data, category, selectedCategory]);

  return { schema, loading, error };
};

interface ProductCategoriesProps {
  category?: any;
}

export default function ProductCategories({
  category,
}: ProductCategoriesProps) {
  const { user } = AuthStore.useState();
  const { schema, loading, error } = useFormSchema(user.token, category);

  if (loading) {
    return (
      <div className="flex h-[30vh] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-meta-1">Erreur: {error}</p>;
  }

  return schema ? (
    <AutoForm
      formSchema={schema}
      fieldConfig={{}}
      onValuesChange={({ category = "", subCategory = "" }) => {
        handleChange("category", category);
        handleChange("subCategory", subCategory);
      }}
    />
  ) : null;
}
