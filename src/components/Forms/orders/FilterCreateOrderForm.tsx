import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

export const FormSchema = z.object({
  driverId: z.string().optional(),
  searchTerm: z.string().optional(),
  status: z.string().optional(),
});

export type FilterCreateOrderFormData = z.infer<typeof FormSchema>;

interface FilterCreateOrderFormFormProps {
  categoryFilter: string | undefined;
  setCategoryFilter: (value: string | undefined) => void;
  searchTerm: string | undefined;
  setSearchTerm: any;
  statusFilter: string | undefined;
  setStatusFilter: (value: string | undefined) => void;
  categories: any;
  setCurrentPage: (value: number) => void;
}

function FilterLivraisonsForm({
  categoryFilter,
  setCategoryFilter,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  categories,
  setCurrentPage,
}: FilterCreateOrderFormFormProps) {
  const form = useForm<FilterCreateOrderFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      driverId: categoryFilter || "",
      searchTerm: searchTerm || "",
      status: statusFilter || "",
    },
  });

  const onSubmit = (data: FilterCreateOrderFormData) => {
    setCategoryFilter(data.driverId || undefined);
    setSearchTerm(data.searchTerm || undefined);
    setStatusFilter(data.status || undefined);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleClearFilter = () => {
    form.reset();
    setCategoryFilter(undefined);
    setStatusFilter(undefined);
    setSearchTerm(undefined);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-4">
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

          {/* Agent Select */}
          <FormField
            control={form.control}
            name="driverId"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue
                      className="bg-white"
                      placeholder="Filtrer par livreur"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map((agent: any) => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {`${agent.firstName} ${agent.middleName || ""} ${agent.lastName}`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  <SelectItem value={"PENDING"}>En attente</SelectItem>
                  <SelectItem value={"IN_TRANSIT"}>En transit</SelectItem>
                  <SelectItem value={"DELIVERED"}>Terminées</SelectItem>
                  <SelectItem value={"CANCELLED"}>Annulées</SelectItem>
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
export default FilterLivraisonsForm;
