"use client";
import { clientType } from "@/components/types_interfaces/clientType";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import { toast } from "@/hooks/use-toast";
import { fetcher } from "@/lib/utils";
import { AuthStore } from "@/store/authStore";
import axios from "axios";
import React, { useState } from "react";
import useSWR, { mutate } from "swr";
import * as z from "zod";

const useFormSchema = (client: clientType) => {
  const {
    data,
    error,
    isLoading: loading,
  } = useSWR(`/api/v1/clients/${client?.id}`, fetcher, {
    revalidateOnFocus: true, // Revalidate on focus
  });

  const schema = React.useMemo(() => {
    if (!data) return null;

    return z.object({
      fullName: z
        .string({ required_error: "Deux Noms sont obligatoires" })
        .describe("Nom complet du client")
        .default(client ? client?.fullName : ""),
      phoneNumber: z
        .string()
        .describe("Description de la catégorie")
        .regex(/^\+?\d{10,15}$/, "Numéro de téléphone invalide")
        .default(client ? client?.phoneNumber : ""),
      email: z
        .string({ invalid_type_error: "Email nom Valide" })
        .describe("Email")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .optional()
        .default(client ? client?.email : ""),

      address: z
        .string()
        .describe("Adresse")
        .optional()
        .default(client ? client?.address : ""),

      civility: z
        .string()
        .describe("Nationalité")
        .optional()
        .default(client ? client?.civility : ""),
    });
  }, [data, client]);

  return { schema, loading, error };
};

interface CreateClientFormProps {
  client?: clientType;
  setOpen: any;
}

export default function CreateClientForm({
  client,
  setOpen,
}: CreateClientFormProps) {
  const { user } = AuthStore.useState();
  const { schema, loading, error } = useFormSchema(client as clientType);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const url = client
        ? `/api/v1/clients/${client.id}`
        : "/api/v1/clients/create";
      const method = client ? "put" : "post";

      const { data: response } = await axios({
        method,
        url,
        data: {
          ...data,
        },
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });

      toast({
        title: client
          ? "Client mise à jour avec succès!"
          : "Client créée avec succès!",
        description: "Enregistré avec avec succès!",
      });

      //re-fetch the data to sync it
      mutate("/api/v1/clients");

      setOpen(false);
    } catch (error) {
      toast({
        title: client
          ? "Erreur lors de la mise à jour du client"
          : "Erreur lors de la création du client",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[30vh] items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!user.token) {
    return <p className="text-meta-1">{"Vous devez vous connectez avant"}</p>;
  }

  if (error) {
    return <p className="text-meta-1">Erreur: {error}</p>;
  }

  return schema ? (
    <AutoForm
      onSubmit={onSubmit}
      formSchema={schema}
      fieldConfig={{
        fullName: {
          inputProps: {
            placeholder: "Bisimwa Junior",
          },
        },
        phoneNumber: {
          inputProps: {
            placeholder: "+243123456789",
          },
        },
        email: {
          inputProps: {
            placeholder: "abcd@gmail.com",
          },
        },
        address: {
          inputProps: {
            placeholder: "Q. Murara Av. Matangura",
          },
        },

        civility: {
          inputProps: {
            placeholder: "Congolais",
          },
        },
      }}
    >
      <AutoFormSubmit disabled={isLoading}>
        {isLoading
          ? "Patientez..."
          : client
            ? `Mettre à jour ${client.fullName}`
            : "Créer"}
      </AutoFormSubmit>
    </AutoForm>
  ) : null;
}
