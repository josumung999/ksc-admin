import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import axios from "axios";
import { AuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const ReportFormSchema = z.object({
  year: z.string().min(4, { message: "Veuillez choisir une année" }),
  currency: z.string().min(1, { message: "Veuillez choisir une devise" }),
});

export type BalanceSheetFormData = z.infer<typeof ReportFormSchema>;

interface BalanceSheetFormProps {
  setRecords: (data: any) => void;
  setIsLoading: (data: boolean) => void;
  setError: (data: any) => void;
}

function BalanceSheetForm({
  setRecords,
  setIsLoading,
  setError,
}: BalanceSheetFormProps) {
  const form = useForm<BalanceSheetFormData>({
    resolver: zodResolver(ReportFormSchema),
    mode: "all",
  });
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = form;
  const { user } = AuthStore.useState();

  const router = useRouter();

  const onSubmit = async (data: BalanceSheetFormData) => {
    try {
      setIsLoading(true);

      const { data: response } = await axios.get(
        `/api/v1/accounting/balanceSheet?currency=${data.currency}&year=${data.year}`,
        {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        },
      );

      toast.success("Balance Comptable Générée avec succès!");

      setRecords({
        data: response?.data?.records ?? [],
        currency: response?.data?.currency,
        year: data?.year,
      });
    } catch (error) {
      toast.error("Error creating report");
      console.error(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid w-full grid-cols-1 items-center gap-4 md:grid-cols-2 lg:grid-cols-5">
          <div className="col-span-2 w-full">
            <FormField
              control={control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <Select
                    {...field}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une devise" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-2 w-full">
            <FormField
              control={control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <Input {...field} placeholder="Année" />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || !isValid}
          >
            {isSubmitting ? "En cours..." : "Générer Balance"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default BalanceSheetForm;
