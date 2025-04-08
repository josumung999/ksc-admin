"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { AuthStore } from "@/store/authStore";
import { mutate } from "swr";
import DatePicker from "../DatePicker";
import { FileData, getPresignedUrls, handleUpload } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CalendarPlus, UserPlus } from "lucide-react";
import { usePathname } from "next/navigation";

const isBrowser = typeof window !== "undefined";

const FormSchema = z.object({
  name: z.string().min(2, "Le nom est obligatoire."),
  exerciceComptableId: z
    .string()
    .min(1, "L'exercice comptable est obligatoire."),
  startDate: z.date({
    required_error: "La date de début est obligatoire.",
  }),
  endDate: z.date({
    required_error: "La date de fin est obligatoire.",
  }),
  status: z.enum(["OPEN", "CLOSED"]),
});

interface CreatePeriodComptableFormProps {
  setOpen: (open: boolean) => void;
  periodComptable?: any;
  exercices: any[];
}

export function CreatePeriodComptableForm({
  setOpen,
  periodComptable,
  exercices,
}: CreatePeriodComptableFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: periodComptable?.name ?? "",
      startDate: periodComptable?.startDate ?? "",
      endDate: periodComptable?.endDate ?? "",
      exerciceComptableId: periodComptable?.exerciceComptableId ?? "",
      status: periodComptable?.status ?? "OPEN",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { user } = AuthStore.useState();
  const pathname = usePathname();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      const response = await axios({
        method: periodComptable ? "put" : "post",
        url: periodComptable
          ? "/api/v1/accounting/periodes/" + periodComptable.id
          : "/api/v1/accounting/periodes/create",
        data: data,
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });

      console.log("Period Comptable created =>", response?.data);
      toast({
        title: periodComptable
          ? "Période Comptable mise à jour avec succès!"
          : "Période Comptable créée avec succès!",
        description: "Enregistrée avec succès!",
      });
      mutate("/api/v1/accounting/periodes");

      setOpen(false);
    } catch (error) {
      console.log("Erreur: ", error);
      toast({
        title: "Erreur lors de la sauvegarde de la Période comptable.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
              <FormLabel>Nom de la Période comptable</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Janvier 2024" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel className="">Date de début</FormLabel>
          <Controller
            name="startDate"
            control={form.control}
            render={({ field }) => (
              <DatePicker
                name="startDate"
                control={form.control}
                onChange={field.onChange}
                defaultDate={periodComptable?.startDate ?? undefined}
              />
            )}
          />
          {form.formState.errors.startDate && (
            <p className="text-meta-1">
              {form.formState.errors.startDate.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <FormLabel className="">Date de fin</FormLabel>
          <Controller
            name="endDate"
            control={form.control}
            render={({ field }) => (
              <DatePicker
                name="endDate"
                control={form.control}
                onChange={field.onChange}
                defaultDate={periodComptable?.endDate ?? undefined}
              />
            )}
          />
          {form.formState.errors.endDate && (
            <p className="text-meta-1">
              {form.formState.errors.endDate.message}
            </p>
          )}
        </div>

        <FormField
          control={form.control}
          name="exerciceComptableId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exercice Comptable</FormLabel>
              <Select {...field} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un exercice comptable" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {exercices.map((item: any) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
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
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Statut</FormLabel>
              <Select {...field} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner statut" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="OPEN">Ouverte</SelectItem>
                  <SelectItem value="CLOSED">Fermée</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} className="" type="submit">
          {isLoading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CalendarPlus className="mr-2 h-4 w-4" />
          )}
          {isLoading
            ? "Patientez..."
            : periodComptable
              ? "Mettre à jour"
              : "Créer"}
        </Button>
      </form>
    </Form>
  );
}
