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
import React, { useState } from "react";
import { SearchBar } from "@/components/common/searchBar";
import useSWR from "swr";
import { clientType } from "@/components/types_interfaces/clientType";
import SearchDialogClient from "@/components/common/searchBar/order/client";
import { ScrollArea } from "@/components/ui/scroll-area";
interface ClientInformationsProps {
  setData: React.Dispatch<clientType>;
}

const ClientInformations: React.FC<ClientInformationsProps> = ({ setData }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Chercher un client
        </Button>
      </DialogTrigger>
      <DialogContent className="pt-5 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chercher un client</DialogTitle>
          <DialogDescription>
            Utilisez cette fenetre pour selectinner un client
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-h-fit items-center justify-center ">
          <SearchDialogClient setOpen={setOpen} setClientData={setData} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientInformations;
