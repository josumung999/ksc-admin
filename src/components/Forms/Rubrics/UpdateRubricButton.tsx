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
import CreateCommuneForm from "./CreateRubricForm";
import CreateRubricForm from "./CreateRubricForm";

interface UpdateRubricButtonProps {
  rubric: any;
}

export function UpdateRubricButton({ rubric }: UpdateRubricButtonProps) {
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
          <DialogTitle>Modifier rubrique</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour modifier cette rubrique
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateRubricForm setOpen={setOpen} rubric={rubric} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
