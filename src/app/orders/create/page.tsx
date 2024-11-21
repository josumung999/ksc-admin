"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { clientType } from "@/types/clientType";
import ClientInformations from "@/components/Forms/orders/clientDetail/clientInformation";
import { ScrollArea } from "@/components/ui/scroll-area";
import OrderClientDetail from "@/components/Sections/orders/clientDisplayDetail";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productOrderType } from "@/types/productOrderType";
import ProductOrderDetail from "@/components/Sections/orders/productOrderDetail";
import OrderProductInformations from "@/components/Forms/orders/productDetails/orderProductInformation";
import { cn, formatCurrency } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import GenerateFacture from "@/components/Forms/facture/generateFacture";
const NewOrder = () => {
  const [clientData, setClientData] = useState<clientType | undefined>(
    undefined,
  );

  // const products = [
  //   {
  //     id: "1",
  //     name: "Produit A",
  //     unitePrice: 10.99,
  //     quantity: 2,
  //     attribut: [
  //       { name: "Couleur", value: "Rouge" },
  //       { name: "Taille", value: "L" },
  //       { name: "Matériau", value: "Cuir" },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     name: "Produit B",
  //     unitePrice: 5.99,
  //     quantity: 1,
  //     attribut: [
  //       { name: "Couleur", value: "Bleu" },
  //       { name: "Taille", value: "M" },
  //     ],
  //   },
  //   {
  //     id: "3",
  //     name: "Produit C",
  //     unitePrice: 7.99,
  //     quantity: 3,
  //     attribut: [
  //       { name: "Couleur", value: "Vert" },
  //       { name: "Matériau", value: "Acier" },
  //     ],
  //   },
  // ];
  const [orderData, setOrderData] = useState<productOrderType[] | undefined>(
    undefined,
  );
  const [description, setDescription] = useState<string>("");

  const total = orderData
    ? orderData.reduce((acc, order) => {
        // Default quantity to 1 if it's undefined
        const quantity = order.quantity ?? 1;
        return acc + order.unitePrice * quantity;
      }, 0)
    : 0;

  console.log(orderData !== undefined && clientData !== undefined);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Créer une commande" />

      <GenerateFacture
        client={clientData}
        products={orderData}
        description={description}
      />

      <div className=" flex min-h-screen w-full flex-col justify-between gap-20 md:flex-row md:gap-5">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-5">
            <p className="font-bold">Information du client</p>
            {clientData && (
              <Button
                disabled={
                  !(orderData !== undefined && clientData !== undefined)
                }
                // disabled = {true}
                onClick={() => setClientData(undefined)}
                className=" p-1"
                variant={"outline"}
              >
                {" "}
                <Edit className="h-5 w-5" />
              </Button>
            )}
          </div>
          <ScrollArea>
            {!clientData && <ClientInformations setData={setClientData} />}
            {clientData && <OrderClientDetail client={clientData} />}
          </ScrollArea>
        </div>

        <div className="flex w-fit flex-col gap-6">
          <div className="flex items-center gap-5">
            <p className="font-bold">Information de la commande</p>
          </div>
          <ScrollArea>
            <OrderProductInformations setData={setOrderData} />
            {orderData && (
              <>
                <div className="">
                  {orderData.map((el, i) => (
                    <div className="flex flex-col gap-y-5 space-y-10">
                      <ProductOrderDetail
                        setOrderData={setOrderData}
                        key={i}
                        product={el}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-14">
                  <p className="text-sm font-medium ">
                    *Ajouter une petite description
                  </p>
                  <Textarea
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Une petite description"
                  />
                </div>
                <div className="mt-10 flex w-full justify-start">
                  <p className="text-black dark:text-white">
                    {" "}
                    Prix Final:{" "}
                    <span className="font-bold">
                      {formatCurrency(total, "USD")}
                    </span>
                  </p>
                </div>
              </>
            )}
          </ScrollArea>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NewOrder;
