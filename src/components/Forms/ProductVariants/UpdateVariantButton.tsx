import ImageDropzone from "@/components/ImageDropZone";
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
import {
  AttributeValue,
  handleChange,
  ProductVariant,
  ProductVariantStore,
  resetProductVariantState,
} from "@/store/productVariantStore";
import { useState } from "react";
import ProductVariants from ".";
import { ScrollArea } from "@/components/ui/scroll-area";
import AttributeValueItem from "@/components/Cards/AttributeValueItem";
import CreateAttributeValue from "./CreateAttributeValue";
import useSWR, { mutate } from "swr";
import { fetcher, getPresignedUrls, handleUpload } from "@/lib/utils";
import { Plus } from "lucide-react";
import { AuthStore } from "@/store/authStore";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import UpdateProductVariantForm from "./UpdateProductVariantForm";

interface UpdateVariantButtonProps {
  variant: any;
  open: boolean;
  setOpen: any;
}

export function UpdateVariantButton({
  variant,
  open,
  setOpen,
}: UpdateVariantButtonProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Modifier cette variante</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour modifier variante
          </DialogDescription>
        </DialogHeader>
        <UpdateProductVariantForm variant={variant} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
