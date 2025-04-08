"use client";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import {
  AutoFormInputComponentProps,
  DependencyType,
} from "@/components/ui/auto-form/types";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define your form schema using zod

interface Props {
  category?: any;
  setOpen: any;
}

export default function ClassForm({ category, setOpen }: Props) {
  const formSchema = z.object({
    name: z
      .string({
        required_error: "",
      })
      .min(1, "Nom du role est requis")
      .describe("Nom du role")
      .default(category ? category.name : ""),
    class: z
      .number()
      .min(0, "Classe du role est requis")
      .describe("Classe du role")
      .default(category ? category.class : ""),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name ?? "",
      class: category?.class ?? 0,
    },
  });

  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const url = category
        ? `/api/v1/accounting/classes/${category.id}`
        : "/api/v1/accounting/classes/create";
      const method = category ? "put" : "post";

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
        title: category
          ? "Classe mise à jour avec succès!"
          : "Classe créée avec succès!",
        description: "Enregistré avec avec succès!",
      });

      mutate(`/api/v1/accounting/classes`);

      setOpen(false);
    } catch (error) {
      toast({
        title: category
          ? "Erreur lors de la mise à jour de la classe."
          : "Erreur lors de la création de la classe.",
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
          name="class"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Classe Comptable</FormLabel>
              <Select
                value={field.value !== undefined ? field.value.toString() : "0"} // Ensure it defaults to "0"
                onValueChange={(value: string) => {
                  field.onChange(Number(value));
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue>
                      {field.value !== undefined ? field.value.toString() : "0"}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Array.from({ length: 9 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      {i}
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de la Classe</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Adminstrateur" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="" type="submit">
          {loading ? "Patientez..." : category ? "Mettre à jour" : "Créer"}
        </Button>
      </form>
    </Form>
  );
}
