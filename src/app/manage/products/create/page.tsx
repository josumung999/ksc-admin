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

const CreateProduct = () => {
  const [images, setImages] = useState<ImageData[]>([]);

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
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-xl font-bold text-black dark:text-white">
            Images du produit
          </h1>
          <Card>
            <CardContent>
              <ImageDropzone images={images} setImages={setImages} />
            </CardContent>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateProduct;
