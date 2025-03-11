import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { parseISO } from "date-fns";
import { fr } from "date-fns/locale";

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

export function formatCurrency(amount: number, currency?: string) {
  return new Intl.NumberFormat(`fr-FR`, {
    style: "currency",
    currency: currency ?? "CDF",
  }).format(amount);
}

/**
 * Given an array of livraison objects, calculates the median time (from DRAFT to DELIVERED)
 * and returns it as a formatted string (e.g., "1j 3h 20min").
 *
 * @param livraisons Array of livraison objects.
 * @returns Formatted median duration string.
 */
export function medianDeliveryTime(livraisons: any[]): string {
  // Filter livraisons with status DELIVERED
  const deliveredLivraisons = livraisons.filter(
    (item) => item.status === "DELIVERED",
  );

  // Array to store the durations (in ms) for each livraison from DRAFT to DELIVERED
  const durations: number[] = [];

  deliveredLivraisons.forEach((livraison) => {
    const trackingHistory = livraison.order?.trackingHistory;
    if (!trackingHistory || trackingHistory.length === 0) return;

    // Sort the tracking events by createdAt (ascending)
    const sortedTracking = trackingHistory.sort(
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    );

    // Find the first DRAFT event and the last DELIVERED event
    const draftEvent = sortedTracking.find(
      (event: any) => event.status === "DRAFT",
    );
    const deliveredEvents = sortedTracking.filter(
      (event: any) => event.status === "DELIVERED",
    );

    if (!draftEvent || deliveredEvents.length === 0) return;

    const deliveredEvent = deliveredEvents[deliveredEvents.length - 1];

    // Parse dates using date-fns
    const start = parseISO(draftEvent.createdAt);
    const end = parseISO(deliveredEvent.createdAt);

    // Compute the difference in milliseconds
    const diffMs = end.getTime() - start.getTime();
    durations.push(diffMs);
  });

  // If no valid durations found, return "0min"
  if (durations.length === 0) {
    return "0min";
  }

  // Sort the durations array to calculate the median
  durations.sort((a, b) => a - b);
  let medianMs: number;
  const mid = Math.floor(durations.length / 2);
  if (durations.length % 2 === 0) {
    medianMs = (durations[mid - 1] + durations[mid]) / 2;
  } else {
    medianMs = durations[mid];
  }

  // Convert milliseconds to total minutes
  const totalMinutes = Math.floor(medianMs / (1000 * 60));
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes - days * 24 * 60) / 60);
  const minutes = totalMinutes - days * 24 * 60 - hours * 60;

  // Build the formatted string based on the time components
  let formatted = "";
  if (days > 0) {
    formatted = `${days}j ${hours}h ${minutes}min`;
  } else if (hours > 0) {
    formatted = `${hours}h ${minutes}min`;
  } else {
    formatted = `${minutes}min`;
  }

  return formatted;
}
