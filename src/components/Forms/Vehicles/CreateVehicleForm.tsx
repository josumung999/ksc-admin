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

// Define your form schema using zod

interface Props {
  vehicle?: any;
  setOpen: any;
  drivers?: any;
}

export default function CreateVehicleForm({
  vehicle,
  setOpen,
  drivers,
}: Props) {
  const formSchema = z.object({
    name: z.string().min(2, "Le nom du véhicule est obligatoire."),
    brand: z.string().min(2, "Le marque du véhicule est obligatoire."),
    model: z.string().min(2, "Le modèle du véhicule est obligatoire."),
    year: z.coerce
      .number()
      .min(1900, "L'année du véhicule est obligatoire.")
      .transform((value) => Number(value)),
    immatriculation: z.string().min(2, "Le numéro de plaque est obligatoire."),
    driverId: z.string({
      required_error: "Veuillew choisir un chauffeur",
    }),
  });

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: vehicle?.name ?? "",
      brand: vehicle?.brand ?? "",
      model: vehicle?.model ?? "",
      year: vehicle?.year ?? "",
      immatriculation: vehicle?.immatriculation ?? "",
      driverId: vehicle?.driverId ?? "",
    },
  });

  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const url = vehicle
        ? `/api/v1/vehicles/${vehicle.id}`
        : "/api/v1/vehicles/create";
      const method = vehicle ? "put" : "post";

      const { data: response } = await axios({
        method,
        url,
        data: {
          ...data,
          year: String(data.year),
        },
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });

      toast({
        title: vehicle
          ? "Véhicule mis à jour avec succès!"
          : "Véhicule créé avec succès!",
        description: "Enregistré avec avec succès!",
      });

      setOpen(false);
      mutate(`/api/v1/vehicles`);
    } catch (error) {
      toast({
        title: vehicle
          ? "Erreur lors de la mise à jour du véhicule."
          : "Erreur lors de la création du véhicule.",
        variant: "destructive",
      });
      console.log(error);
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
              <FormLabel>Nom du véhicule</FormLabel>
              <FormControl>
                <Input placeholder="Le Nom du véhicule" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="brand"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Marque du véhicule</FormLabel>
              <FormControl>
                <Input placeholder="La marque du véhicule" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Modèle du véhicule</FormLabel>
              <FormControl>
                <Input placeholder="Le modèle du véhicule" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Année de production du véhicule</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 2005" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="immatriculation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Le numéro de plaque</FormLabel>
              <FormControl>
                <Input
                  placeholder="Le numéro de plaque d'immatriculation"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hazina Account Select */}
        <FormField
          control={form.control}
          name="driverId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chauffeur en charge du véhicule</FormLabel>
              <Select
                {...field}
                onValueChange={(value) => {
                  field.onChange(value);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un chauffeur" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {drivers.map((item: any) => (
                    <SelectItem key={item.id} value={item.id}>
                      {`${item?.firstName} ${item?.middleName ?? ""} ${item?.lastName}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={loading} className="" type="submit">
          {loading ? "Patientez..." : vehicle ? "Mettre à jour" : "Créer"}
        </Button>
      </form>
    </Form>
  );
}
