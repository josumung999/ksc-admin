"use client";

import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import DeleteJournalOperation from "@/components/Forms/JournalOperations/DeleteJournalOperation";

/**
 * Utility function for number formatting.
 * Adjust or replace with your own (e.g., formatNumberAsCurrency).
 */
function formatNumber(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

type JournalOperation = {
  id: string;
  date: string;
  label: string;
  amount: number;
  direction: "CREDIT" | "DEBIT" | "SOLDE";
  mainAccount?: {
    mainAccount: string;
    intermediateAccount: string;
    subAccount: string;
    label: string;
  };
  subAccount?: {
    mainAccount: string;
    intermediateAccount: string;
    subAccount: string;
    label: string;
  };
  // ... other fields if needed
};

type JournalOperationsTableProps = {
  data: JournalOperation[];
  onDelete?: (id: string) => void;
  journalStatus: string;
  totalDebit: number;
  totalCredit: number;
};

export default function JournalOperationsTable({
  data,
  onDelete,
  journalStatus,
  totalDebit,
  totalCredit,
}: JournalOperationsTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          {/* Table Head */}
          <thead>
            <tr className="w-full bg-gray-2 text-left text-sm dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Compte
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Sous compte
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Libellé
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Débit en USD
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Crédit en USD
              </th>
              {journalStatus !== "SYSTEM" ? (
                <th className="px-4 py-4 font-medium text-black dark:text-white">
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((item) => {
              const isDebit = item.direction === "DEBIT";
              return (
                <tr
                  key={item.id}
                  className="w-full border-b border-[#eee] text-sm dark:border-strokedark"
                >
                  <td className="px-4 py-4">
                    {format(item.date, "d MMMM yyyy", {
                      locale: fr,
                    })}
                  </td>
                  <td className="px-4 py-4">
                    {/* Show the main account (e.g., "64") */}
                    {item.mainAccount?.mainAccount ?? ""}
                  </td>
                  <td className="px-4 py-4">
                    {/* Show the sub account (e.g., "6402") */}
                    {item.subAccount?.subAccount ?? ""}
                  </td>
                  <td className="px-4 py-4">{item.label}</td>
                  <td className="px-4 py-4">
                    {/* If it's DEBIT, show the amount; otherwise blank */}
                    {isDebit ? formatNumber(item.amount) : ""}
                  </td>
                  <td className="px-4 py-4">
                    {/* If it's CREDIT, show the amount; otherwise blank */}
                    {!isDebit ? formatNumber(item.amount) : ""}
                  </td>
                  {journalStatus !== "SYSTEM" ? (
                    <td className="px-4 py-4">
                      {/* Delete button only */}
                      <DeleteJournalOperation operation={item} />
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </tbody>

          {/* Table Footer */}
          <tfoot>
            <tr className="text-sm font-bold">
              <td className="px-4 py-4 text-left">Total</td>
              <td className="px-4 py-4" colSpan={3}></td>
              <td className="px-4 py-4">{formatNumber(totalDebit)}</td>
              <td className="px-4 py-4">{formatNumber(totalCredit)}</td>
              <td className="px-4 py-4"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
