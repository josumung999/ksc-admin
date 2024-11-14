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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { mutate } from "swr";
import { useParams } from "next/navigation";
import { AuthStore } from "@/store/authStore";
import { LoaderIcon, Trash } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DeleteProductVariantButtonProps {
  variant: any;
  showDeleteAlert: boolean;
  setShowDeleteAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteProductVariantButton: React.FC<DeleteProductVariantButtonProps> = ({
  variant,
  showDeleteAlert,
  setShowDeleteAlert,
}) => {
  const [loading, setLoading] = useState(false);
  const { user } = AuthStore.useState();

  async function deleteProductVariant() {
    try {
      setLoading(true);
      const response = await axios.delete(
        `/api/v1/productVariants/${variant.id}`,
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        },
      );
      toast({
        title: response.data.message ?? "Supprimé avec succès",
      });
      setShowDeleteAlert(false);
      mutate(`/api/v1/productVariants?productId=${variant.productId}`);
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
    <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Etes vous sûr de vouloir supprimer cette variante?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irreversible
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-primary-color">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-meta-1 hover:bg-meta-1/70 focus:ring-meta-1"
            onClick={async (event) => {
              event.preventDefault();
              await deleteProductVariant();
            }}
            disabled={loading}
          >
            {loading ? (
              <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash className="mr-2 h-4 w-4" />
            )}
            <span>{loading ? "Veuillez patienter" : "Supprimer"}</span>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteProductVariantButton;
