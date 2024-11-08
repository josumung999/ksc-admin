"use client";
import ProductMediaItem from "@/components/Cards/ProductMediaItem";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/lib/utils";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  BookImage,
  Clock,
  Eye,
  Heart,
  Star,
  Target,
  Trash,
} from "lucide-react";
import Image from "next/image";

interface Props {
  medias?: any;
  isLoading?: boolean;
  error?: any;
}

const ProductMedias: React.FC<Props> = ({ medias, isLoading, error }) => {
  return (
    <div className="space-y-6 py-4">
      <div className="flex w-full flex-row items-center justify-end">
        <Button>Ajouter un média</Button>
      </div>

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : medias?.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {medias?.map((item: any) => (
              <ProductMediaItem key={item.id} media={item} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>Aucun média trouvé</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Gérez les médias de votre produit ici
            </EmptyPlaceholder.Description>
            <Button>Ajouter un média</Button>
          </EmptyPlaceholder>
        )}
      </div>
    </div>
  );
};

export default ProductMedias;
