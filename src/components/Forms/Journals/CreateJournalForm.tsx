"use client";
import {
  Form,
  FormControl,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  journal?: any;
  setOpen: any;
}

export default function CreateJournalForm({ journal, setOpen }: Props) {
  const formSchema = z.object({
    name: z
      .string({
        required_error: "",
      })
      .min(1, "Nom du journal est requis"),
    code: z
      .string({
        required_error: "",
      })
      .min(1, "Code du journal obligatoire"),
    type: z
      .string({
        required_error: "",
      })
      .min(1, "Type de journal obligatoire"),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: journal?.name ?? "",
      code: journal?.code ?? "",
      type: journal?.type ?? "",
    },
  });

  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const url = journal
        ? `/api/v1/accounting/journals/${journal.id}`
        : "/api/v1/accounting/journals/create";
      const method = journal ? "put" : "post";

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
        title: journal
          ? "Journal mis à jour avec succès!"
          : "Journal créé avec succès!",
        description: "Enregistré avec avec succès!",
      });

      mutate(`/api/v1/accounting/journals`);

      setOpen(false);
    } catch (error) {
      toast({
        title: journal
          ? "Erreur lors de la mise à jour du Journal."
          : "Erreur lors de la création du Journal.",
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code du Journal</FormLabel>
              <FormControl>
                <Input placeholder="Ex: JACH" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du journal</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Journal des achats" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Direction Select */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de journal</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="FINANCIER">Financier</SelectItem>
                  <SelectItem value="ACHAT">Achat</SelectItem>
                  <SelectItem value="VENTE">Vente</SelectItem>
                  <SelectItem value="OPERATION_CLIENTELE">
                    Opération clientèle
                  </SelectItem>
                  <SelectItem value="OPERATIONS_DIVERSES">
                    Opération diverses
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="" type="submit">
          {loading ? "Patientez..." : journal ? "Mettre à jour" : "Créer"}
        </Button>
      </form>
    </Form>
  );
}
