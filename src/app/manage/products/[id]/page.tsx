"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ProductInformations from "@/components/Sections/ProductDetails/Informations";
import ProductMedias from "@/components/Sections/ProductDetails/Medias";
import ProductVariants from "@/components/Sections/ProductDetails/Variants";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetcher } from "@/lib/utils";
import { useParams, useSearchParams } from "next/navigation";
import useSWR from "swr";

export default function ProductDetailsPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/products/${params.id}`,
    fetcher,
  );

  const product = data?.data?.record;

  const tab = searchParams.get("tab");

  const tabs = [
    {
      id: 1,
      value: "info",
      title: "Informations",
      content: () => {
        return <ProductInformations product={product} />;
      },
    },
    {
      id: 4,
      value: "variants",
      title: "Variantes",
      content: () => {
        return <ProductVariants />;
      },
    },
    {
      id: 3,
      value: "medias",
      title: "Médias",
      content: () => {
        return (
          <ProductMedias
            medias={product?.images}
            isLoading={isLoading}
            error={error}
          />
        );
      },
    },
    {
      id: 5,
      value: "update",
      title: "Mettre à jour",
      content: () => {
        return <p>Mettre à jour le produit</p>;
      },
    },
  ];

  return (
    <DefaultLayout>
      <Breadcrumb pageName={product?.name ?? "Détails du produit"} />

      {isLoading ? (
        <DataLoader />
      ) : product ? (
        <Tabs defaultValue={String(tab)} className="flex w-full flex-col">
          <div className="w-max">
            <TabsList className="flex h-full w-full space-x-4 bg-black/10">
              {tabs.map((item: any) => (
                <TabsTrigger
                  className="w-full rounded-lg p-4 transition-all data-[state=active]:bg-primary data-[state=active]:text-whiten"
                  key={item.id}
                  value={item.value}
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {tabs.map((item: any) => {
            const Content = item.content;
            return (
              <TabsContent key={item.id} value={item.value} className="w-full">
                <Content />
              </TabsContent>
            );
          })}
        </Tabs>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon />
          <EmptyPlaceholder.Title>Produit introuvable</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            Le produit que vous cherchez est introuvable
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
    </DefaultLayout>
  );
}
