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
import axios from "axios";
import { AuthStore } from "@/store/authStore";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";

const CreateProduct = () => {
  const productData = ProductStore.useState();
  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  // Upload images using pre-signed URLs
  async function uploadImages(images: ImageData[]): Promise<string[]> {
    try {
      // Step 1: Request pre-signed URLs from the server
      const filenames = images.map((img) => img.file.name);
      const { data } = await axios.post(
        "/api/v1/medias/presigned-urls",
        {
          filenames,
        },
        {
          headers: {
            Authorization: "Bearer " + user?.token,
          },
        },
      );
      const presignedUrls: string[] = data.urls;

      // Step 2: Upload files using the pre-signed URLs
      const uploadPromises = images.map((img, index) =>
        axios.put(presignedUrls[index], img.file, {
          headers: { "Content-Type": img.file.type },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
              );
              setProgress(percentCompleted);
            }
          },
        }),
      );

      await Promise.all(uploadPromises);

      toast({
        title: "Images uploadées avec succès !",
        description: "Enregistrement du produit...",
      });
      // Step 3: Extract the final URLs (removing query params)
      return presignedUrls.map((url) => url.split("?")[0]);
    } catch (error: any) {
      toast({
        title: "Erreur lors de l'upload des images",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
      console.error("Error uploading images:", error);
      throw new Error("Image upload failed");
    }
  }

  // Create product with uploaded image URLs
  async function createProduct() {
    const { images, ...productInfo } = productData;
    try {
      setLoading(true);
      // Upload images and get their URLs
      const imageUrls = await uploadImages(images);

      // Prepare product data with image URLs
      const newProduct = { ...productInfo, images: imageUrls };

      // Send product creation request to the backend
      const response = await axios.post("/api/v1/products/create", newProduct, {
        headers: {
          Authorization: "Bearer " + user?.token,
        },
      });

      toast({
        title: "Produit créé avec succès !",
        description: "Le produit a été créé avec succès !",
      });

      console.log("Product created successfully:", response.data);

      router.push("/manage/products/");

      mutate("/api/v1/products");
    } catch (error: any) {
      toast({
        title: "Erreur lors de la création du produit !",
        description: error?.response?.data?.message,
        variant: "destructive",
      });
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
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
      createProduct();
    }
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
            <CardContent className="gap-4 pt-6">
              <ProductInventoryForm />
              {progress > 0 && <Progress value={progress} className="w-full" />}
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
            disabled={loading}
          >
            {loading ? "Patientez..." : "Enregistrer"}
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateProduct;
