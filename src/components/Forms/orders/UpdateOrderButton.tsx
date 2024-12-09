"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { clientType } from "@/types/clientType";
import { paymentMethodEnum } from "@/types/orderInfoType";
import { ProductVariantInventoryElement } from "@/types/productType";
import { AuthStore } from "@/store/authStore";
import { SetStateAction, useState } from "react";
import { mutate } from "swr";
import { toast } from "react-toastify";

interface orderDataInterface {
  comment: string;
  date: string;
  paymentMethod: paymentMethodEnum;
  id?: string;
}
interface factureData {
  client: clientType;
  orderData: orderDataInterface;
  updated: boolean;
  purchasedProducts: ProductVariantInventoryElement[];
  label: string;
  disabled: boolean;
  setIsLoadingUpdate: React.Dispatch<SetStateAction<boolean>>;
  isLoadingUpdate: boolean;
}
export default function UpdateOrder({
  client,
  orderData,
  updated,
  purchasedProducts,
  label,
  disabled,
  setIsLoadingUpdate,
  isLoadingUpdate,
}: factureData) {
  const { user } = AuthStore.useState();

  const handleDownload_postdata = async () => {
    /**
     
      * @param client
      * @param products //the products data
      * @param updated boolean
      * generate the facture in to pdf and post it to the backend
      */
    if (!client.id || !client.phoneNumber || !client.email || !client.address) {
      toast.error("Veuillez renseigner les informations du client");
      return;
    }

    if (purchasedProducts.length === 0) {
      toast.error("Veuillez ajouter des produits à la commande");
      return;
    }

    if (orderData.date === "" || orderData.paymentMethod === undefined) {
      toast.error("Veuillez renseigner les informations de la commande");
      return;
    }

    try {
      setIsLoadingUpdate(true);
      ////must test the updated ulr
      const url = updated
        ? `/api/v1/orders/${orderData?.id}`
        : `/api/v1/orders/create`;
      const method = updated ? "put" : "post";

      const { data } = await axios({
        method,
        url,
        data: {
          clientId: client.id,
          items: purchasedProducts.map((el) => {
            return {
              productVariantId: el.id,
              quantity: el?.quantity,
              totalPrice:
                (el?.quantity ?? 1) *
                (!el?.isOnSale ? el.sellingPrice : el.salePrice),
            };
          }),
          paymentMethod:
            orderData.paymentMethod === "Carte"
              ? "CARD"
              : orderData.paymentMethod === "Mobile Money"
                ? "MOBILE_MONEY"
                : "CASH",
          paymentStatus: "PENDING",
          totalAmount: purchasedProducts.reduce(
            (acc, el) =>
              acc +
              (el?.quantity ?? 1) *
                (!el?.isOnSale ? el.sellingPrice : el.salePrice),
            0,
          ),
          clientPhoneNumber: client.phoneNumber,
          clientEmail: client.email,
          clientAddress: client.address,
          comment: orderData.comment,
          createdAt: orderData.date,
        },
        headers: {
          Authorization: "Bearer " + user.token,
        },
      });

      toast.success(
        !updated
          ? "Commande créee avec succès"
          : "Commande mise à jour avec succès",
      );

      mutate(`/api/v1/orders/${orderData?.id}`);
    } catch (error) {
      setIsLoadingUpdate(false);
      toast.error("Une erreur est survenue");
    } finally {
      setIsLoadingUpdate(false);
    }
  };

  return (
    <Button
      variant={"outline"}
      disabled={disabled}
      size={"lg"}
      onClick={handleDownload_postdata}
      className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 dark:bg-slate-200 dark:text-black lg:px-8 xl:px-10"
    >
      {isLoadingUpdate ? (
        <div className=" h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-slate-50 dark:border-slate-50"></div>
      ) : (
        label
      )}
    </Button>
  );
}
