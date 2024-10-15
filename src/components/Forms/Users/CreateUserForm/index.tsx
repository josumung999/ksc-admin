"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { DependencyType } from "@/components/ui/auto-form/types";
import { AuthStore } from "@/store/authStore";
import React from "react";
import * as z from "zod";

// Custom hook for fetching roles and generating schema
const useFormSchema = (token: string) => {
  const [schema, setSchema] = React.useState<z.ZodObject<any, any, any> | null>(
    null,
  );
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch("/api/v1/roles", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to load roles");

        const data = await res.json();
        const roleOptions = data?.data?.records.map((role: any) => role.code);

        // Create the schema with additional validations
        const formSchema = z.object({
          email: z
            .string({
              required_error: "Adresse e-mail obligatoire",
            })
            .email("Adresse e-mail non valide")
            .describe("Adresse e-mail"),
          password: z
            .string()
            .min(8, "Mot de passe trop court")
            .describe("Mot de passe"),
          roleCode: z.enum(roleOptions).describe("Rôle"),
          firstName: z
            .string({
              required_error: "Prénom obligatoire",
            })
            .describe("Prénom"),
          middleName: z.string().optional().describe("Nom"),
          lastName: z
            .string({
              required_error: "Post-Nom obligatoire",
            })
            .describe("Post-Nom"),
          phoneNumber: z
            .string()
            .regex(/^\+?\d{10,15}$/, "Numéro de téléphone invalide")
            .describe("Numéro de téléphone"),
        });

        setSchema(formSchema);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [token]);

  return { schema, loading, error };
};

export default function CreateUserForm() {
  const { user } = AuthStore.useState();
  const { schema, loading, error } = useFormSchema(user.token);

  if (loading) {
    return (
      <div className="flex h-[30vh] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-meta-1">Erreur: {error}</p>;
  }

  return schema ? (
    <AutoForm
      formSchema={schema}
      fieldConfig={{
        email: {
          inputProps: {
            placeholder: "user@example.com",
          },
        },
        password: {
          inputProps: {
            placeholder: "••••••••",
          },
        },
        firstName: {
          inputProps: {
            placeholder: "Alain",
          },
        },
        lastName: {
          inputProps: {
            placeholder: "Mugisho",
          },
        },
        middleName: {
          inputProps: {
            placeholder: "Bisimwa",
          },
        },
        phoneNumber: {
          inputProps: {
            placeholder: "+243813456789",
          },
        },
      }}
    >
      <AutoFormSubmit>Créer</AutoFormSubmit>
    </AutoForm>
  ) : null;
}
