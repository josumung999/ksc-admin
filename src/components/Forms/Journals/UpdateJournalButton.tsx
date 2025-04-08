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
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { EditIcon, Plus } from "lucide-react";
import CreateJournalForm from "./CreateJournalForm";

export function UpdateJournalButton({ journal }: { journal: any }) {
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
          <DialogTitle>Modifier ce journal</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour modifier ce journal
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateJournalForm setOpen={setOpen} journal={journal} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
