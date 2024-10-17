"use client";

import React, { DragEvent, ChangeEvent, MouseEvent } from "react";
import Image from "next/image";
import { Trash2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ImageData {
  id: string;
  base64: string;
  file: File;
}

interface ImageDropzoneProps {
  images: ImageData[];
  setImages: React.Dispatch<React.SetStateAction<ImageData[]>>;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ images, setImages }) => {
  const validImageTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  const handleFileChange = async (files: FileList | null) => {
    if (!files) return;

    const newImages: ImageData[] = [];
    for (const file of Array.from(files)) {
      if (!validImageTypes.includes(file.type)) {
        alert("Only image files are allowed!"); // Simple alert for invalid files
        continue;
      }

      const base64 = await toBase64(file);
      newImages.push({ id: crypto.randomUUID(), base64, file });
    }

    setImages((prev) => [...prev, ...newImages]);
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
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleClearAll = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setImages([]);
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

        {images.length > 0 ? (
          <div className="w-full">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="relative h-32 w-full rounded-lg border border-primary/50"
                >
                  <Image
                    src={img.base64}
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
