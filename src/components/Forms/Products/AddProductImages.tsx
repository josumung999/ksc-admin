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
import { mutate } from "swr";
import { cn, FileData, getPresignedUrls, handleUpload } from "@/lib/utils";
import { ImagePlus, Plus } from "lucide-react";
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

interface Props {
  variant?: any;
  className?: string;
}

export function AddProductImages({ variant, className }: Props) {
  const [open, setOpen] = useState(false);
  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { images } = ProductImagesStore.useState();

  async function addProductImages() {
    try {
      setLoading(true);

      // Generate presigned URL for each file in the form
      const presignedUrls = await getPresignedUrls(images);
      if (!presignedUrls?.length) {
        toast({
          title: "Erreur lors de la sauvegarde du produit.",
          variant: "destructive",
        });
        return;
      }

      console.log("Presigned URLs =>", presignedUrls);

      // Upload the files to the presigned URLs
      const uploadedFiles = await handleUpload(images, presignedUrls);
      console.log("Uploaded files =>", uploadedFiles);

      if (!uploadedFiles?.length) {
        toast({
          title: "Erreur lors de la sauvegarde des images.",
          variant: "destructive",
        });
        return;
      }

      // Send product creation request to the backend
      const response = await axios.post(
        "/api/v1/medias/create",
        {
          images: uploadedFiles,
          productId: variant ? null : String(params.id),
          variantId: variant ? String(variant.id) : null,
        },
        {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        },
      );

      toast({
        title: "Images ajoutées avec succès !",
        description: "Les images ont été ajoutées avec succès !",
      });

      console.log("Images uploaded successfully:", response.data);

      setOpen(false);

      mutate(
        variant
          ? `/api/v1/productVariants?productId=${params.id}`
          : `/api/v1/products/${params.id}`,
      );
    } catch (error: any) {
      toast({
        title: "Erreur lors de la sauvegarde des images !",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
      console.error("Error creating product images:", error);
    } finally {
      setLoading(false);
    }
  }

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
          <ImagePlus className="mr-2 h-5 w-5" />
          Ajouter des images
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Ajouter des images</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour ajouter des images du produit
          </DialogDescription>
        </DialogHeader>
        <ImageDropzone
          imagesArray={images}
          updateImages={updateProductImages}
        />
        <DialogFooter>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setOpen(false);
              resetProductImagesState();
            }}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            disabled={loading}
            variant="default"
            className="w-full bg-primary hover:bg-primary/80"
            onClick={addProductImages}
          >
            {loading ? (
              <ReloadIcon className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <ImagePlus className="mr-2 h-5 w-5" />
            )}
            {loading ? "Patientez..." : "Enregistrer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
