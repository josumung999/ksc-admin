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
import { useState } from "react";
import useSWR, { mutate } from "swr";
import {
  cn,
  fetcher,
  FileData,
  getPresignedUrls,
  handleUpload,
} from "@/lib/utils";
import { ImagePlus, ListPlus, Plus } from "lucide-react";
import { AuthStore } from "@/store/authStore";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  ProductImagesStore,
  resetProductImagesState,
  updateProductImages,
} from "@/store/productImagesStore";
import CreateSingleAttributeForm from "./CreateSingleAttributeForm";

interface Props {
  variant: any;
  className?: string;
}

export function CreateAttributeButton({ variant, className }: Props) {
  const [open, setOpen] = useState(false);
  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { data, isLoading, error } = useSWR("/api/v1/attributes", fetcher);
  const existingAttributes = data?.data?.records;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className={cn(
            className,
            "inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10",
          )}
        >
          <ListPlus className="mr-2 h-5 w-5" />
          Ajouter un attribut
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Ajouter un attribut</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour ajouter un attribut du produit
          </DialogDescription>
        </DialogHeader>
        <CreateSingleAttributeForm
          availableAttributes={existingAttributes}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
