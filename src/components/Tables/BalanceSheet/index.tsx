"use client";

import React from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

/**
 * Fonction utilitaire pour formater les nombres en format monétaire.
 */
function formatNumber(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Définition de l'interface pour une ligne de balance comptable
export interface BalanceComptableEntry {
  account: string; // ex: "57"
  label: string; // ex: "Caisse"
  ranDebit: number;
  ranCredit: number;
  mvtDebit: number;
  mvtCredit: number;
  soldeDebit: number;
  soldeCredit: number;
}

type BalanceComptableTableProps = {
  data: BalanceComptableEntry[];
  currency: string;
};

export default function BalanceComptableTable({
  data,
  currency,
}: BalanceComptableTableProps) {
  // Calcul des totaux globaux
  const totalRanDebit = data.reduce((sum, entry) => sum + entry.ranDebit, 0);
  const totalRanCredit = data.reduce((sum, entry) => sum + entry.ranCredit, 0);
  const totalMvtDebit = data.reduce((sum, entry) => sum + entry.mvtDebit, 0);
  const totalMvtCredit = data.reduce((sum, entry) => sum + entry.mvtCredit, 0);
  const totalSoldeDebit = data.reduce(
    (sum, entry) => sum + entry.soldeDebit,
    0,
  );
  const totalSoldeCredit = data.reduce(
    (sum, entry) => sum + entry.soldeCredit,
    0,
  );

  return (
    <div className="w-full overflow-hidden rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          {/* En-tête de la table */}
          <thead>
            <tr className="w-full bg-gray-2 text-left text-sm dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Compte
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Libellé
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Report à nouveau Débit ({currency})
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Report à nouveau Crédit ({currency})
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Mouvement Exercice Débit ({currency})
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Mouvement Exercice Crédit ({currency})
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Solde Débit ({currency})
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Solde Crédit ({currency})
              </th>
            </tr>
          </thead>

          {/* Corps de la table */}
          <tbody>
            {data.map((entry, index) => (
              <tr
                key={index}
                className="w-full border-b border-[#eee] text-sm dark:border-strokedark"
              >
                <td className="px-4 py-4">{entry.account}</td>
                <td className="px-4 py-4">{entry.label}</td>
                <td className="px-4 py-4">{formatNumber(entry.ranDebit)}</td>
                <td className="px-4 py-4">{formatNumber(entry.ranCredit)}</td>
                <td className="px-4 py-4">{formatNumber(entry.mvtDebit)}</td>
                <td className="px-4 py-4">{formatNumber(entry.mvtCredit)}</td>
                <td className="px-4 py-4">{formatNumber(entry.soldeDebit)}</td>
                <td className="px-4 py-4">{formatNumber(entry.soldeCredit)}</td>
              </tr>
            ))}
          </tbody>

          {/* Pied de table avec les totaux */}
          <tfoot>
            <tr className="text-sm font-bold">
              <td className="px-4 py-4" colSpan={2}>
                Totaux Généraux
              </td>
              <td className="px-4 py-4">{formatNumber(totalRanDebit)}</td>
              <td className="px-4 py-4">{formatNumber(totalRanCredit)}</td>
              <td className="px-4 py-4">{formatNumber(totalMvtDebit)}</td>
              <td className="px-4 py-4">{formatNumber(totalMvtCredit)}</td>
              <td className="px-4 py-4">{formatNumber(totalSoldeDebit)}</td>
              <td className="px-4 py-4">{formatNumber(totalSoldeCredit)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
