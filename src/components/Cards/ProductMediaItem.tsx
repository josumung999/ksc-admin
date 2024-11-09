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
  LoaderIcon,
  Star,
  Target,
  Trash,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
  media?: any;
}

export default function ProductMediaItem({ media }: Props) {
  const [showDeleteAlert, setShowDeleteAlert] = React.useState<boolean>(false);

  return (
    <>
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
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive flex cursor-pointer items-center"
                  onSelect={() => setShowDeleteAlert(true)}
                >
                  <Trash />
                  <span>Supprimer l&apos;image</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Etes vous sûr de vouloir supprimer cette image?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irreversible
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();
                console.log("Media deleted");
              }}
              className="bg-meta-1/90 hover:bg-meta-1/70 focus:ring-meta-1"
            >
              {/* {isDeleteLoading ? (
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )} */}
              <Trash className="mr-2 h-4 w-4" />
              <span>Supprimer</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
