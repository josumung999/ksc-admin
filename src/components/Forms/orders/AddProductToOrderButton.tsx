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
import { Plus } from "lucide-react";
import { ProductVariantInventoryElement } from "@/types/productType";
import SelectAndAddProduct from "@/components/common/searchBar/order/products";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  setPurchasedProducts: React.Dispatch<
    React.SetStateAction<ProductVariantInventoryElement[]>
  >;
}

export function AddProductToOrderButton({ setPurchasedProducts }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <Plus className="mr-2 h-5 w-5" />
          Ajouter produit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1200px]">
        <DialogHeader>
          <DialogTitle>Ajouter un produit</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour ajouter un produit à la commande
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="min-h-70vh grid gap-4 py-4">
          <SelectAndAddProduct
            setPurchasedProducts={setPurchasedProducts}
            setOpen={setOpen}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
