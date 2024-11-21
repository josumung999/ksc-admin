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
import React, { useState } from "react";
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
import { AuthStore } from "@/store/authStore";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { mutate } from "swr";
import { useParams } from "next/navigation";

interface Props {
  media?: any;
  isVariant?: boolean;
}

export default function ProductMediaItem({ media, isVariant = false }: Props) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showCoverImageAlert, setShowCoverImageAlert] = useState(false);
  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  async function setCoverImage() {
    try {
      setLoading(true);
      const url = isVariant
        ? `/api/v1/productVariants/${media.variantId}`
        : `/api/v1/products/${media.productId}`;
      const response = await axios.put(
        url,
        {
          coverImageId: media.id,
        },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );

      toast({
        title: response.data.message ?? "Mis à jour avec succès",
      });

      mutate(
        isVariant
          ? `/api/v1/productVariants?productId=${params.id}`
          : `/api/v1/products/${params.id}`,
      );
    } catch (error: any) {
      console.log("Error", error);
      toast({
        title: error?.response?.data?.message ?? "Une erreur s'est produite",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function deleteMedia() {
    try {
      setLoading(true);
      const response = await axios.delete(`/api/v1/medias/${media.id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      toast({
        title: response.data.message ?? "Supprimé avec succès",
      });

      mutate(
        isVariant
          ? `/api/v1/productVariants?productId=${params.id}`
          : `/api/v1/products/${media.productId}`,
      );
    } catch (error: any) {
      console.log("Error", error);
      toast({
        title: error?.response?.data?.message ?? "Une erreur s'est produite",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card className="w-full border-none bg-transparent shadow-none">
        <CardHeader className="px-0 pb-3 pt-0">
          <div className="relative aspect-1 w-full overflow-hidden rounded-xl">
            <Image
              src={media.mediaUrl}
              width={720}
              height={480}
              alt=""
              className="w-full rounded-xl object-cover transition-opacity hover:opacity-80"
            />
            {media.coverOf && (
              <Badge variant="default" className="absolute left-[6%] top-[8%] ">
                Couverture
              </Badge>
            )}
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
                <DropdownMenuItem onSelect={() => setShowCoverImageAlert(true)}>
                  <BookImage />
                  <span>Image de couverture</span>
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

                await deleteMedia();
                setShowDeleteAlert(false);
              }}
              className="bg-meta-1/90 hover:bg-meta-1/70 focus:ring-meta-1"
              disabled={loading}
            >
              {loading ? (
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash className="mr-2 h-4 w-4" />
              )}
              <span>Supprimer</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AlertDialog
        open={showCoverImageAlert}
        onOpenChange={setShowCoverImageAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Voulez-vous vraiment utiliser cette image comme image de
              couverture
            </AlertDialogTitle>
            <AlertDialogDescription>
              L&apos;image de couverture sera utilisée comme image principale du
              produit
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={async (event) => {
                event.preventDefault();

                await setCoverImage();
                setShowCoverImageAlert(false);
              }}
              className="bg-meta-3/90 hover:bg-meta-3/70 focus:ring-meta-3"
              disabled={loading}
            >
              {loading ? (
                <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <BookImage className="mr-2 h-4 w-4" />
              )}
              <span>Confirmer</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
