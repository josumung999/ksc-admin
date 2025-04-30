import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import { differenceInDays, isMonday, isSunday } from "date-fns";
import axios from "axios";
import { AuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import DateRangePicker from "../DateRangePicker";
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

export const ReportFormSchema = z.object({
  dateRange: z
    .array(z.date())
    .length(2, { message: "Veuillez choisir une plage de 2 dates" }),
  accountId: z.string().min(1, { message: "Veuillez choisir un compte" }),
});

export type AccountLedgerFormData = z.infer<typeof ReportFormSchema>;

interface AccountLedgerFormProps {
  setRecords: (data: any) => void;
  setIsLoading: (data: boolean) => void;
  setError: (data: any) => void;
  accounts: any;
}

function AccountLedgerForm({
  setRecords,
  setIsLoading,
  setError,
  accounts,
}: AccountLedgerFormProps) {
  const form = useForm<AccountLedgerFormData>({
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

  const onSubmit = async (data: AccountLedgerFormData) => {
    try {
      setIsLoading(true);
      const [startDate, endDate] = data.dateRange;

      const { data: response } = await axios.get(
        `/api/v1/accounting/ledger?accountId=${data.accountId}&startDate=${startDate}&endDate=${endDate}&filterBy=${accounts.find((account: any) => account.id === data.accountId)?.intermediateAccount?.length === 3 ? "sub" : "main"}`,
        {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        },
      );

      console.log("Ledger Data:", response);

      toast.success("Grand Livre Généré avec succès!");

      setRecords({
        data: response?.data?.records ?? [],
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
        <div className="grid w-full grid-cols-1 items-center gap-4 md:grid-cols-3">
          <div className="w-full">
            <Controller
              name="dateRange"
              control={control}
              render={({ field }) => (
                <DateRangePicker
                  name="dateRange"
                  control={control}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.dateRange && (
              <p className="text-meta-1">{errors.dateRange.message}</p>
            )}
          </div>

          <div className="w-full">
            {/* Main Account */}
            <FormField
              control={control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un compte" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {accounts.map((acc: any) => (
                        <SelectItem key={acc.id} value={acc.id}>
                          {acc.label} -{" "}
                          {acc?.intermediateAccount?.length === 3
                            ? acc.subAccount
                            : acc.mainAccount}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            {isSubmitting ? "En cours..." : "Générer Grand Livre"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default AccountLedgerForm;
