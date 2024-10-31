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

export default function ProductShipping() {
  const formSchema = z.object({
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
  });

  type FormData = z.infer<typeof formSchema>;

  return (
    <AutoForm
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{
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
      }}
      onValuesChange={({ weight = 0, length = 0, breadth = 0, width = 0 }) => {
        handleChange("shipping", {
          weight: Number(weight),
          length: Number(length),
          breadth: Number(breadth),
          width: Number(width),
        });
      }}

      // Optionally, define dependencies between fields
    ></AutoForm>
  );
}
