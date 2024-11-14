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

export function CreateVariantButton() {
  const [open, setOpen] = useState(false);
  const productVariant = ProductVariantStore.useState();
  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const { data, isLoading, error } = useSWR("/api/v1/attributes", fetcher);
  const existingAttributes = data?.data?.records;

  const { images, attributes, ...productVariantInfo } = productVariant;

  async function createProductVariant() {
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
          title: "Erreur lors de la sauvegarde de la variante.",
          variant: "destructive",
        });
        return;
      }

      const sanitizedVariantInfo = {
        ...productVariantInfo,
        inventoryCount: Number(productVariantInfo.inventoryCount),
        shipping: {
          weight: Number(productVariantInfo.shipping.weight),
          length: Number(productVariantInfo.shipping.length),
          breadth: Number(productVariantInfo.shipping.breadth),
          width: Number(productVariantInfo.shipping.width),
        },
        sellingPrice: Number(productVariantInfo.sellingPrice),
        salePrice: Number(productVariantInfo.salePrice),
      };

      // Prepare product data with image URLs
      const newVariant = {
        ...sanitizedVariantInfo,
        images: uploadedFiles,
        attributes: attributes,
        productId: String(params.id),
      };

      console.log("Product Variant Data =>", newVariant);

      // Send product creation request to the backend
      const response = await axios.post(
        "/api/v1/productVariants/create",
        newVariant,
        {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        },
      );

      toast({
        title: "Variante créée avec succès !",
        description: "La variante a été créée avec succès !",
      });

      console.log("Product created successfully:", response.data);

      setOpen(false);

      mutate(`/api/v1/productVariants?productId=${params.id}`);
    } catch (error: any) {
      toast({
        title: "Erreur lors de la création de la variante !",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
    if (
      productVariant?.inventoryCount < 0 ||
      productVariant?.sellingPrice < 0 ||
      productVariant?.shipping?.breadth < 0 ||
      productVariant?.shipping?.width < 0 ||
      productVariant?.shipping["length"] < 0 ||
      productVariant?.shipping?.weight < 0 ||
      productVariant?.images?.length < 0 ||
      productVariant?.attributes?.length < 0
    ) {
      toast({
        title: "Veuillez compléter le formulaire",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    } else {
      await createProductVariant();
      resetProductVariantState();
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          <Plus className="mr-2 h-5 w-5" />
          Créer une variante
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[900px]">
        <DialogHeader>
          <DialogTitle>Créer une variante</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour créer une variant
          </DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="flex h-[30vh] items-center justify-center">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
          </div>
        ) : error ? (
          <p className="text-meta-1">
            Erreur: {error?.message || "Une erreur est survenue"}
          </p>
        ) : (
          <ScrollArea className="grid h-[65vh] gap-4">
            <ImageDropzone imagesArray={images} updateImages={handleChange} />
            <ProductVariants />
            {attributes?.length > 0 && (
              <div className="mt-4 space-y-6">
                <h2 className="text-xl font-bold text-black dark:text-white">
                  Attributs
                </h2>
                <div className="space-y-4">
                  {attributes?.map((attribute: any, key: number) => (
                    <AttributeValueItem
                      key={key}
                      attributeValue={attribute}
                      onDelete={() => {
                        handleChange(
                          "attributes",
                          attributes.filter(
                            (attr: AttributeValue) =>
                              attr.attributeId !== attribute.attributeId,
                          ),
                        );
                      }}
                      availableAttributes={existingAttributes}
                    />
                  ))}
                </div>
              </div>
            )}
            <h2 className="py-6 text-xl font-bold text-black dark:text-white">
              Ajouter un attribut
            </h2>
            <CreateAttributeValue availableAttributes={existingAttributes} />
          </ScrollArea>
        )}
        <DialogFooter>
          <Button
            variant="secondary"
            className="w-full"
            onClick={() => {
              setOpen(false);
              resetProductVariantState();
            }}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            disabled={loading}
            variant="default"
            className="w-full bg-primary hover:bg-primary/80"
            onClick={handleSave}
          >
            {loading && <ReloadIcon className="mr-2 h-5 w-5 animate-spin" />}
            {loading ? "Patientez..." : "Ajouter variante"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
