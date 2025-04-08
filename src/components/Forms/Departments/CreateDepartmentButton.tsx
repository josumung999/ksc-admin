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
import DepartmentForm from "./DepartmentForm";

export function CreateDepartmentButton() {
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
          <DialogTitle>Ajouter un département</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour Ajouter département
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DepartmentForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
