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
import { CreateExerciceComptableForm } from "./CreateExerciceComptableForm";

export function CreateExerciceComptableButton() {
  const [open, setOpen] = useState(false);

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
          <DialogTitle>Créer un exercice comptable</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour Créer un exercice comptable
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateExerciceComptableForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
