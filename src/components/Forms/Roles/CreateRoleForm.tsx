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
  role?: any;
  setOpen: any;
}

export default function CreateRoleForm({ role, setOpen }: Props) {
  const formSchema = z.object({
    name: z
      .string({
        required_error: "",
      })
      .min(1, "Nom du role est requis")
      .describe("Nom du role")
      .default(role ? role.name : ""),
    code: z
      .string()
      .min(1, "Code du role est requis")
      .describe("Code du role")
      .default(role ? role.code : ""),
  });

  type FormData = z.infer<typeof formSchema>;

  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const url = role ? `/api/v1/roles/${role.id}` : "/api/v1/roles/create";
      const method = role ? "put" : "post";

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
        title: role ? "Role mis à jour avec succès!" : "Role créé avec succès!",
        description: "Enregistré avec avec succès!",
      });

      mutate(`/api/v1/roles`);

      setOpen(false);
    } catch (error) {
      toast({
        title: role
          ? "Erreur lors de la mise à jour du role."
          : "Erreur lors de la création du role.",
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
        {loading ? "Patientez..." : role ? "Mettre à jour" : "Créer"}
      </AutoFormSubmit>

      {/*
      All children passed to the form will be rendered below the form.
      */}
    </AutoForm>
  );
}
