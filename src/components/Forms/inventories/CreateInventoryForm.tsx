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
      type: z
        .nativeEnum(typeType)
        .default(inventory ? inventory?.type : typeType.incoming),
      stock: z
        .number({ required_error: "Un inventaire doit avoir un stock" })
        .describe("Stock du produit")
        .default(inventory?.stock),
      unitePrice: z
        .number({ required_error: "Un prix doit etre fourni" })
        .describe("Prix unitaire")
        .nonnegative()
        .default(inventory?.unitePrice),
      motif: z
        .string({ required_error: "Justificatif obligatoire" })
        .describe("Justificatif de l'inventaire")
        .default(inventory ? inventory?.motif : " "),
    });
  }, [data, inventory]);

  return { schema, loading, error };
};

interface CreateInventoryFormProps {
  inventory?: inventoryType;
  setOpen: any;
  variant_id?: string;
}

export default function CreateInventoryForm({
  inventory,
  setOpen,
  variant_id,
}: CreateInventoryFormProps) {
  const params = useParams();

  const { user } = AuthStore.useState();
  const { schema, loading, error } = useFormSchema(inventory as inventoryType);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const url = inventory
        ? `/api/v1/inventories/${inventory.productVariant.id}/${inventory.id}`
        : `/api/v1/inventories/create/${variant_id}`;
      const method = inventory ? "put" : "post";

      // deploy

      console.log(data);

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
      mutate(
        `/api/v1/inventories/${variant_id ?? inventory?.productVariant.id}`,
      );

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
            placeholder: "Quantité",
          },
        },
        motif: {
          inputProps: {
            placeholder: "Ex: Approvisionnement, Perte, etc",
          },
        },
        unitePrice: {
          inputProps: {
            placeholder: `Prix unitaire en dollar US`,
          },
        },
        type: {
          inputProps: {
            placeholder: "Entrer le type de stockage",
          },
          description:
            "Outgoing pour les sorties de stock et Incoming pour les entrées de stock",
        },
      }}
    >
      <AutoFormSubmit disabled={isLoading}>
        {isLoading ? "Patientez..." : inventory ? `Mettre à jour ` : "Créer"}
      </AutoFormSubmit>
    </AutoForm>
  ) : null;
}
