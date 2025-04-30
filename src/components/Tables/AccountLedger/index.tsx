"use client";

import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Fonction utilitaire pour formater les nombres.
 */
function formatNumber(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Définition de l'interface pour une ligne du grand livre
export interface LedgerEntry {
  date: Date;
  compte: any;
  sousCompte: any;
  libelle: string;
  debit: number;
  credit: number;
  soldeInitial: number;
  soldeFinal: number;
  mention: string; // "SC" (solde crédit) ou "SD" (solde débit)
}

type AccountLedgerTableProps = {
  data: LedgerEntry[];
  currencyCode: string;
};

export default function AccountLedgerTable({
  data,
  currencyCode,
}: AccountLedgerTableProps) {
  // 1) Grouper par date (format "yyyy-MM-dd")
  const groupedByDate: Record<string, LedgerEntry[]> = data.reduce(
    (acc, entry) => {
      const dateKey = format(entry.date, "yyyy-MM-dd");
      // @ts-ignore
      if (!acc[dateKey]) {
        // @ts-ignore
        acc[dateKey] = [];
      }
      // @ts-ignore
      acc[dateKey].push(entry);
      return acc;
    },
    {},
  );

  // 2) Ordonner les dates
  const sortedDateKeys = Object.keys(groupedByDate).sort();

  // 3) Construire le tableau final (avec chaque opération + ligne "Total")
  //    et calculer également un total global (facultatif)
  let grandTotalDebit = 0;
  let grandTotalCredit = 0;

  // Ce tableau final contiendra des "lignes" au sens large (opération ou total)
  type LedgerDisplayRow = LedgerEntry & { isTotal?: boolean };
  const displayRows: LedgerDisplayRow[] = [];

  for (const dateKey of sortedDateKeys) {
    const entries = groupedByDate[dateKey];
    // Calculer la somme des débits/crédits de la journée
    let dayDebit = 0;
    let dayCredit = 0;
    let dayLastSoldeFinal = 0;
    let dayMention = "SC";

    // Parcourir chaque opération
    for (const op of entries) {
      dayDebit += op.debit;
      dayCredit += op.credit;
      dayLastSoldeFinal = op.soldeFinal; // le dernier op de la journée
      dayMention = op.mention; // la mention du dernier op de la journée

      // On ajoute la ligne "opération"
      displayRows.push({ ...op, isTotal: false });
    }

    // Ligne "Total" du jour
    grandTotalDebit += dayDebit;
    grandTotalCredit += dayCredit;

    const daySoldeInitial = entries[0].soldeInitial; // soldeInitial du premier op de la journée
    displayRows.push({
      date: entries[0].date,
      compte: null,
      sousCompte: null,
      libelle: "Total",
      debit: dayDebit,
      credit: dayCredit,
      soldeInitial: daySoldeInitial,
      soldeFinal: dayLastSoldeFinal,
      mention: dayMention,
      isTotal: true,
    });
  }

  return (
    <div className="w-full overflow-hidden rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          {/* En-tête de la table */}
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
                Débit en {currencyCode}
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Crédit en {currencyCode}
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Solde Initial
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Solde Final
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Mention
              </th>
            </tr>
          </thead>

          {/* Corps de la table */}
          <tbody>
            {displayRows.map((row, index) => {
              // Si c'est une ligne "Total", on peut la styliser différemment
              const isTotal = row.isTotal;
              return (
                <tr
                  key={index}
                  className={`w-full border-b border-[#eee] text-sm dark:border-strokedark ${
                    isTotal ? "font-bold" : ""
                  }`}
                >
                  <td className="px-4 py-4">
                    {format(row.date, "d MMM yyyy", { locale: fr })}
                  </td>
                  <td className="px-4 py-4">
                    {!isTotal ? (row.compte?.label ?? row.compte ?? "") : ""}
                  </td>
                  <td className="px-4 py-4">
                    {!isTotal
                      ? (row.sousCompte?.label ?? row.sousCompte ?? "")
                      : ""}
                  </td>
                  <td className="px-4 py-4">{row.libelle}</td>
                  {/* Débit */}
                  <td className="px-4 py-4 text-black">
                    {row.debit ? formatNumber(row.debit) : ""}
                  </td>
                  {/* Crédit (en rouge) */}
                  <td className="px-4 py-4" style={{ color: "red" }}>
                    {row.credit ? formatNumber(row.credit) : ""}
                  </td>
                  {/* Solde Initial / Final */}
                  <td className="px-4 py-4">
                    {formatNumber(row.soldeInitial)}
                  </td>
                  <td className="px-4 py-4">{formatNumber(row.soldeFinal)}</td>
                  <td className="px-4 py-4">{row.mention}</td>
                </tr>
              );
            })}
          </tbody>

          {/* Pied de table avec les totaux globaux */}
          <tfoot>
            <tr className="text-sm font-bold">
              <td className="px-4 py-4 text-left" colSpan={4}>
                Totaux Généraux
              </td>
              <td className="px-4 py-4">{formatNumber(grandTotalDebit)}</td>
              <td className="px-4 py-4" style={{ color: "red" }}>
                {formatNumber(grandTotalCredit)}
              </td>
              <td className="px-4 py-4" colSpan={3}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
