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
import DepartmentForm from "./DepartmentForm";

interface UpdateDepartmentButtonProps {
  department: any;
}

export function UpdateDepartmentButton({
  department,
}: UpdateDepartmentButtonProps) {
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
            Utilisez ce formulaire pour modifier ce département
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DepartmentForm setOpen={setOpen} department={department} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
