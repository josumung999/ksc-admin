"use client";
"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { handleChange } from "@/store/productVariantStore";
import * as z from "zod";

export default function ProductVariants() {
  const formSchema = z.object({
    inventoryCount: z
      .number()
      .min(0, "Quantité doit être un nombre positif")
      .describe("Inventaire"),
    sellingPrice: z
      .number()
      .min(0, "Prix de vente doit être un nombre positif")
      .describe("Prix de vente ($)"),
    salePrice: z
      .number()
      .min(0, "Prix de vente doit être un nombre positif")
      .describe("Prix promotionnel ($)")
      .optional(),
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
      }}
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
      }}

      // Optionally, define dependencies between fields
    ></AutoForm>
  );
}
