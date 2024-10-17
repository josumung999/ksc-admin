"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Card, CardContent } from "@/components/ui/card";
import ImageDropzone, { ImageData } from "@/components/ImageDropZone";
import { useState } from "react";

const CreateProduct = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Créer un produit" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Description</h1>
          <Card>
            <CardContent>
              <p>Description form here</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Images du produit</h1>
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
