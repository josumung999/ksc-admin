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
  permission?: any;
  setOpen: any;
}

export default function CreatePermissionForm({ permission, setOpen }: Props) {
  const formSchema = z.object({
    name: z
      .string({
        required_error: "",
      })
      .min(1, "Donnez un nom à la permission")
      .describe("Nom de la permission")
      .default(permission ? permission.name : ""),
    code: z
      .string()
      .min(1, "Code de la permission est requis")
      .describe("Code de la permission")
      .default(permission ? permission.code : ""),
  });

  type FormData = z.infer<typeof formSchema>;

  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const url = permission
        ? `/api/v1/permissions/${permission.id}`
        : "/api/v1/permissions/create";
      const method = permission ? "put" : "post";

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
        title: permission
          ? "Permission misd à jour avec succès!"
          : "Permission créée avec succès!",
        description: "Enregistrée avec avec succès!",
      });

      mutate(`/api/v1/permissions`);

      setOpen(false);
    } catch (error) {
      toast({
        title: permission
          ? "Erreur lors de la mise à jour de la permission."
          : "Erreur lors de la création de la permission.",
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
        {loading ? "Patientez..." : permission ? "Mettre à jour" : "Créer"}
      </AutoFormSubmit>

      {/*
      All children passed to the form will be rendered below the form.
      */}
    </AutoForm>
  );
}
