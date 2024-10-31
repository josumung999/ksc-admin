import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (url: string) => {
  const token = Cookies.get("token");
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("fr-FR", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("fr-FR").format(number);
};

export const drcProvinces = [
  "Kinshasa",
  "Bas-Uélé",
  "Équateur",
  "Haut-Katanga",
  "Haut-Lomami",
  "Haut-Uélé",
  "Ituri",
  "Kasaï",
  "Kasaï-Central",
  "Kasaï-Oriental",
  "Kwango",
  "Kwilu",
  "Lomami",
  "Lualaba",
  "Mai-Ndombe",
  "Maniema",
  "Mongala",
  "Nord-Kivu",
  "Nord-Ubangi",
  "Sankuru",
  "Sud-Kivu",
  "Sud-Ubangi",
  "Tanganyika",
  "Tshopo",
  "Tshuapa",
];

export interface PresignedUrlProp {
  uploadUrl: string;
  key: any;
  publicUrl: string;
}

export interface FileData {
  id: string;
  file: File;
  base64?: string;
}

export const getPresignedUrls = async (files: FileData[]) => {
  const filesToUpload = files.map((item) => ({
    name: item.file.name,
    type: item.file.type,
    key: item.id,
  }));
  const { data } = await axios.post("/api/v1/medias/presigned-urls", {
    files: filesToUpload,
  });

  return data?.urls as PresignedUrlProp[];
};

export const uploadToS3 = async (
  presignedUrl: PresignedUrlProp,
  file: File,
) => {
  const response = await fetch(presignedUrl.uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
      "Access-Control-Allow-Origin": "*",
    },
  });
  return response;
};

export const handleUpload = async (
  files: FileData[],
  presignedUrls: PresignedUrlProp[],
) => {
  let uploadedFiles: string[] = [];
  const uploadToS3Response = await Promise.all(
    presignedUrls.map((presignedUrl) => {
      const file = files.find(
        (file) => file.id === presignedUrl.key.split(".")[0],
      );
      if (!file) {
        throw new Error("File not found");
      }
      const response = uploadToS3(presignedUrl, file.file);
      uploadedFiles.push(presignedUrl.publicUrl);
      return response;
    }),
  );

  if (uploadToS3Response.some((res) => res.status !== 200)) {
    toast({
      title: "Une erreur est survenue lors de l'envoi des fichiers",
      description: "Veuillez réessayer ultérieurement",
      variant: "destructive",
    });
    return;
  }

  return uploadedFiles;
};
