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
import CreateClientForm from "./CreateClientForm";
import { Plus } from "lucide-react";

export function CreateClientButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <Plus className="mr-2 h-5 w-5" />
          Ajouter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer un client</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour créer un client
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateClientForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
