"use client";
import Switch from "@/components/Switch";
import AutoForm, { AutoFormSubmit } from "@/components/ui/auto-form";
import {
  AutoFormInputComponentProps,
  DependencyType,
} from "@/components/ui/auto-form/types";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { AuthStore } from "@/store/authStore";
import { handleChange } from "@/store/newProductStore";
import axios from "axios";
import { useState } from "react";
import { mutate } from "swr";
import * as z from "zod";

// Define your form schema using zod

interface Props {
  pricing?: any;
}

export default function ProductPricingForm({ pricing }: Props) {
  const formSchema = z.object({
    buyingPrice: z
      .number()
      .min(0, "Prix d'achat doit être un nombre positif")
      .describe("Prix d'achat ($)")
      .default(pricing ? pricing.buyingPrice : ""),
    sellingPrice: z
      .number()
      .min(0, "Prix de vente doit être un nombre positif")
      .describe("Prix de vente ($)")
      .default(pricing ? pricing.sellingPrice : ""),
    salePrice: z
      .number()
      .min(0, "Prix de vente doit être un nombre positif")
      .describe("Prix promotionnel ($)")
      .default(pricing ? pricing.salePrice : "")
      .optional(),
    isOnSale: z
      .boolean()
      .describe("Ce produit est-il en promotion")
      .default(pricing ? pricing.isOnSale : false)
      .optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  return (
    <AutoForm
      // Pass the schema to the form
      formSchema={formSchema}
      // You can add additional config for each field
      // to customize the UI
      fieldConfig={{
        buyingPrice: {
          fieldType: "number",
          inputProps: {
            placeholder: "Ex: 120",
          },
        },
        sellingPrice: {
          inputProps: {
            placeholder: "Ex: 200",
          },
        },
        salePrice: {
          inputProps: {
            placeholder: "Ex: 180",
          },
        },
        isOnSale: {
          description:
            "Si coché, le prix promotionnel sera appliqué lors de l'achat de l'article",
          fieldType: ({
            label,
            isRequired,
            field,
            fieldConfigItem,
            fieldProps,
          }: AutoFormInputComponentProps) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-neutral-200 p-4">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  {...fieldProps}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  {label}
                  {isRequired && <span className="text-destructive"> *</span>}
                </FormLabel>
                {fieldConfigItem.description && (
                  <FormDescription>
                    {fieldConfigItem.description}
                  </FormDescription>
                )}
              </div>
            </FormItem>
          ),
        },
      }}
      onValuesChange={({
        sellingPrice = 0,
        buyingPrice = 0,
        salePrice = 0,
        isOnSale = false,
      }) => {
        handleChange("sellingPrice", sellingPrice);
        handleChange("buyingPrice", buyingPrice);
        handleChange("salePrice", salePrice);
        handleChange("isOnSale", isOnSale);
      }}

      // Optionally, define dependencies between fields
    ></AutoForm>
  );
}
