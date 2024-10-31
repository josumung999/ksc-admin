"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { DependencyType } from "@/components/ui/auto-form/types";
import { toast } from "@/hooks/use-toast";
import { AuthStore } from "@/store/authStore";
import { handleChange } from "@/store/newProductStore";
import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import * as z from "zod";

// Define your form schema using zod

interface Props {
  inventory?: any;
}

export default function ProductInventoryForm({ inventory }: Props) {
  const formSchema = z.object({
    quantity: z
      .number()
      .min(0, "Quantité doit être un nombre positif")
      .describe("Quantité")
      .default(inventory ? inventory.sku : ""),
  });

  type FormData = z.infer<typeof formSchema>;

  return (
    <AutoForm
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{
        quantity: {
          fieldType: "number",
          inputProps: {
            placeholder: "La quantité totale disponible",
          },
        },
      }}
      onValuesChange={({ quantity = 0 }) => {
        handleChange("quantity", Number(quantity));
      }}

      // Optionally, define dependencies between fields
    ></AutoForm>
  );
}
