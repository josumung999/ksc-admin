import UpdateProductForm from "@/components/Forms/Products/UpdateProductForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import React from "react";

interface Props {
  product: any;
}

export default function UpdateProduct({ product }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Mettre à jour le produit {product?.name}</CardTitle>
        <CardDescription>
          Utilisez ce formulaire pour mettre à jour les informations du produit.
        </CardDescription>
        <CardContent>
          <UpdateProductForm product={product} />
        </CardContent>
      </CardHeader>
    </Card>
  );
}
