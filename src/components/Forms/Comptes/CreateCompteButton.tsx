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
import { Plus } from "lucide-react";
import CompteForm from "./CompteForm";

export function CreateCompteButton() {
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
        <Button
          variant="outline"
          size="lg"
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un compte
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Créer compte</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour créer compte
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
            <CompteForm classes={classes} setOpen={setOpen} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
