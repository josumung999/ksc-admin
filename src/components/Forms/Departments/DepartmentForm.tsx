"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { DependencyType } from "@/components/ui/auto-form/types";
import { toast } from "@/hooks/use-toast";
import { fetcher } from "@/lib/utils";
import { AuthStore } from "@/store/authStore";
import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import * as z from "zod";

interface DepartmentFormProps {
  department?: any;
  setOpen: any;
}

export default function DepartmentForm({
  department,
  setOpen,
}: DepartmentFormProps) {
  const { user } = AuthStore.useState();
  const schema = z.object({
    label: z
      .string({ required_error: "Nom obligatoire" })
      .describe("Nom du département")
      .default(department ? department?.label : ""),
  });
  const [isLoading, setIsLoading] = useState(false);

  type FormData = z.infer<typeof schema>;

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const url = department
        ? `/api/v1/accounting/departments/${department.id}`
        : "/api/v1/accounting/departments/create";
      const method = department ? "put" : "post";

      const { data: response } = await axios({
        method,
        url,
        data: {
          label: data.label,
        },
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });

      console.log("Response Data:", response);

      toast({
        title: department
          ? "Département mis à jour avec succès!"
          : "Département créé avec succès!",
        description: "Enregistré avec avec succès!",
      });

      mutate("/api/v1/accounting/departments");

      setOpen(false);
    } catch (error) {
      toast({
        title: department
          ? "Erreur lors de la mise à jour du département."
          : "Erreur lors de la création du département.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return schema ? (
    <AutoForm
      onSubmit={onSubmit}
      formSchema={schema}
      fieldConfig={{
        label: {
          inputProps: {
            placeholder: "Ex: Informatique",
          },
        },
      }}
    >
      <AutoFormSubmit disabled={isLoading}>
        {isLoading ? "Patientez..." : department ? "Mettre à jour" : "Créer"}
      </AutoFormSubmit>
    </AutoForm>
  ) : null;
}
