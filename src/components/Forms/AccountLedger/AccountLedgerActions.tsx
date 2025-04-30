// components/AccountLedgerActions.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { generateAccountLedgerPdf } from "@/lib/utils";
import { LedgerEntry } from "@/components/Tables/AccountLedger";

type AccountLedgerActionsProps = {
  ledgerData: LedgerEntry[];
  meta: {
    exercise: string;
    reportNumber: number | string;
    printedBy: string;
    printedDate?: Date;
    account?: string;
    currency?: string;
  };
};

export default function AccountLedgerActions({
  ledgerData,
  meta,
}: AccountLedgerActionsProps) {
  const handleExportPDF = () => {
    generateAccountLedgerPdf(ledgerData, meta);
  };

  // Export Excel peut être implémenté ultérieurement (exemple avec SheetJS)
  const handleExportExcel = () => {
    console.log("Export Excel non implémenté");
  };

  return (
    <div className="mb-4 flex justify-end space-x-2">
      <Button variant="outline" size="sm" onClick={handleExportExcel}>
        <Download className="mr-1 h-4 w-4" />
        Exporter en Excel
      </Button>
      <Button variant="outline" size="sm" onClick={handleExportPDF}>
        <Download className="mr-1 h-4 w-4" />
        Exporter en PDF
      </Button>
    </div>
  );
}
