"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { DependencyType } from "@/components/ui/auto-form/types";
import { AuthStore } from "@/store/authStore";
import React from "react";
import * as z from "zod";

export default function CreateUserForm() {
  const [formSchema, setFormSchema] = React.useState<z.ZodObject<
    any,
    any,
    any
  > | null>(null);
  const { user } = AuthStore.useState();

  React.useEffect(() => {
    fetch("/api/v1/roles", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const formSchema = z.object({
          email: z
            .string({
              required_error: "Adresse e-mail obligatoire",
            })
            .email("Adresse e-mail non valide")
            .describe("Adresse e-mail"), // TODO: add email validator
          password: z
            .string({
              required_error: "Mot de passe obligatoire",
            })
            .describe("Mot de passe"),
          roleCode: z
            .enum(data?.data?.records.map((role: any) => role.code))
            .describe("Rôle"),
          firstName: z.string().describe("Prénom"),
          middleName: z.string().describe("Nom"),
          lastName: z.string().describe("Post-Nom"),
          phonNumber: z.string().describe("Numéro de téléphone"),
        });

        setFormSchema(formSchema);
      });
  }, [user.token]);

  return (
    <>
      {formSchema ? (
        <AutoForm
          // Pass the schema to the form
          formSchema={formSchema}
        >
          <AutoFormSubmit>Créer</AutoFormSubmit>
        </AutoForm>
      ) : (
        <div className="flex h-[30vh] items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        </div>
      )}
    </>
  );
}
