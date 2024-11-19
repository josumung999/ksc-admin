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
import { PackagePlus } from "lucide-react";

interface CreateInventoryButtonProps {
  classProps: string;
  variant_id: string;
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
  variant_id,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={classProps}>
          <PackagePlus className="mr-2 h-4 w-4" />
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
          <CreateInventoryForm variant_id={variant_id} setOpen={setOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInventoryButton;
