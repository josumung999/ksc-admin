// components/BalanceSheetActions.tsx
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { LedgerEntry } from "@/components/Tables/AccountLedger";
import { BalanceComptableEntry, generateBalanceSheetPdf } from "@/lib/utils";

type BalanceSheetActionsProps = {
  balanceEntries: BalanceComptableEntry[];
  meta: {
    exercise: string;
    reportNumber: number | string;
    printedBy: string;
    printedDate?: Date;
    account?: string;
    currency?: string;
  };
};

export default function BalanceSheetActions({
  balanceEntries,
  meta,
}: BalanceSheetActionsProps) {
  const handleExportPDF = () => {
    generateBalanceSheetPdf(balanceEntries, meta);
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
