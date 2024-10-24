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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Edit } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import CreateRoleForm from "./CreateRoleForm";

interface UpdateRoleButtonProps {
  role: any;
}

export function UpdateRoleButton({ role }: UpdateRoleButtonProps) {
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useSWR("/api/v1/permissions", fetcher);
  const permissions = data?.data?.records;

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
          {isLoading ? (
            <div className="flex h-[30vh] items-center justify-center">
              <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
            </div>
          ) : error ? (
            <p className="text-meta-1">Erreur: {error}</p>
          ) : (
            <CreateRoleForm
              availablePermissions={permissions}
              setOpen={setOpen}
              role={role}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
