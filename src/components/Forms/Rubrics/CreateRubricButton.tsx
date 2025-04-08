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
import { Plus } from "lucide-react";
import { useState } from "react";
import CreateRubricForm from "./CreateRubricForm";

export function CreateRubricButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg" className="bg-primary ">
          <Plus className="mr-2 h-5 w-5" />
          Ajouter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Ajouter une rubrique</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour Ajouter une rubrique
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateRubricForm rubric={null} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
