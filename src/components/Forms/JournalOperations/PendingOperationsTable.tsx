import React from "react";
import { useStoreState } from "pullstate";
import { JournalOperationStore } from "@/store/journalOperationStore";

function formatNumber(value: number) {
  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

interface Props {
  classes: Array<{ id: string; name: string; class: number }>;
  accounts: Array<{
    id: string;
    mainAccount: string;
    intermediateAccount: string;
    subAccount: string;
    label: string;
    category: { id: string; name: string; class: number };
  }>;
}

export default function PendingOperationsTable({ classes, accounts }: Props) {
  const operations = useStoreState(JournalOperationStore);

  const totalDebit = operations
    .filter((op) => op.direction === "DEBIT")
    .reduce((sum, op) => sum + parseFloat(op.amount), 0);

  const totalCredit = operations
    .filter((op) => op.direction === "CREDIT")
    .reduce((sum, op) => sum + parseFloat(op.amount), 0);

  return operations.length > 0 ? (
    <div className="my-6 border-t pt-4">
      <h3 className="mb-4 text-lg font-semibold">Opérations en attente</h3>
      <div className="overflow-x-auto rounded border">
        <table className="w-full table-auto text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Classe</th>
              <th className="px-4 py-3 text-left">Compte</th>
              <th className="px-4 py-3 text-left">Sous-compte</th>
              <th className="px-4 py-3 text-left">Libellé</th>
              <th className="px-4 py-3 text-left">Débit</th>
              <th className="px-4 py-3 text-left">Crédit</th>
            </tr>
          </thead>
          <tbody>
            {operations.map((op, i) => {
              const isDebit = op.direction === "DEBIT";

              const mainAccount = accounts.find(
                (acc) => acc.id === op.mainAccountId,
              );
              const subAccount = accounts.find(
                (acc) => acc.id === op.subAccountId,
              );
              const classInfo = classes.find((cls) => cls.id === op.classId);

              return (
                <tr key={i} className="border-b last:border-b-0">
                  <td className="px-4 py-3">{op.date}</td>
                  <td className="px-4 py-3">{classInfo?.name ?? "-"}</td>
                  <td className="px-4 py-3">
                    {mainAccount?.mainAccount ?? "-"}
                  </td>
                  <td className="px-4 py-3">{subAccount?.subAccount ?? "-"}</td>
                  <td className="px-4 py-3">{op.label}</td>
                  <td className="px-4 py-3">
                    {isDebit ? formatNumber(parseFloat(op.amount)) : ""}
                  </td>
                  <td className="px-4 py-3">
                    {!isDebit ? formatNumber(parseFloat(op.amount)) : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="font-semibold">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3" colSpan={3}></td>
              <td className="px-4 py-3"></td>
              <td className="px-4 py-3">{formatNumber(totalDebit)}</td>
              <td className="px-4 py-3">{formatNumber(totalCredit)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  ) : null;
}
