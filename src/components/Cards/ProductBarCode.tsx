// components/ProductBarcode.tsx

import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import { jsPDF } from "jspdf";
import { Button } from "../ui/button";
import { Printer } from "lucide-react";

interface ProductBarcodeProps {
  variant: {
    sku: string;
    coverImage?: { mediaUrl: string };
    product: { name: string };
  };
}

const ProductBarcode: React.FC<ProductBarcodeProps> = ({ variant }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  // Helper function that loads an image and returns a promise.
  const loadImage = async (url: string): Promise<HTMLImageElement> => {
    try {
      // Fetch image as Blob
      const response = await fetch(url);
      if (!response.ok)
        throw new Error(`Failed to fetch image: ${response.statusText}`);

      const blob = await response.blob();

      // Convert Blob to Base64
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => {
          const img = new Image();
          img.src = reader.result as string; // Use Base64 data URL
          img.onload = () => resolve(img);
          img.onerror = (err) => reject(err);
        };
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error loading product image:", error);
      throw error;
    }
  };
  useEffect(() => {
    if (svgRef.current) {
      JsBarcode(svgRef.current, variant?.sku, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 100,
        displayValue: true,
      });
    }
  }, [variant?.sku]);

  const handlePrint = async () => {
    // Create a new jsPDF instance for A6 size.
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a6",
    });

    // Define margins.
    const margin = 10;
    let yPosition = margin;
    const pageWidth = doc.internal.pageSize.getWidth();

    // 1. HEADER: Load and add the company logo and current date.
    try {
      const logo = await loadImage("/images/logo/logo-yellow.webp");
      const logoWidth = 31;
      const logoHeight = 7.5;
      doc.addImage(logo, "PNG", margin, yPosition, logoWidth, logoHeight);
    } catch (error) {
      console.error("Error loading logo image:", error);
    }

    // Add current date on the right side of the header.
    const dateStr = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.text(dateStr, pageWidth - margin, yPosition + 7.5, {
      align: "right",
      baseline: "middle",
    });
    yPosition += 15 + 5; // logo height + spacing

    // 2. CONTENT: Add product variant image if available.
    if (variant.coverImage?.mediaUrl) {
      try {
        console.log("Cover Image: ", variant.coverImage.mediaUrl);
        const prodImg = await loadImage(variant.coverImage.mediaUrl);
        // Calculate dimensions while preserving aspect ratio.
        const maxWidth = pageWidth - margin * 2;
        const imgHeight = 40; // adjust as needed
        doc.addImage(prodImg, "JPEG", margin, yPosition, maxWidth, imgHeight);
        yPosition += imgHeight + 5;
      } catch (error) {
        console.error("Error loading product image:", error);
      }
    }

    // 3. Add product name.
    doc.setFontSize(12);
    doc.text(variant.product.name, margin, yPosition);
    yPosition += 10;

    // 4. Generate the barcode image using JsBarcode on a temporary canvas.
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, variant.sku, {
      format: "CODE128",
      displayValue: true,
      width: 2,
      height: 40,
    });
    const barcodeDataUrl = canvas.toDataURL("image/png");

    // Calculate dimensions so the barcode is centered within margins.
    const barcodeWidth = pageWidth - margin * 2;
    const barcodeHeight = 30;
    doc.addImage(
      barcodeDataUrl,
      "PNG",
      margin,
      yPosition,
      barcodeWidth,
      barcodeHeight,
    );
    yPosition += barcodeHeight + 5;

    // Finally, save the PDF.
    doc.save(`${variant.sku}.pdf`);
  };

  return (
    <div className="w-fit">
      <div>
        {/* Optionally render the barcode preview */}
        <svg ref={svgRef} />
      </div>
      <Button size="lg" color="primary" className="w-fit" onClick={handlePrint}>
        <Printer className="mr-2 h-5 w-5" />
        Imprimer le code-barres
      </Button>
    </div>
  );
};

export default ProductBarcode;
