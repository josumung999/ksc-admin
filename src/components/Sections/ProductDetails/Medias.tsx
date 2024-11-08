"use client";
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
import Link from "next/link";

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
              <Card
                key={item.id}
                className="w-full border-none bg-transparent shadow-none"
              >
                <CardHeader className="px-0 pb-3 pt-0">
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl">
                    <Image
                      src={item.mediaUrl}
                      width={720}
                      height={480}
                      alt=""
                      className="w-full rounded-xl object-cover transition-opacity hover:opacity-80"
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 px-2">
                  <div className="flex flex-row items-center justify-between">
                    <div className="flex flex-row items-center justify-start space-x-0.5">
                      <Clock className="h-3 w-3 text-yellow-500" />
                      <span className="text-prime text-[10px] font-light">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="outline">
                          <DotsVerticalIcon className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>Gérer cette image</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <BookImage />
                          <span>Utiliser comme image de couverture</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          <Eye />
                          <span>Visualiser</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash />
                          <span>Supprimer l&apos;image</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
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
