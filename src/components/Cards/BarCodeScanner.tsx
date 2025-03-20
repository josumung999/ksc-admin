// components/ProductScannerDialog.tsx

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { fetcher } from "@/lib/utils";
import { Button } from "../ui/button";
import { Scan } from "lucide-react";
import { toast } from "react-toastify";
import { ProductVariantInventoryElement } from "@/types/productType";

interface Props {
  setPurchasedProducts: React.Dispatch<
    React.SetStateAction<ProductVariantInventoryElement[]>
  >;
}

const ProductScannerDialog: React.FC<Props> = ({ setPurchasedProducts }) => {
  const [scanEnabled, setScanEnabled] = useState(false);
  const [sku, setSku] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Fetch product variant data when sku is set
  const { data: product, error } = useSWR(
    sku ? `/api/v1/productVariants/${sku}` : null,
    fetcher,
  );

  // Called whenever a barcode/QR is successfully decoded
  const handleScan = (err: any, result: any) => {
    if (err) {
      console.log("Scanning error:", err);
    } else if (result) {
      console.log("Scanned barcode:", result);
      setSku(result);
    }
  };

  // Add product variant to purchased products list when product data is fetched
  useEffect(() => {
    if (sku && product && product.data?.record) {
      const variant: ProductVariantInventoryElement = product.data.record;

      setPurchasedProducts((prev) => {
        const alreadyAdded = prev.some((item) => item.id === variant.id);
        if (alreadyAdded) {
          toast.error("Produit déjà ajouté");
          return prev;
        } else {
          toast.success("Produit ajouté avec succès");
          return [...prev, { ...variant, quantity: variant.quantity ?? 1 }];
        }
      });

      // Reset scanning state: close modal and disable scanner for next use
      setOpen(false);
      setScanEnabled(false);
      setSku(null);
    }
  }, [sku, product, setPurchasedProducts]);

  // Called if there is an error during scanning
  const handleError = (err: string | DOMException) => {
    if (err) {
      console.error("Scanner error:", err);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
          <Scan className="mr-2 h-5 w-5" />
          Scanner
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Product Scanner</DialogTitle>
          <DialogDescription>
            {sku
              ? "Product details are shown below."
              : "Scan the barcode to fetch product details."}
          </DialogDescription>
        </DialogHeader>

        {/* Show scanner if no SKU is scanned yet */}
        {!sku && (
          <div className="mt-4 min-h-[450px]">
            {scanEnabled && (
              <BarcodeScannerComponent
                onUpdate={handleScan}
                onError={handleError}
                stopStream={!scanEnabled}
              />
            )}
          </div>
        )}

        {/* Optionally display product details after a scan */}
        {sku && (
          <div className="mt-4">
            {error && (
              <p className="text-red-500">Error fetching product details.</p>
            )}
            {!error && !product && (
              <p className="text-gray-500">Loading product details...</p>
            )}
            {product && product.data?.record && (
              <div className="rounded border p-4">
                <h2 className="text-xl font-semibold">
                  {product.data.record.name}
                </h2>
                <p>
                  <strong>SKU:</strong> {product.data.record.sku}
                </p>
                <p>
                  <strong>Price:</strong> ${product.data.record.price}
                </p>
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button
            className="w-full"
            onClick={() => setScanEnabled(!scanEnabled)}
            variant="default"
          >
            {scanEnabled ? "Désactiver le scanner" : "Activer le scanner"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductScannerDialog;
