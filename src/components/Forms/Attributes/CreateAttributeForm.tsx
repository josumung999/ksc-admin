"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { DependencyType } from "@/components/ui/auto-form/types";
import { toast } from "@/hooks/use-toast";
import { AuthStore } from "@/store/authStore";
import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import * as z from "zod";

// Define your form schema using zod

interface Props {
  attribute?: any;
  setOpen: any;
}

export default function CreateAttributeForm({ attribute, setOpen }: Props) {
  const formSchema = z.object({
    name: z
      .string({
        required_error: "Champ obligatoire",
      })
      .min(1, "Donnez un nom à l'attribut")
      .max(32, "Le nom de l'attribut est trop long")
      .describe("Nom de l'attribut")
      .default(attribute ? attribute.name : ""),
    type: z
      .string({
        required_error: "Champ obligatoire",
      })
      .min(1, "Type de l'attribut est requis")
      .max(32, "Le Type de l'attribut est requis est trop long")
      .describe("Type de l'attribut est requis")
      .default(attribute ? attribute.code : ""),
  });

  type FormData = z.infer<typeof formSchema>;

  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const url = attribute
        ? `/api/v1/attributes/${attribute.id}`
        : "/api/v1/attributes/create";
      const method = attribute ? "put" : "post";

      const { data: response } = await axios({
        method,
        url,
        data: {
          ...data,
        },
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });

      console.log("Response Data:", response);

      toast({
        title: attribute
          ? "Attribut mis à jour avec succès!"
          : "Attribut créé avec succès!",
        description: "Enregistré avec avec succès!",
      });

      mutate(`/api/v1/attributes`);

      setOpen(false);
    } catch (error) {
      toast({
        title: attribute
          ? "Erreur lors de la mise à jour de l'attribut."
          : "Erreur lors de la création de l'attribut.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AutoForm
      onSubmit={onSubmit}
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{}}

      // Optionally, define dependencies between fields
    >
      {/* 
      Pass in a AutoFormSubmit or a button with type="submit".
      Alternatively, you can not pass a submit button
      to create auto-saving forms etc.
      */}
      <AutoFormSubmit disabled={loading}>
        {loading ? "Patientez..." : attribute ? "Mettre à jour" : "Créer"}
      </AutoFormSubmit>

      {/*
      All children passed to the form will be rendered below the form.
      */}
    </AutoForm>
  );
}
