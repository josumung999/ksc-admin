import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Edit } from "lucide-react";
import { CreateExerciceComptableForm } from "./CreateExerciceComptableForm";

interface UpdateExerciceComptableButtonProps {
  exerciceComptable: any;
}

export function UpdateExerciceComptableButton({
  exerciceComptable,
}: UpdateExerciceComptableButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="border-none hover:text-meta-3"
          variant="outline"
          size="icon"
        >
          <Edit className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier exercice comptable</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour modifier cet exercice comptable
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateExerciceComptableForm
            setOpen={setOpen}
            exerciceComptable={exerciceComptable}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
