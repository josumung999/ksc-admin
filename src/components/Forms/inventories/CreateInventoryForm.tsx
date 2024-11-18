"use client";
import {
  inventoryType,
  typeType,
} from "@/components/types_interfaces/invetory.type";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { toast } from "@/hooks/use-toast";
import { fetcher } from "@/lib/utils";
import { AuthStore } from "@/store/authStore";
import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import * as z from "zod";
import { useParams } from "next/navigation";
const useFormSchema = (inventory: inventoryType) => {
  const params = useParams();
  const {
    data,
    error,
    isLoading: loading,
  } = useSWR(
    `/api/v1/inventories/${params.productVariantId}/${inventory?.id}`,
    fetcher,
    {
      revalidateOnFocus: true, // Revalidate on focus
    },
  );

  const schema = React.useMemo(() => {
    if (!data) return null;

    console.log(!data);

    return z.object({
      stock: z
        .number({ required_error: "Un inventaire doit avoir un stock" })
        .describe("Stock du produit")
        .default(inventory ? inventory?.stock : 0),
      motif: z
        .string({ required_error: "Un justificatif doit etre ajouter" })
        .describe("Justificatif de l'inventaire")
        .default(inventory ? inventory?.motif : " "),
      unitPrice: z
        .number({ invalid_type_error: "" })
        .describe("Prix unitaire")
        .nonnegative()
        .default(inventory ? inventory?.unitePrice : 0),

      type: z
        .nativeEnum(typeType)
        .default(inventory ? inventory?.type : typeType.incoming),
    });
  }, [data, inventory]);

  return { schema, loading, error };
};

interface CreateInventoryFormProps {
  inventory?: inventoryType;
  setOpen: any;
}

export default function CreateInventoryForm({
  inventory,
  setOpen,
}: CreateInventoryFormProps) {
  const params = useParams();
  const { user } = AuthStore.useState();
  const { schema, loading, error } = useFormSchema(inventory as inventoryType);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const url = inventory
        ? `/api/v1/inventories/${params.productVariantId}/${inventory.id}`
        : "/api/v1/inventories/create";
      const method = inventory ? "put" : "post";

      const { data: response } = await axios({
        method,
        url,
        data: {
          ...data,
          productVariantId: params.productVariantId,
        },
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });

      toast({
        title: inventory
          ? "Approvisionnement mis à jour avec succès!"
          : "Approvisionnement créé avec succès!",
        description: "Enregistré avec avec succès!",
      });

      //re-fetch the data to sync it
      mutate(`/api/v1/inventories/${params.productVariantId}`);

      setOpen(false);
    } catch (error) {
      console.log("Error", error);
      toast({
        title: inventory
          ? "Erreur lors de la mise à jour de l'approvisionnement"
          : "Erreur lors de la création de l'approvisionnement",
        variant: "destructive",
      });
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

  if (!user.token) {
    return <p className="text-meta-1">{"Vous devez vous connectez avant"}</p>;
  }

  if (error) {
    return <p className="text-meta-1">Une erreur {"s'est produite"}</p>;
  }

  return schema ? (
    <AutoForm
      onSubmit={onSubmit}
      formSchema={schema}
      fieldConfig={{
        stock: {
          inputProps: {
            placeholder: "120",
          },
        },
        motif: {
          inputProps: {
            placeholder: "Fourni par Njabuka",
          },
        },
        unitPrice: {
          inputProps: {
            placeholder: `12 (en dollars)`,
          },
        },
      }}
    >
      <AutoFormSubmit disabled={isLoading}>
        {isLoading ? "Patientez..." : inventory ? `Mettre à jour ` : "Créer"}
      </AutoFormSubmit>
    </AutoForm>
  ) : null;
}
