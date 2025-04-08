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
import { Plus } from "lucide-react";
import { CreatePeriodComptableForm } from "./CreatePeriodComptable.tsx";

export function CreatePeriodComptableButton() {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useSWR(
    "/api/v1/accounting/exercices",
    fetcher,
  );
  const exercises = data?.data?.records;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer une période comptable</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour Créer une période comptable
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {isLoading ? (
            <div className="flex h-[30vh] items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
          ) : error ? (
            <p className="text-meta-1">
              Erreur: {error?.message || "Une erreur est survenue"}
            </p>
          ) : (
            <CreatePeriodComptableForm
              exercices={exercises}
              setOpen={setOpen}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
