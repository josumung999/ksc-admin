import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { parseISO } from "date-fns";
import { fr } from "date-fns/locale";
import { LedgerEntry } from "@/components/Tables/AccountLedger";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { format } from "date-fns";

function formattedNumber(number: number) {
  return number
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ")
    .replace(".", ",");
}

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

/**
 * Génère le PDF du grand livre comptable.
 * @param ledgerData Tableau des entrées du grand livre regroupées par date
 * @param meta Métadonnées (exercice, numéro de rapport, imprimé par, date d'impression, compte, devise)
 */
export const generateAccountLedgerPdf = (
  ledgerData: LedgerEntry[],
  meta: {
    exercise: string;
    reportNumber: number | string;
    printedBy: string;
    printedDate?: Date;
    account?: string;
    currency?: string;
  },
) => {
  const doc = new jsPDF();

  // Charger le logo de la coopérative
  const logo = new Image();
  logo.src = "/images/logo/logo-icon.png";

  logo.onload = () => {
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    const rightAlign = pageWidth - margin;

    // *** En-tête ***
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("HAZINA AFRICA COOPERATIVE", pageWidth / 2, 15, {
      align: "center",
    });

    // Ajout du logo au centre
    doc.addImage(logo, "PNG", pageWidth / 2 - 7.5, 20, 15, 15);

    // Titre du document
    doc.setFontSize(10);
    doc.text("Grand Livre Comptable", pageWidth / 2, 40, { align: "center" });

    // *** Informations à gauche ***
    doc.setFontSize(10);
    doc.text(`Exercice : ${meta.exercise}`, margin, 50);
    doc.text(`Rapport n° : ${meta.reportNumber}`, margin, 55);
    doc.text(`Compte : ${meta.account}`, margin, 60);

    // *** Informations à droite ***
    doc.text(`Devise : ${meta.currency}`, rightAlign, 50, { align: "right" });
    doc.text(`Par : ${meta.printedBy}`, rightAlign, 55, { align: "right" });
    const printedDate = meta.printedDate || new Date();
    doc.text(
      `Imprimé : ${format(printedDate, "d MMMM yyyy - HH:mm", { locale: fr })}`,
      rightAlign,
      60,
      { align: "right" },
    );

    // *** Regroupement par date ***
    const groups = new Map<string, LedgerEntry[]>();
    ledgerData.forEach((entry) => {
      const dateKey = format(new Date(entry.date), "yyyy-MM-dd");
      if (!groups.has(dateKey)) {
        groups.set(dateKey, [entry]);
      } else {
        groups.get(dateKey)!.push(entry);
      }
    });
    const sortedDateKeys = Array.from(groups.keys()).sort();

    // *** Construction du tableau ***
    const tableBody: any[] = [];
    let grandTotalDebit = 0;
    let grandTotalCredit = 0;
    let totalSoldeInitial = 0;
    let totalSoldeFinal = 0;

    // Pour chaque groupe (date)
    for (const key of sortedDateKeys) {
      const groupEntries = groups.get(key)!;
      // Ajouter les opérations individuelles de la journée
      groupEntries.forEach((entry) => {
        tableBody.push([
          formatDate(String(entry.date)),
          formattedNumber(entry.debit),
          formattedNumber(entry.credit),
          formattedNumber(entry.soldeInitial),
          formattedNumber(entry.soldeFinal),
          entry.mention,
        ]);
      });

      // Calculer les totaux du jour
      const dayDebit = groupEntries.reduce(
        (sum, entry) => sum + entry.debit,
        0,
      );
      const dayCredit = groupEntries.reduce(
        (sum, entry) => sum + entry.credit,
        0,
      );
      const daySoldeInitial = groupEntries[0].soldeInitial;
      const daySoldeFinal = groupEntries[groupEntries.length - 1].soldeFinal;
      const dayMention = groupEntries[groupEntries.length - 1].mention;

      // Accumuler dans les totaux globaux
      grandTotalDebit += dayDebit;
      grandTotalCredit += dayCredit;
      totalSoldeInitial += daySoldeInitial;
      totalSoldeFinal = daySoldeFinal; // On considère le solde final du dernier groupe

      // Ajouter la ligne "Total" de la journée
      tableBody.push([
        {
          content: `Total ${key}`,
          colSpan: 1,
          styles: { fontStyle: "bold", halign: "left", fontSize: 10 },
        },
        {
          content: formattedNumber(dayDebit),
          styles: { fontStyle: "bold", halign: "right", fontSize: 10 },
        },
        {
          content: `{red}${formattedNumber(dayCredit)}`,
          styles: { fontStyle: "bold", halign: "right", fontSize: 10 },
        },
        {
          content: formattedNumber(daySoldeInitial),
          styles: { fontStyle: "bold", halign: "right", fontSize: 10 },
        },
        {
          content: formattedNumber(daySoldeFinal),
          styles: { fontStyle: "bold", halign: "right", fontSize: 10 },
        },
        {
          content: dayMention,
          styles: { fontStyle: "bold", halign: "left", fontSize: 10 },
        },
      ]);
    }

    // *** Totaux généraux ***
    tableBody.push([
      {
        content: "Totaux Généraux",
        colSpan: 3,
        styles: { fontStyle: "bold", halign: "left", fontSize: 10 },
      },
      {
        content: formattedNumber(totalSoldeInitial),
        styles: { fontStyle: "bold", halign: "right", fontSize: 10 },
      },
      {
        content: formattedNumber(totalSoldeFinal),
        styles: { fontStyle: "bold", halign: "right", fontSize: 10 },
      },
      {
        content:
          ledgerData?.filter((item: LedgerEntry) => item.mention === "SC")
            ?.length >
          ledgerData?.filter((item: LedgerEntry) => item.mention === "SD")
            ?.length
            ? "SC"
            : "SD",
        styles: { fontStyle: "bold", halign: "left", fontSize: 10 },
      },
    ]);
    tableBody.push([
      {
        content: "Total Débit",
        colSpan: 3,
        styles: { fontStyle: "bold", halign: "left", fontSize: 10 },
      },
      {
        content: formattedNumber(grandTotalDebit),
        styles: { fontStyle: "bold", halign: "right", fontSize: 10 },
      },
      "",
      "",
    ]);
    tableBody.push([
      {
        content: "Total Crédit",
        colSpan: 3,
        styles: { fontStyle: "bold", halign: "left", fontSize: 10 },
      },
      {
        content: formattedNumber(grandTotalCredit),
        styles: { fontStyle: "bold", halign: "right", fontSize: 10 },
      },
      "",
      "",
    ]);

    // *** Générer le tableau avec autoTable ***
    //@ts-ignore
    doc.autoTable({
      startY: 70,
      head: [
        [
          "Date",
          "Débit en " + meta.currency,
          "Crédit en " + meta.currency,
          "Solde Initial",
          "Solde Final",
          "Mention",
        ],
      ],
      body: tableBody,
      theme: "grid",
      styles: { fontSize: 8, cellPadding: 2 },
      headStyles: {
        fillColor: "#fff",
        textColor: "#000",
        lineColor: "#000", // sets border color to black
        lineWidth: 0.1, // adjust line width as needed
      },
      didParseCell: (data: any) => {
        if (data.cell && typeof data.cell.raw === "object") {
          if (data.cell.raw.content.startsWith("{red}")) {
            data.cell.text = [data.cell.raw.content.replace("{red}", "")]; // Remove the  tag
            data.cell.styles.textColor = [255, 0, 0]; // Apply red color
          }
        }
      },
    });

    // *** Pied de page ***
    doc.setFontSize(8);
    doc.text(
      "HAZINA AFRICA COOPERATIVE",
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" },
    );

    // Ouvrir le PDF dans un nouvel onglet
    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl);
  };
};
