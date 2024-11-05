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
import { AuthStore } from "@/store/authStore";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  AttributeValue,
  handleChange,
  ProductVariantStore,
} from "@/store/productVariantStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

// Define your form schema using zod

interface Props {
  availableAttributes: any;
  attributeValue?: any;
}

export default function CreateAttributeValue({
  availableAttributes,
  attributeValue,
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
  const { attributes } = ProductVariantStore.useState();

  const onSubmit = async (data: FormData) => {
    const selectedAttribute: any = attributes.find(
      (attribute) => attribute.attributeId === data.attributeId,
    );

    if (selectedAttribute) {
      toast.error("Attribute already exists");
      return;
    }

    handleChange("attributes", [
      ...attributes,
      {
        ...selectedAttribute,
        value: data.value,
      },
    ]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
        <Button className="" type="submit">
          {"Ajouter"}
        </Button>
      </form>
    </Form>
  );
}
