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
import SearchDialogProduct from "@/components/common/searchBar/order/client";
import { productOrderType } from "@/types/productOrderType";
import SearchProductOrderVariants from "@/components/common/searchBar/order/products";
import { ProductInventoryElement } from "@/types/productType";
interface OrderProductVariantInformationsProps {
  setData: React.Dispatch<React.SetStateAction<productOrderType[] | undefined>>;
  setVariantOpen: React.Dispatch<boolean>;
  variantOpen: boolean;
  product: ProductInventoryElement;
}

const OrderProductVariantInformations: React.FC<
  OrderProductVariantInformationsProps
> = ({ setData, setVariantOpen, variantOpen, product }) => {
  return (
    <Dialog open={variantOpen} onOpenChange={setVariantOpen}>
      <DialogTrigger asChild></DialogTrigger>
      <DialogContent className="pt-5 sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Selectionné un variant</DialogTitle>
          <DialogDescription>
            Utilisez cette fenetre pour selectionner un variant
          </DialogDescription>
        </DialogHeader>

        {/* <div className="flex min-h-fit items-center justify-center ">
          <SearchProductOrderVariants product={product} setData={setData} />
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default OrderProductVariantInformations;
