"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useSearchParams } from "next/navigation";

interface Props {
  organization: any;
}

export default function ProductDetailsPage({ organization }: Props) {
  const params = useSearchParams();

  const tab = params.get("tab");

  const tabs = [
    {
      id: 1,
      value: "info",
      title: "Informations",
      content: () => {
        return <p>Informations du produit</p>;
      },
    },
    {
      id: 2,
      value: "history",
      title: "Historique",
      content: () => {
        return <p>Historique</p>;
      },
    },
    {
      id: 3,
      value: "medias",
      title: "Médias",
      content: () => {
        return <p>Médias</p>;
      },
    },
    {
      id: 4,
      value: "variants",
      title: "Variantes",
      content: () => {
        return <p>Profile</p>;
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
      <Breadcrumb pageName="Gérer les produits" />

      <Tabs defaultValue={String(tab)} className="flex w-full flex-col">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="flex w-full space-x-4 p-4">
            {tabs.map((item: any) => (
              <TabsTrigger className="w-full" key={item.id} value={item.value}>
                {item.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        {tabs.map((item: any) => {
          const Content = item.content;
          return (
            <TabsContent key={item.id} value={item.value} className="w-full">
              <Content />
            </TabsContent>
          );
        })}
      </Tabs>
    </DefaultLayout>
  );
}
