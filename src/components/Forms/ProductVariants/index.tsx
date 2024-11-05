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
      .describe("Quantité"),
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
            placeholder: "La quantité pour cette variante",
          },
        },
      }}
      onValuesChange={({ inventoryCount = 0, shipping = {} }) => {
        handleChange("inventoryCount", Number(inventoryCount));
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
