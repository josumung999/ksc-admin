import React from "react";
import { formatCurrency, formatDate } from "@/lib/utils";

type SpendingsTableProps = {
  data: any[];
};

const SpendingsTable: React.FC<SpendingsTableProps> = ({ data }) => {
  return (
    <div className="my-10 w-full overflow-hidden rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left text-sm dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Date
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Rubrique
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Montant
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Libellé
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Bénéficiaire
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Fournisseur
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, key: number) => (
              <tr key={key} className="text-sm">
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {formatDate(item.date)}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.rubric}</p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatCurrency(item.amount, item.currencyCode)}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.label}</p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.beneficiary}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.immobilisations[0]?.provider ?? item.beneficiary}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpendingsTable;
