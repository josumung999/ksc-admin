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
import { Edit } from "lucide-react";
import CreatePermissionForm from "./CreatePermissionForm";

interface UpdatePermissionButtonProps {
  permission: any;
}

export function UpdatePermissionButton({
  permission,
}: UpdatePermissionButtonProps) {
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
          <DialogTitle>Modifier ce rôle</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour modifier ce rôle
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreatePermissionForm setOpen={setOpen} permission={permission} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
