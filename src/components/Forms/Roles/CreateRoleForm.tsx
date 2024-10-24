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
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SelectPermissions from "./SelectPermissions";

// Define your form schema using zod

interface Props {
  role?: any;
  setOpen: any;
  availablePermissions?: any;
}

export default function CreateRoleForm({
  role,
  setOpen,
  availablePermissions,
}: Props) {
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
    permissions: z
      .array(z.object({ name: z.string(), code: z.string() }))
      .min(1, "Choisissez au moins une permission.")
      .default(role ? role.permissions : []),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      permissions: role?.permissions ?? [],
      name: role?.name ?? "",
      code: role?.code ?? "",
    },
  });

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du rôle</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Adminstrateur" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code du rôle</FormLabel>
              <FormControl>
                <Input placeholder="Ex: ADMIN" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="permissions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permissions</FormLabel>
              <FormControl>
                <Controller
                  control={form.control}
                  name="permissions"
                  render={({ field }) => (
                    <SelectPermissions
                      options={availablePermissions}
                      selectedValues={field.value}
                      onChange={(values) =>
                        form.setValue("permissions", values)
                      }
                    />
                  )}
                />
              </FormControl>
              <FormDescription>
                Gérez la liste des permissions en{" "}
                <Link href="/settings/countries" className="text-primary">
                  cliquant ici !
                </Link>
                .
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} className="" type="submit">
          {loading ? "Patientez..." : role ? "Mettre à jour" : "Créer"}
        </Button>
      </form>
    </Form>
  );
}
