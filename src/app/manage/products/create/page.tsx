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
import ProductShipping from "@/components/Forms/Products/ProductShipping";
import { handleChange, ProductStore } from "@/store/newProductStore";
import { Button } from "@/components/ui/button";
import ProductPricingForm from "@/components/Forms/Products/ProductPricing";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { AuthStore } from "@/store/authStore";
import { mutate } from "swr";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress";
import { getPresignedUrls, handleUpload } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import { PackagePlus, UserPlus } from "lucide-react";

const CreateProduct = () => {
  const productData = ProductStore.useState();
  const { user } = AuthStore.useState();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { images, ...productInfo } = productData;

  // Create product with uploaded image URLs
  async function createProduct() {
    try {
      setLoading(true);

      // Generate presigned URL for each file in the form
      const presignedUrls = await getPresignedUrls(images);
      if (!presignedUrls?.length) {
        toast({
          title: "Erreur lors de la sauvegarde du produit.",
          variant: "destructive",
        });
        return;
      }

      console.log("Presigned URLs =>", presignedUrls);

      // Upload the files to the presigned URLs
      const uploadedFiles = await handleUpload(images, presignedUrls);
      console.log("Uploaded files =>", uploadedFiles);

      if (!uploadedFiles?.length) {
        toast({
          title: "Erreur lors de la sauvegarde du produit.",
          variant: "destructive",
        });
        return;
      }

      const sanitizedProductInfo = {
        ...productInfo,
        shipping: {
          weight: Number(productInfo.shipping.weight),
          length: Number(productInfo.shipping.length),
          breadth: Number(productInfo.shipping.breadth),
          width: Number(productInfo.shipping.width),
        },
        sellingPrice: Number(productInfo.sellingPrice),
        buyingPrice: Number(productInfo.buyingPrice),
        salePrice: Number(productInfo.salePrice),
      };

      // Prepare product data with image URLs
      const newProduct = { ...sanitizedProductInfo, images: uploadedFiles };

      console.log("Product Data =>", newProduct);

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

      const createdProduct = response?.data?.data?.record;

      router.push(`/manage/products/${createdProduct?.id}?tab=info`);

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
              <ImageDropzone imagesArray={images} updateImages={handleChange} />
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
            {loading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <PackagePlus className="mr-2 h-4 w-4" />
            )}
            {loading ? "Patientez..." : "Enregistrer"}
          </Button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CreateProduct;
