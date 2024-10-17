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
import CreateCategoryForm from "./CreateCategoryForm";

export function CreateCategoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Créer une catégorie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer une catégorie</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour créer une catégorie
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateCategoryForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
