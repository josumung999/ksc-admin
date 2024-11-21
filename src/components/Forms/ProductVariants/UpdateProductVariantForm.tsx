"use client";
"use client";
import Switch from "@/components/Switch";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import {
  AutoFormInputComponentProps,
  DependencyType,
} from "@/components/ui/auto-form/types";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { AuthStore } from "@/store/authStore";
import { handleChange } from "@/store/productVariantStore";
import axios from "axios";
import { Edit, LoaderIcon } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";
import * as z from "zod";

interface ProductVariantProps {
  variant: any;
  setOpen: any;
}

export default function UpdateProductVariantForm({
  variant,
  setOpen,
}: ProductVariantProps) {
  const formSchema = z.object({
    buyingPrice: z
      .number()
      .min(0, "Prix d'achat doit être un nombre positif")
      .describe("Prix d'achat ($)")
      .default(variant.buyingPrice),
    sellingPrice: z
      .number()
      .min(0, "Prix de vente doit être un nombre positif")
      .describe("Prix de vente ($)")
      .default(variant.sellingPrice),
    isOnSale: z
      .boolean()
      .describe("Cette variante du produit est-elle en promotion?")
      .default(variant.isOnSale)
      .optional(),
    salePrice: z
      .number()
      .min(0, "Prix de vente doit être un nombre positif")
      .describe("Prix promotionnel ($)")
      .default(variant.salePrice),
    shipping: z
      .object({
        weight: z
          .number()
          .min(0, "Le poids du produit être un nombre positif")
          .describe("Poids en Grammes")
          .default(variant.shipping.weight),
        length: z
          .number()
          .min(0, "La longueur être un nombre positif")
          .describe("Longueur en Centimètres")
          .default(variant.shipping["length"]),
        breadth: z
          .number()
          .min(0, "La hauteur doit être un nombre positif")
          .describe("Hauteur en Centimètres")
          .default(variant.shipping.breadth),
        width: z
          .number()
          .min(0, "La largeur être un nombre positif")
          .describe("Largeur Centimètres")
          .default(variant.shipping.width),
      })
      .describe("Informations de livraison"),
  });

  type FormData = z.infer<typeof formSchema>;
  const [isLoading, setIsLoading] = useState(false);
  const { user } = AuthStore.useState();

  const updateVariant = async (data: FormData) => {
    try {
      setIsLoading(true);

      const sanitizedVariantInfo = {
        ...data,
        shipping: {
          weight: Number(data.shipping.weight),
          length: Number(data.shipping.length),
          breadth: Number(data.shipping.breadth),
          width: Number(data.shipping.width),
        },
        sellingPrice: Number(data.sellingPrice),
        salePrice: Number(data.salePrice),
      };

      const { data: response } = await axios.put(
        `/api/v1/productVariants/${variant.id}`,
        sanitizedVariantInfo,
        {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        },
      );

      console.log("Response Data:", response);

      toast({
        title: response.data.message ?? "Mise à jour effectuée avec succès!",
        description: "Enregistré avec avec succès!",
      });

      mutate(`/api/v1/productVariants?productId=${variant.productId}`);

      setOpen(false);
    } catch (error: any) {
      toast({
        title: error?.response?.data?.message ?? "Une erreur s'est produite",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    if (
      data?.sellingPrice < 0 ||
      data?.shipping?.breadth < 0 ||
      data?.shipping?.width < 0 ||
      data?.shipping["length"] < 0 ||
      data?.shipping?.weight < 0
    ) {
      toast({
        title: "Veuillez compléter le formulaire",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    } else {
      await updateVariant(data);
    }
  };

  return (
    <AutoForm
      onSubmit={onSubmit}
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{
        buyingPrice: {
          fieldType: "number",
          inputProps: {
            placeholder: "Le prix d'achat pour cette variante",
          },
        },
        sellingPrice: {
          fieldType: "number",
          inputProps: {
            placeholder: "Le prix de vente pour cette variante",
          },
        },
        salePrice: {
          fieldType: "number",
          inputProps: {
            placeholder: "Le prix de vente promotionnel pour cette variante",
          },
          description:
            "Si en promo, le prix promotionnel sera appliqué lors de l'achat de l'article",
        },
        shipping: {
          weight: {
            fieldType: "number",
            inputProps: {
              placeholder: "Ex: 120",
            },
            description:
              "Le poids du produit est important pour calculer l'expedition",
          },
          length: {
            fieldType: "number",
            inputProps: {
              placeholder: "Ex: 120",
            },
          },
          breadth: {
            fieldType: "number",
            inputProps: {
              placeholder: "Ex: 120",
            },
          },
          width: {
            fieldType: "number",
            inputProps: {
              placeholder: "Ex: 120",
            },
          },
        },
        isOnSale: {
          description:
            "Si coché, le prix promotionnel sera appliqué lors de l'achat de l'article",
          fieldType: ({
            label,
            isRequired,
            field,
            fieldConfigItem,
            fieldProps,
          }: AutoFormInputComponentProps) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-neutral-200 p-4">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  {...fieldProps}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {label}
                  {isRequired && <span className="text-destructive"> *</span>}
                </FormLabel>
                {fieldConfigItem.description && (
                  <FormDescription>
                    {fieldConfigItem.description}
                  </FormDescription>
                )}
              </div>
            </FormItem>
          ),
        },
      }}
      dependencies={[
        {
          sourceField: "isOnSale",
          type: DependencyType.HIDES,
          targetField: "salePrice",
          when: (isOnSale) => !isOnSale,
        },
        {
          sourceField: "isOnSale",
          type: DependencyType.REQUIRES,
          targetField: "salePrice",
          when: (isOnSale) => isOnSale,
        },
      ]}

      // Optionally, define dependencies between fields
    >
      <AutoFormSubmit disabled={isLoading}>
        {isLoading ? (
          <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Edit className="mr-2 h-4 w-4" />
        )}
        <span>{isLoading ? "Veuillez patienter" : "Mettre à jour"}</span>
      </AutoFormSubmit>
    </AutoForm>
  );
}
