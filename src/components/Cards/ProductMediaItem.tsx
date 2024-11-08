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

interface Props {
  media?: any;
}

export default function ProductMediaItem({ media }: Props) {
  return (
    <Card className="w-full border-none bg-transparent shadow-none">
      <CardHeader className="px-0 pb-3 pt-0">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            src={media.mediaUrl}
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
              {formatDate(media.createdAt)}
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
  );
}
