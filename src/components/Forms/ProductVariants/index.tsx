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
      onValuesChange={({ inventoryCount = 0 }) => {
        handleChange("inventoryCount", Number(inventoryCount));
      }}

      // Optionally, define dependencies between fields
    ></AutoForm>
  );
}
