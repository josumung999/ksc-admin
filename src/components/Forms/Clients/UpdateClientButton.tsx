import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Edit } from "lucide-react";
import { clientType } from "@/components/types_interfaces/clientType";
import CreateClientForm from "./CreateClientForm";

interface UpdateClientButtonProps {
  client: clientType;
}

export function UpdateClientButton({ client }: UpdateClientButtonProps) {
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
          <DialogTitle>Modifier {client?.fullName.split(" ")[0]}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <CreateClientForm setOpen={setOpen} client={client} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
