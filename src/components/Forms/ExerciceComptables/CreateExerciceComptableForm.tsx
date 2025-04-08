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
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { AuthStore } from "@/store/authStore";
import { mutate } from "swr";
import { ReloadIcon } from "@radix-ui/react-icons";
import { CalendarPlus } from "lucide-react";
import { usePathname } from "next/navigation";
import DatePicker from "../DatePicker";

const FormSchema = z.object({
  name: z.string().min(2, "Le nom est obligatoire."),

  startDate: z.date(),
  endDate: z.date(),
});

interface CreateExerciceComptableFormProps {
  setOpen: (open: boolean) => void;
  exerciceComptable?: any;
}

export function CreateExerciceComptableForm({
  setOpen,
  exerciceComptable,
}: CreateExerciceComptableFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: exerciceComptable?.name ?? "",
      startDate: exerciceComptable?.startDate ?? "",
      endDate: exerciceComptable?.endDate ?? "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { user } = AuthStore.useState();
  const pathname = usePathname();

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);

      const response = await axios({
        method: exerciceComptable ? "put" : "post",
        url: exerciceComptable
          ? "/api/v1/accounting/exercices/" + exerciceComptable.id
          : "/api/v1/accounting/exercices/create",
        data: data,
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });

      console.log("Exercice Comptable created =>", response?.data);
      toast({
        title: exerciceComptable
          ? "Exercice Comptable mis à jour avec succès!"
          : "Exercice Comptable créé avec succès!",
        description: "Enregistrée avec succès!",
      });
      mutate("/api/v1/accounting/exercices");

      setOpen(false);
    } catch (error) {
      console.log("Erreur: ", error);
      toast({
        title: "Erreur lors de la sauvegarde de l'exercice comptable.",
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
              <FormLabel>Nom de l&apos;exercice comptable</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Exercice 2024" {...field} />
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
                defaultDate={exerciceComptable?.startDate ?? undefined}
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
                defaultDate={exerciceComptable?.endDate ?? undefined}
              />
            )}
          />
          {form.formState.errors.endDate && (
            <p className="text-meta-1">
              {form.formState.errors.endDate.message}
            </p>
          )}
        </div>

        <Button disabled={isLoading} className="" type="submit">
          {isLoading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CalendarPlus className="mr-2 h-4 w-4" />
          )}
          {isLoading
            ? "Patientez..."
            : exerciceComptable
              ? "Mettre à jour"
              : "Créer"}
        </Button>
      </form>
    </Form>
  );
}
