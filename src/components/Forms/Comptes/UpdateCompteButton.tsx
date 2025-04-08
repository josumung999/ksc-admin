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
import { EditIcon } from "lucide-react";
import CompteForm from "./CompteForm";

export function UpdateCompteButton({ account }: { account: any }) {
  const [open, setOpen] = useState(false);
  const {
    data: classesData,
    isLoading: classesLoading,
    error: classesError,
  } = useSWR("/api/v1/accounting/classes", fetcher);
  const classes = classesData?.data?.records;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <EditIcon className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Modifier ce compte</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour modifier ce compte
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {classesLoading ? (
            <div className="flex h-[30vh] items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
          ) : classesError ? (
            <p className="text-meta-1">
              Erreur: {classesError.message || "Une erreur est survenue"}
            </p>
          ) : (
            <CompteForm account={account} classes={classes} setOpen={setOpen} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
