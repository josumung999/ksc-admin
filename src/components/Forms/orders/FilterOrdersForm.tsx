import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { OrderTrackingStatus } from "@/types/getOrderType";

export const FormSchema = z.object({
  driverId: z.string().optional(),
  searchTerm: z.string().optional(),
  status: z.string().optional(),
});

export type FilterOrdersFormData = z.infer<typeof FormSchema>;

interface FilterOrdersFormProps {
  searchTerm: string | undefined;
  setSearchTerm: any;
  statusFilter: string | undefined;
  setStatusFilter: (value: string | undefined) => void;
  setCurrentPage: (value: number) => void;
}

function FilterOrdersForm({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  setCurrentPage,
}: FilterOrdersFormProps) {
  const form = useForm<FilterOrdersFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      searchTerm: searchTerm || "",
      status: statusFilter || "",
    },
  });

  const onSubmit = (data: FilterOrdersFormData) => {
    setSearchTerm(data.searchTerm || undefined);
    setStatusFilter(data.status || undefined);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilter = () => {
    form.reset();
    setStatusFilter(undefined);
    setSearchTerm(undefined);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3">
          {/* Search Input */}
          <FormField
            control={form.control}
            name="searchTerm"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Rechercher..."
                    className="bg-white"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue
                      className="bg-white"
                      placeholder="Filtrer par statut"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={OrderTrackingStatus.DRAFT}>
                    En cours
                  </SelectItem>
                  <SelectItem value={OrderTrackingStatus.IN_TRANSIT}>
                    En transit
                  </SelectItem>
                  <SelectItem value={OrderTrackingStatus.PACKED}>
                    Emballées
                  </SelectItem>
                  <SelectItem value={OrderTrackingStatus.RETURNED}>
                    Annulées
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          <div className="flex w-full justify-between gap-2 md:justify-end">
            <Button className="bg-primary" type="submit">
              <Search className="mr-2 h-4 w-4" />
              Rechercher
            </Button>
            <Button type="button" variant="outline" onClick={handleClearFilter}>
              Réinitialiser
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
export default FilterOrdersForm;
