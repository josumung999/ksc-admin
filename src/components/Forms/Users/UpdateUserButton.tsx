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
import CreateUserForm from "./CreateUserForm";

interface UpdateUserButtonProps {
  user: any;
}

export function UpdateUserButton({ user }: UpdateUserButtonProps) {
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
          <DialogTitle>Modifier utilisateur</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour modifier cet utilisateur
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateUserForm setOpen={setOpen} currentUser={user} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
