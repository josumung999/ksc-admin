"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { DependencyType } from "@/components/ui/auto-form/types";
import { toast } from "@/hooks/use-toast";
import { fetcher } from "@/lib/utils";
import { AuthStore } from "@/store/authStore";
import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import * as z from "zod";

const useFormSchema = (token: string, category: any) => {
  const {
    data,
    error,
    isLoading: loading,
  } = useSWR("/api/v1/categories", fetcher, {
    revalidateOnFocus: true, // Revalidate on focus
  });

  const schema = React.useMemo(() => {
    if (!data) return null;

    const categories = data?.data?.records.map(
      (category: any) => category.name,
    );

    return z.object({
      name: z
        .string({ required_error: "Nom obligatoire" })
        .describe("Nom de la catégorie")
        .default(category ? category?.name : ""),
      description: z
        .string()
        .describe("Description de la catégorie")
        .default(category ? category?.description : "")
        .optional(),
      parentName: z
        .enum(["Aucune catégorie", ...categories])
        .describe("Catégorie parente")
        .default(category ? category?.parent?.name : "")
        .optional(),
    });
  }, [data, category]);

  return { schema, loading, error };
};

interface CreateCategoryFormProps {
  category?: any;
  setOpen: any;
}

export default function CreateCategoryForm({
  category,
  setOpen,
}: CreateCategoryFormProps) {
  const { user } = AuthStore.useState();
  const { schema, loading, error } = useFormSchema(user.token, category);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const url = category
        ? `/api/v1/categories/${category.id}`
        : "/api/v1/categories/create";
      const method = category ? "put" : "post";

      const { data: response } = await axios({
        method,
        url,
        data: {
          ...data,
        },
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });

      console.log("Response Data:", response);

      toast({
        title: category
          ? "Categorie mise à jour avec succès!"
          : "Categorie créée avec succès!",
        description: "Enregistré avec avec succès!",
      });

      mutate("/api/v1/categories");

      setOpen(false);
    } catch (error) {
      toast({
        title: category
          ? "Erreur lors de la mise à jour de la catégorie"
          : "Erreur lors de la création de la catégorie",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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
      onSubmit={onSubmit}
      formSchema={schema}
      fieldConfig={{
        name: {
          inputProps: {
            placeholder: "Ex: Ventilateur",
          },
        },
        description: {
          inputProps: {
            placeholder:
              "Ex: Cette catégorie couvre l'ensemble de nos ventilateurs",
          },
          fieldType: "textarea",
        },
      }}
    >
      <AutoFormSubmit disabled={isLoading}>
        {isLoading ? "Patientez..." : category ? "Mettre à jour" : "Créer"}
      </AutoFormSubmit>
    </AutoForm>
  ) : null;
}
