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
import { handleChange } from "@/store/productVariantStore";
import * as z from "zod";

export default function ProductVariants() {
  const formSchema = z.object({
    inventoryCount: z
      .number()
      .min(0, "Quantité doit être un nombre positif")
      .describe("Inventaire"),
    buyingPrice: z
      .number()
      .min(0, "Prix d'achat doit être un nombre positif")
      .describe("Prix d'achat ($)"),
    sellingPrice: z
      .number()
      .min(0, "Prix de vente doit être un nombre positif")
      .describe("Prix de vente ($)"),
    isOnSale: z
      .boolean()
      .describe("Cette variante du produit est-elle en promotion?")
      .optional(),
    salePrice: z
      .number()
      .min(0, "Prix de vente doit être un nombre positif")
      .describe("Prix promotionnel ($)"),
    shipping: z
      .object({
        weight: z
          .number()
          .min(0, "Le poids du produit être un nombre positif")
          .describe("Poids en Grammes"),
        length: z
          .number()
          .min(0, "La longueur être un nombre positif")
          .describe("Longueur en Centimètres"),
        breadth: z
          .number()
          .min(0, "La hauteur doit être un nombre positif")
          .describe("Hauteur en Centimètres"),
        width: z
          .number()
          .min(0, "La largeur être un nombre positif")
          .describe("Largeur Centimètres"),
      })
      .describe("Informations de livraison"),
  });

  type FormData = z.infer<typeof formSchema>;

  return (
    <AutoForm
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{
        inventoryCount: {
          fieldType: "number",
          inputProps: {
            placeholder: "La quantité en stock pour cette variante",
          },
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
      onValuesChange={({
        inventoryCount = 0,
        shipping = {
          weight: 0,
          length: 0,
          breadth: 0,
          width: 0,
        },
        sellingPrice = 0,
        salePrice = 0,
        isOnSale = false,
        buyingPrice = 0,
      }) => {
        handleChange("inventoryCount", Number(inventoryCount));
        handleChange("sellingPrice", Number(sellingPrice));
        handleChange("salePrice", Number(salePrice));
        handleChange("shipping", {
          weight: Number(shipping.weight),
          length: Number(shipping.length),
          breadth: Number(shipping.breadth),
          width: Number(shipping.width),
        });
        handleChange("isOnSale", Boolean(isOnSale));
        handleChange("buyingPrice", Number(buyingPrice));
      }}

      // Optionally, define dependencies between fields
    ></AutoForm>
  );
}
