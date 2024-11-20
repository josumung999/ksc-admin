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

// Define your form schema using zod

interface Props {
  availableAttributes: any;
  attributeValue?: any;
  setOpen: any;
}

export default function CreateSingleAttributeForm({
  availableAttributes,
  attributeValue,
  setOpen,
}: Props) {
  const formSchema = z.object({
    attributeId: z.string({
      required_error: "Selectionnez un attribut",
    }),
    value: z.string({
      required_error: "Saisissez une valeur",
    }),
  });

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
    setOpen(false);
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
        >
          <ListPlus className="mr-2 h-5 w-5" />
          {attributeValue ? "Mettre à jour" : "Ajouter Attribut"}
        </Button>
      </form>
    </Form>
  );
}
