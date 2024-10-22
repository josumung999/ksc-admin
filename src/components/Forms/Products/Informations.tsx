"use client";
import AutoForm from "@/components/ui/auto-form";
import { handleChange } from "@/store/newProductStore";
import * as z from "zod";

export default function ProductInfo() {
  const formSchema = z.object({
    name: z
      .string({
        required_error: "Champ obligatoire",
      })
      .min(10, "Le nom du produit est court")
      .max(100, "Le nom du produit est long")
      .describe("Nom du produit"),
    shortDescription: z
      .string()
      .min(160, "La description du produit est courte")
      .describe("Description du produit"),
  });

  type FormData = z.infer<typeof formSchema>;

  return (
    <AutoForm
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{
        shortDescription: {
          fieldType: "textarea",
        },
      }}
      onValuesChange={({ name = "", shortDescription = "" }) => {
        handleChange("name", name);
        handleChange("shortDescription", shortDescription);
      }}

      // Optionally, define dependencies between fields
    >
      {/* 
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}

      {/*
      All children passed to the form will be rendered below the form.
      */}
    </AutoForm>
  );
}
