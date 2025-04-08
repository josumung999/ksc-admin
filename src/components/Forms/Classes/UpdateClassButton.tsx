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
import { EditIcon, Plus } from "lucide-react";
import ClassForm from "./ClassForm";

export function UpdateClasseButton({ category }: { category: any }) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <EditIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Modifier cette catégorie</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour modifier cette catégorie
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ClassForm setOpen={setOpen} category={category} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
