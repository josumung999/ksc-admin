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

interface Props {
  product: any;
}

export default function UpdateProductForm({ product }: Props) {
  const formSchema = z.object({
    name: z
      .string({
        required_error: "Champ obligatoire",
      })
      .min(10, "Le nom du produit est court")
      .describe("Nom du produit")
      .default(product.name),
    shortDescription: z
      .string({
        required_error: "Champ obligatoire",
      })
      .min(10, "La description du produit est courte")
      .describe("Description du produit")
      .default(product.shortDescription),
    buyingPrice: z
      .number()
      .min(0, "Prix d'achat doit être un nombre positif")
      .describe("Prix d'achat ($)")
      .default(product.buyingPrice),
    sellingPrice: z
      .number()
      .min(0, "Prix de vente doit être un nombre positif")
      .describe("Prix de vente ($)")
      .default(product.sellingPrice),
    isOnSale: z
      .boolean()
      .describe("Ce produit est-il en promotion?")
      .default(product.isOnSale)
      .optional(),
    salePrice: z
      .number()
      .min(0, "Prix de vente doit être un nombre positif")
      .describe("Prix promotionnel ($)")
      .default(product.salePrice),
    weight: z
      .number()
      .min(0, "Le poids du produit être un nombre positif")
      .describe("Poids en Grammes")
      .default(product.shipping[0].weight),
    length: z
      .number()
      .min(0, "La longueur être un nombre positif")
      .describe("Longueur en Centimètres")
      .default(product.shipping[0]["length"]),
    breadth: z
      .number()
      .min(0, "La hauteur doit être un nombre positif")
      .describe("Hauteur en Centimètres")
      .default(product.shipping[0].breadth),
    width: z
      .number()
      .min(0, "La largeur être un nombre positif")
      .describe("Largeur Centimètres")
      .default(product.shipping[0].width),
  });

  type FormData = z.infer<typeof formSchema>;
  const [isLoading, setIsLoading] = useState(false);
  const { user } = AuthStore.useState();

  const updateProduct = async (data: FormData) => {
    try {
      setIsLoading(true);

      const sanitizedProductInfo = {
        ...data,
        shipping: {
          ...product.shipping[0],
          weight: Number(data.weight),
          length: Number(data.length),
          breadth: Number(data.breadth),
          width: Number(data.width),
        },
        sellingPrice: Number(data.sellingPrice),
        salePrice: Number(data.salePrice),
        buyingPrice: Number(data.buyingPrice),
      };

      console.log("Sanitized Variant Info", sanitizedProductInfo);

      const { data: response } = await axios.put(
        `/api/v1/products/${product.id}`,
        sanitizedProductInfo,
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

      mutate(`/api/v1/products/${product.id}`);
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
      data?.breadth < 0 ||
      data?.width < 0 ||
      data["length"] < 0 ||
      data?.weight < 0
    ) {
      toast({
        title: "Veuillez compléter le formulaire",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    } else {
      await updateProduct(data);
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
        name: {
          inputProps: {
            placeholder: "Le nom du produit",
          },
        },
        shortDescription: {
          fieldType: "textarea",
          inputProps: {
            placeholder: "La description du produit",
          },
          description:
            "La description du produit est importante pour le référencement et la vente",
        },
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
