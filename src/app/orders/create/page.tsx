"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useState } from "react";
import { clientType } from "@/types/clientType";
import GenerateFacture from "@/components/Forms/facture/generateFacture";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { orderInfoType, paymentMethodEnum } from "@/types/orderInfoType";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePicker } from "@/components/ui/date-picker";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/utils";
import SearchClients from "@/components/common/searchBar/order/client";
import PurchacedProduct from "@/components/Cards/orders/purchacedProduct";
import SelectAndAddProduct from "@/components/common/searchBar/order/products";
import { ProductVariantInventoryElement } from "@/types/productType";
import { AddProductToOrderButton } from "@/components/Forms/orders/AddProductToOrderButton";

const NewOrder = () => {
  const [ClientInformations, setClientInClientInformations] =
    useState<clientType>({
      email: "",
      fullName: "",
      phoneNumber: "",
      address: "",
      id: "",
    });

  const [date, setDate] = useState<Date | undefined>(new Date());

  const [purchasedProducts, setPurchasedProducts] = useState<
    ProductVariantInventoryElement[]
  >([]);

  const [orderData, setOrderData] = useState<orderInfoType>({
    comment: "",
    date: "",
    paymentMethod: paymentMethodEnum.CASH,
  });

  const handleClientInClientInformations = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value, name } = e.target;

    setClientInClientInformations(
      (prev) =>
        ({
          ...prev,
          [name as keyof clientType]: value,
          id: prev?.id || 0, // Default id if not set
        }) as clientType,
    );
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Créer une commande" />

      <div className=" flex w-full justify-end">
        <GenerateFacture
          client={ClientInformations}
          purchasedProducts={purchasedProducts}
          orderData={orderData}
          updated={false}
          label="Enregistrer la commande"
        />
      </div>

      <div className=" flex min-h-screen w-full flex-row justify-between gap-20 md:flex-row md:gap-5">
        {/* about client and order information */}
        <div className="flex w-full flex-col gap-14">
          <Card className="w-full">
            <CardContent className="grid w-full grid-cols-1 items-start  gap-5  md:grid-cols-2">
              {/* Information du client  */}
              <div className="mt-8 flex w-full flex-col items-start gap-5">
                <h5 className="font-bold">Information du client</h5>

                <div className="flex  w-full flex-col gap-6">
                  <div className="flex w-full flex-col gap-1.5 ">
                    <Label className="text-sm font-medium" htmlFor="fullName">
                      CLIENT
                    </Label>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Input
                          className="w-full sm:max-w-96  "
                          defaultValue={ClientInformations.fullName}
                          type="text"
                          name="fullName"
                          placeholder="Rechercher un client..."
                          onChange={(e) => handleClientInClientInformations(e)}
                        />
                      </PopoverTrigger>
                      <PopoverContent>
                        <SearchClients
                          setClientInformations={setClientInClientInformations}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="flex w-full flex-col gap-1.5 ">
                    <Label
                      className="text-sm font-medium"
                      htmlFor="phoneNumber"
                    >
                      TELEPHONE
                    </Label>
                    <Input
                      className="w-full sm:max-w-96  "
                      type="text"
                      name="phoneNumber"
                      defaultValue={ClientInformations.phoneNumber}
                      placeholder="Numero de telephone"
                      onChange={(e) => handleClientInClientInformations(e)}
                    />
                  </div>

                  <div className="flex w-full flex-col gap-1.5 ">
                    <Label className="text-sm font-medium" htmlFor="email">
                      E-MAIL (OPTIONNEL)
                    </Label>
                    <Input
                      className="w-full sm:max-w-96  "
                      type="email"
                      name="email"
                      defaultValue={ClientInformations.email}
                      placeholder="Entrez une adresse email"
                      onChange={(e) => handleClientInClientInformations(e)}
                    />
                  </div>

                  <div className="flex w-full flex-col gap-1.5 ">
                    <Label className="text-sm font-medium" htmlFor="address">
                      ADRESSE
                    </Label>
                    <Input
                      className="w-full sm:max-w-96  "
                      type="text"
                      name="address"
                      defaultValue={ClientInformations.address}
                      placeholder="L’adresse complete de livraison"
                      onChange={(e) => handleClientInClientInformations(e)}
                    />
                  </div>
                </div>
              </div>
              {/* Information de la commande  */}
              <div className="mt-8 flex w-full flex-col items-start gap-5">
                <p className="font-bold">Information de la commande</p>

                <div className="flex w-full flex-col gap-6">
                  <div className="flex w-full flex-col gap-1.5">
                    <Label className="text-sm font-medium" htmlFor="date">
                      DATE
                    </Label>

                    <div className="w-full sm:max-w-96">
                      <DatePicker date={date} setDate={setDate} />
                    </div>
                  </div>

                  <div className="flex w-full flex-col gap-1.5">
                    <Label
                      className="text-sm font-medium"
                      htmlFor="paymentMethod"
                    >
                      MODE DE PAIEMENT
                    </Label>

                    <Select
                      name="paymentMethod"
                      value={orderData.paymentMethod}
                      onValueChange={(value) =>
                        setOrderData((prev) => ({
                          ...prev,
                          paymentMethod: value as paymentMethodEnum,
                          date:
                            formatDate(date?.toISOString() as string) || " ",
                        }))
                      }
                    >
                      <SelectTrigger
                        name="paymentMethod"
                        className="w-full sm:max-w-96"
                      >
                        <SelectValue placeholder="Selectionner un mode de paiement" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Mode de paiement</SelectLabel>
                          <SelectItem value={paymentMethodEnum.CASH}>
                            {paymentMethodEnum.CASH}
                          </SelectItem>
                          <SelectItem value={paymentMethodEnum.CARD}>
                            {paymentMethodEnum.CARD}
                          </SelectItem>
                          <SelectItem value={paymentMethodEnum.MOBILE_MONEY}>
                            {paymentMethodEnum.MOBILE_MONEY}
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex w-full flex-col gap-1.5">
                    <Label className="text-sm font-medium" htmlFor="comment">
                      COMMENTAIRE
                    </Label>
                    <Textarea
                      defaultValue={orderData.comment}
                      className="min-h-30 w-full sm:max-w-96"
                      onChange={(e) =>
                        setOrderData((prev) => ({
                          ...prev,
                          date:
                            formatDate(date?.toISOString() as string) || " ",
                          comment: e.target.validationMessage,
                        }))
                      }
                      placeholder="Ajouter un commentaire..."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* purchased Products */}
          <div className="mb-10 flex w-full flex-col ">
            <div className="flex w-full flex-row items-center justify-between">
              <p className="font-bold">Produits commandés</p>
              <AddProductToOrderButton
                setPurchasedProducts={setPurchasedProducts}
              />
            </div>
            {purchasedProducts.length > 0 && (
              <div className="mt-8 flex w-full flex-col gap-5">
                {purchasedProducts.map(
                  (variant: ProductVariantInventoryElement) => (
                    <PurchacedProduct
                      key={variant.id}
                      variant={variant}
                      setPurchasedProducts={setPurchasedProducts}
                    />
                  ),
                )}
              </div>
            )}
          </div>
          {/* select a product
          <SelectAndAddProduct setPurchasedProducts={setPurchasedProducts} /> */}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NewOrder;
