import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import "swiper/css";
import "@/css/SwiperGallery.css";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateProductAttributeButton } from "@/components/Forms/ProductVariants/CreateAttributeButton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit2, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UpdateAttributeValueButton } from "@/components/Forms/ProductVariants/UpdateAttributeValueButton";

interface Props {
  setOpen: any;
  open: boolean;
  variant: any;
}

export function VariantAttributes({ setOpen, open, variant }: Props) {
  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {variant?.product?.name ?? "Détails de la variante"}
          </SheetTitle>
          <SheetDescription>Images de la variante</SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[80vh] w-full gap-4 py-4">
          <Table>
            <TableCaption>
              La liste des attributs de cette variante.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Attribut</TableHead>
                <TableHead>Valeur</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {variant?.attributes?.map((item: any, index: number) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.attribute.name}
                  </TableCell>
                  <TableCell>{item.value}</TableCell>
                  <TableCell className="flex flex-row space-x-2">
                    <UpdateAttributeValueButton
                      variant={variant}
                      attributeValue={item}
                    />
                    <Button
                      size="icon"
                      variant="outline"
                      className="text-danger"
                    >
                      <Trash className="h-5 w-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
        <SheetFooter>
          <CreateProductAttributeButton variant={variant} className="w-full" />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
