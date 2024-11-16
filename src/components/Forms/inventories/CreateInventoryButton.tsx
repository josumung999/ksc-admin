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
import React, { useState } from "react";
import CreateInventoryForm from "./CreateInventoryForm";

interface CreateInventoryButtonProps {
  classProps: string;
  variant:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}
const CreateInventoryButton: React.FC<CreateInventoryButtonProps> = ({
  classProps,
  variant,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} size="lg" className={classProps}>
          Créer un inventaire
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer un inventaire</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour créer un inventaire
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateInventoryForm setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInventoryButton;
