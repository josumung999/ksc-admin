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
  ProductVariantStore,
} from "@/store/productVariantStore";
import { useState } from "react";
import ProductVariants from ".";
import { ScrollArea } from "@/components/ui/scroll-area";
import AttributeValueItem from "@/components/Cards/AttributeValueItem";
import CreateAttributeValue from "./CreateAttributeValue";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { Plus } from "lucide-react";

export function CreateVariantButton() {
  const [open, setOpen] = useState(false);
  const productVariant = ProductVariantStore.useState();

  const { data, isLoading, error } = useSWR("/api/v1/attributes", fetcher);
  const existingAttributes = data?.data?.records;

  const { images, attributes, ...productVariantInfo } = productVariant;

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
            <h2 className="p-2 text-xl font-bold text-black dark:text-white">
              Ajouter un attribut
            </h2>
            <CreateAttributeValue availableAttributes={existingAttributes} />
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
