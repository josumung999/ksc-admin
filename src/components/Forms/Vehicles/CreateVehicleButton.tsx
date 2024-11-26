import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import CreateVehicleForm from "./CreateVehicleForm";

export function CreateVehicleButton() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useSWR(
    `/api/v1/auth/users?role=DRIVER`,
    fetcher,
  );
  const drivers = data?.data?.records;

  console.log("data", data);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Créer un véhicule
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer un véhicule</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour créer un véhicule
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLoading ? (
            <div className="flex h-[30vh] items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
          ) : error ? (
            <p className="text-meta-1">Erreur: {error}</p>
          ) : (
            <CreateVehicleForm setOpen={setOpen} drivers={drivers} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
