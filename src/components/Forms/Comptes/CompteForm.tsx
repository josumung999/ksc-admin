"use client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { AuthStore } from "@/store/authStore";
import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define your form schema using zod

interface Props {
  account?: any;
  setOpen: any;
  classes: any;
}

export default function CompteForm({ account, classes, setOpen }: Props) {
  const formSchema = z.object({
    label: z
      .string({
        required_error: "",
      })
      .min(2, "Nom du compte est requis"),
    mainAccount: z
      .string({
        required_error: "",
      })
      .min(2, "Compte principal obligatoire"),
    intermediateAccount: z
      .string({
        required_error: "",
      })
      .min(2, "Compte intermédiaire obligatoire"),
    subAccount: z
      .string({
        required_error: "",
      })
      .min(2, "Sous-compte obligatoire"),
    direction: z.string({
      required_error: "Direction obligatoire",
    }),
    type: z
      .string({
        required_error: "",
      })
      .min(2, "Type de compte obligatoire"),
    classId: z.string().min(1, "Classe obligatoire"),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: account?.label ?? "",
      mainAccount: account?.mainAccount ?? "",
      intermediateAccount: account?.intermediateAccount ?? "",
      subAccount: account?.subAccount ?? "",
      direction: account?.direction ?? "",
      type: account?.type ?? "",
      classId: account?.classId ?? "",
    },
  });

  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const url = account
        ? `/api/v1/accounting/comptes/${account.id}`
        : "/api/v1/accounting/comptes/create";
      const method = account ? "put" : "post";

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
        title: account
          ? "Compte mis à jour avec succès!"
          : "Compte créé avec succès!",
        description: "Enregistré avec avec succès!",
      });

      mutate(`/api/v1/accounting/comptes`);

      setOpen(false);
    } catch (error: any) {
      toast({
        title: account
          ? "Erreur lors de la mise à jour du compte."
          : "Erreur lors de la création du compte.",
        description:
          error?.response?.data?.message ?? "Une erreur est survenue",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid items-center gap-6 md:grid-cols-2">
          {/* Class Select */}
          <FormField
            control={form.control}
            name="classId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Classe du compte</FormLabel>
                <Select {...field} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une Classe" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {classes?.map((item: any) => (
                      <SelectItem key={item.id} value={item.id}>
                        {`${item.class} - ${item.name}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mainAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Compte principal</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Compte principal" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="intermediateAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Compte intermédiaire</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Compte intermédiaire" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subAccount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sous-compte</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Sous-compte" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du compte</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Compte principal" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Direction Select */}
          <FormField
            control={form.control}
            name="direction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Direction du compte</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une Direction" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CREDIT">Crédit</SelectItem>
                    <SelectItem value="DEBIT">Débit</SelectItem>
                    <SelectItem value="SOLDE">Solde</SelectItem>
                    <SelectItem value="DEUX">2</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Type Select */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de compte</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="N/A">N/A</SelectItem>
                    <SelectItem value="CHARGE">CHARGE</SelectItem>
                    <SelectItem value="PRODUIT-CHARGE">
                      PRODUIT-CHARGE
                    </SelectItem>
                    <SelectItem value="PRODUIT">PRODUIT</SelectItem>
                    <SelectItem value="ACTIF">ACTIF</SelectItem>
                    <SelectItem value="PASSIF">PASSIF</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button disabled={loading} className="" type="submit">
          {loading ? "Patientez..." : account ? "Mettre à jour" : "Créer"}
        </Button>
      </form>
    </Form>
  );
}
