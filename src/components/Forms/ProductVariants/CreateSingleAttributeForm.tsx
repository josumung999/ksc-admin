"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AuthStore } from "@/store/authStore";
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
import { ListPlus } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { mutate } from "swr";
import { useParams } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";

// Define your form schema using zod

interface Props {
  availableAttributes: any;
  attributeValue?: any;
  setOpen: any;
  variant?: any;
}

export default function CreateSingleAttributeForm({
  availableAttributes,
  attributeValue,
  setOpen,
  variant,
}: Props) {
  const formSchema = z.object({
    attributeId: z.string({
      required_error: "Selectionnez un attribut",
    }),
    value: z.string({
      required_error: "Saisissez une valeur",
    }),
  });
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  type FormData = z.infer<typeof formSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attributeId: attributeValue?.attributeId ?? "",
      value: attributeValue?.value ?? "",
    },
  });

  const { user } = AuthStore.useState();

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const url = attributeValue
        ? `/api/v1/attributeValues/${attributeValue.id}`
        : "/api/v1/attributeValues/create";
      const method = attributeValue ? "put" : "post";

      const { data: response } = await axios({
        method,
        url,
        data: {
          ...data,
          productVariantId: variant ? variant.id : null,
        },
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });

      console.log("Response Data:", response);

      toast({
        title: attributeValue
          ? "Attribut mis à jour avec succès !"
          : "Attribut créé avec succès !",
        description: "Enregistré avec avec succès!",
      });

      mutate(`/api/v1/productVariants?productId=${params.id}`);

      setOpen(false);
    } catch (error) {
      toast({
        title: attributeValue
          ? "Erreur lors de la mise à jour de l'attribut"
          : "Erreur lors de la création de l'attribut",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-2">
        <FormField
          control={form.control}
          name="attributeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attribut</FormLabel>
              <Select {...field} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un attribut" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableAttributes.map((attribute: any) => (
                    <SelectItem key={attribute.id} value={attribute.id}>
                      {`${attribute?.name} (${attribute?.type})`}
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
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valeur de l&apos;attribut</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Bleu" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          variant="default"
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <ReloadIcon className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <ListPlus className="mr-2 h-5 w-5" />
          )}
          {attributeValue ? "Mettre à jour" : "Ajouter Attribut"}
        </Button>
      </form>
    </Form>
  );
}
