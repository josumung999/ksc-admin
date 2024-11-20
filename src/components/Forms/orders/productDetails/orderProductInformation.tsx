import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import SearchDialogProduct from "@/components/common/searchBar/order/products";
import { productOrderType } from "@/types/productOrderType";
interface ClientInformationsProps {
  setData: React.Dispatch<productOrderType>;
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
          Ajouter un produit
        </Button>
      </DialogTrigger>
      <DialogContent className="pt-5 sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Chercher un produit</DialogTitle>
          <DialogDescription>
            Utilisez cette fenetre pour selectinner un produit et sa quantité
          </DialogDescription>
        </DialogHeader>

        <div className="flex min-h-fit items-center justify-center ">
          <SearchDialogProduct setOpen={setOpen} setProductData={setData} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ClientInformations;
