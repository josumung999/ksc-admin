"use client";

import React, { DragEvent, ChangeEvent, MouseEvent } from "react";
import Image from "next/image";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleChange, ProductStore } from "@/store/newProductStore";
import { toast } from "@/hooks/use-toast";
import { FileData } from "@/lib/utils";

export interface ImageData {
  id: string;
  base64: string;
  file: File;
}

interface ImageDropzoneProps {
  imagesArray: FileData[];
  updateImages: any;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  imagesArray,
  updateImages,
}) => {
  const validImageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  const handleFileChange = async (files: FileList | null) => {
    if (!files) return;

    const newImages: FileData[] = [];
    for (const file of Array.from(files)) {
      if (!validImageTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Type de fichier non pris en charge",
          description: "Selectionner des images de type JPEG, JPG, PNG, WEBP",
        }); // Simple alert for invalid files
        continue;
      }

      const base64 = await toBase64(file);
      newImages.push({ id: crypto.randomUUID(), file, base64 });
    }

    updateImages("images", [...imagesArray, ...newImages]);
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileChange(e.dataTransfer.files);
  };

  const handleImageRemove = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    // setImages((prev) => prev.filter((img) => img.id !== id));

    handleChange(
      "images",
      imagesArray.filter((img) => img.id !== id),
    );
  };

  const handleClearAll = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleChange("images", []);
  };

  const openFileDialog = (e: MouseEvent) => {
    e.stopPropagation();
    document.getElementById("fileInput")?.click();
  };

  return (
    <div className="mt-6 space-y-4">
      <div
        className="flex min-h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-black p-4 hover:border-primary"
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={openFileDialog}
      >
        <input
          id="fileInput"
          type="file"
          multiple
          accept="image/*" // Restricts to images only
          className="hidden"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleFileChange(e.target.files)
          }
        />

        {imagesArray.length > 0 ? (
          <div className="w-full">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {imagesArray.map((img) => (
                <div
                  key={img.id}
                  className="relative h-32 w-full rounded-lg border border-primary/50"
                >
                  <Image
                    src={String(img.base64)}
                    alt="Uploaded Image"
                    fill
                    className="rounded-lg object-cover"
                  />
                  <button
                    onClick={(e) => handleImageRemove(e, img.id)}
                    className="absolute -right-2 -top-2 rounded-full bg-meta-1 p-1 text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}

              <div
                className="flex h-32 w-full cursor-pointer items-center justify-center rounded-lg border border-dashed border-primary hover:border-primary/70"
                onClick={openFileDialog}
              >
                <Plus className="h-10 w-10 text-primary" />
              </div>
            </div>

            <Button onClick={handleClearAll} className="mt-4">
              Tout supprimer
            </Button>
          </div>
        ) : (
          <p className="text-center text-black dark:text-white">
            Glissez-déposez des images ou cliquez pour les télécharger
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageDropzone;
