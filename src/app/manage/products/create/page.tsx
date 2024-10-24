"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Card, CardContent } from "@/components/ui/card";
import ImageDropzone, { ImageData } from "@/components/ImageDropZone";
import { useState } from "react";
import ProductInfo from "@/components/Forms/Products/Informations";
import ProductCategories from "@/components/Forms/Products/ProductCategories";
import ProductInventoryForm from "@/components/Forms/Products/ProductInventory";
import ProductVariants from "@/components/Forms/Products/ProductVariants";
import ProductShipping from "@/components/Forms/Products/ProductShipping";
import { ProductStore } from "@/store/newProductStore";
import { Button } from "@/components/ui/button";
import ProductPricingForm from "@/components/Forms/Products/ProductPricing";
import { toast } from "@/hooks/use-toast";

const CreateProduct = () => {
  const productData = ProductStore.useState();

  const handleSave = () => {
    if (
      !productData?.name ||
      !productData?.buyingPrice ||
      !productData?.category ||
      productData?.images?.length < 0 ||
      productData?.quantity < 0 ||
      productData?.salePrice < 0 ||
      productData?.sellingPrice < 0 ||
      productData?.shipping?.breadth < 0 ||
      productData?.shipping?.width < 0 ||
      productData?.shipping["length"] < 0 ||
      productData?.shipping?.weight < 0 ||
      !productData?.shortDescription ||
      !productData?.subCategory
    ) {
      toast({
        title: "Veuillez compléter le formulaire",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    } else {
    }
    console.log("Product Data:", productData);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Créer un produit" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold text-black dark:text-white">
            Description
          </h1>
          <Card>
            <CardContent className="pt-6">
              <ProductInfo />
            </CardContent>
          </Card>

          <h1 className="text-xl font-bold text-black dark:text-white">
            Catégorie
          </h1>
          <Card>
            <CardContent className="pt-6">
              <ProductCategories />
            </CardContent>
          </Card>

          <h1 className="text-xl font-bold text-black dark:text-white">
            Inventaire
          </h1>
          <Card>
            <CardContent className="pt-6">
              <ProductInventoryForm />
            </CardContent>
          </Card>

          <h1 className="text-xl font-bold text-black dark:text-white">
            Prix et tarif
          </h1>
          <Card>
            <CardContent className="pt-6">
              <ProductPricingForm />
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold text-black dark:text-white">
            Images du produit
          </h1>
          <Card>
            <CardContent>
              <ImageDropzone />
            </CardContent>
          </Card>

          <h1 className="text-xl font-bold text-black dark:text-white">
            Informations de livraison
          </h1>
          <Card>
            <CardContent className="pt-6">
              <ProductShipping />
            </CardContent>
          </Card>

          <Button
            onClick={handleSave}
            className="mt-4 bg-primary hover:bg-primary/80"
          >
            Enregistrer{" "}
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateProduct;
