"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
export default function GenerateFacture({
  client,
  products,
  description,
}: any) {
  const handleDownload = async () => {
    try {
      const response = await axios.post(
        "/api/facturePdf",
        { client, products, description },
        { responseType: "blob" },
      );

      // Create a Blob URL for the PDF
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      // Trigger a download
      const link = document.createElement("a");
      link.href = url;
      link.download = `facture.pdf`; // a modifier
      link.click();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Button
      variant={"outline"}
      size={"lg"}
      onClick={handleDownload}
      className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary px-10 py-4 text-center font-medium text-white hover:bg-opacity-90 dark:bg-slate-200 dark:text-black lg:px-8 xl:px-10"
    >
      Génerer la facture
    </Button>
  );
}
