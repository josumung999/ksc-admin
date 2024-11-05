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
          Créer une variante
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Créer une variante</DialogTitle>
          <DialogDescription>
            Utilisez ce formulaire pour créer une variant
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="grid h-[65vh] gap-4">
          <ImageDropzone imagesArray={images} updateImages={handleChange} />
          <ProductVariants />
          {attributes?.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-medium text-black dark:text-white">
                Attributs
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                  />
                ))}
              </div>
            </div>
          )}
          <CreateAttributeValue availableAttributes={existingAttributes} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
