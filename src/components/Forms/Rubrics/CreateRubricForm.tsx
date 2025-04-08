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

interface CreateRubricFormProps {
  rubric?: any;
  setOpen: any;
}

export default function CreateRubricForm({
  rubric,
  setOpen,
}: CreateRubricFormProps) {
  const { user } = AuthStore.useState();
  const schema = z.object({
    label: z
      .string({ required_error: "Nom obligatoire" })
      .describe("Nom de la rubrique")
      .default(rubric ? rubric?.label : ""),
  });
  const [isLoading, setIsLoading] = useState(false);

  type FormData = z.infer<typeof schema>;

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const url = rubric
        ? `/api/v1/accounting/rubrics/${rubric.id}`
        : "/api/v1/accounting/rubrics/create";
      const method = rubric ? "put" : "post";

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
        title: rubric
          ? "Rubrique mis à jour avec succès!"
          : "Rubrique créé avec succès!",
        description: "Enregistrée avec avec succès!",
      });

      mutate("/api/v1/accounting/rubrics");

      setOpen(false);
    } catch (error) {
      toast({
        title: rubric
          ? "Erreur lors de la mise à jour de la rubrique."
          : "Erreur lors de la création de la rubrique.",
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
        {isLoading ? "Patientez..." : rubric ? "Mettre à jour" : "Créer"}
      </AutoFormSubmit>
    </AutoForm>
  ) : null;
}
