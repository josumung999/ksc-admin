import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer, Trash, X } from "lucide-react";
import { SignLivraisonButton } from "@/components/Forms/Livraisons/SignLivraisonButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { LivraisonInTransit } from "./LivraisonInTransit";

interface Props {
  livraison: any;
}

const LivraisonActions: React.FC<Props> = ({ livraison }) => {
  const trackingHistory = livraison.order.trackingHistory;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions rapides</CardTitle>
      </CardHeader>
      <CardContent className="flex w-full flex-row items-center justify-end space-x-2">
        <Button size="sm" variant="outline" className="basis-2/5">
          <Printer className="mr-2 h-5 w-5" />
          Imprimer
        </Button>
        {trackingHistory[0]?.status === "IN_TRANSIT" ? (
          <SignLivraisonButton
            livraison={livraison}
            client={livraison?.order?.client}
          />
        ) : trackingHistory[0]?.status === "PACKED" ? (
          <LivraisonInTransit livraison={livraison} />
        ) : null}
        <div className="flex h-full flex-col items-end justify-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="">
                <DotsVerticalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Gérer cette variante</DropdownMenuLabel>
              <DropdownMenuItem>
                <Trash />
                <span>Supprimer la livraison</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
};

export default LivraisonActions;
