"use client";
"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { DependencyType } from "@/components/ui/auto-form/types";
import { toast } from "@/hooks/use-toast";
import { AuthStore } from "@/store/authStore";
import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import * as z from "zod";

export default function ProductVariants() {
  const formSchema = z.object({
    variants: z
      .array(
        z.object({
          inventoryCount: z
            .number()
            .min(0, "Quantité doit être un nombre positif")
            .describe("Quantité"),
          sku: z
            .string()
            .min(1, "Veuillez completer le SKU")
            .describe("SKU (Optionnel)")
            .optional(),
          attributes: z
            .array(
              z.object({
                name: z
                  .string()
                  .min(1, "Veuillez entrer un nom")
                  .describe("Nom"),
                value: z
                  .string()
                  .min(1, "Veuillez entrer une valeur")
                  .describe("Valeur"),
              }),
            )
            .describe("Attributs de la variante"),
        }),
      )
      .describe("Variantes du produit"),
  });

  type FormData = z.infer<typeof formSchema>;

  return (
    <AutoForm
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{
        variants: {
          inventoryCount: {
            fieldType: "number",
            inputProps: {
              placeholder: "La quantité pour cette variante",
            },
          },
          sku: {
            inputProps: {
              placeholder: "Le numéro de code barcode",
            },
          },
        },
      }}

      // Optionally, define dependencies between fields
    ></AutoForm>
  );
}
