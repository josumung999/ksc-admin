import React from "react";
import { usePathname } from "next/navigation";
import { formatDate, formatNumber } from "@/lib/utils";

type ImmobilisationsTableProps = {
  data: any[];
};

const ImmobilisationsTable: React.FC<ImmobilisationsTableProps> = ({
  data,
}) => {
  const path = usePathname();

  return (
    <div className="my-10 w-full overflow-hidden rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left text-sm dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Nom
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Nature
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Catégorie
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Coût HT
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                TVA
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Coût TTC
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Devise
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Date Acquis.
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Mise en service
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Valeur Residuelle
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Durée de vie
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Méthode d&apos;amort.
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                N° série
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Fournisseur
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, key: number) => (
              <tr key={key} className="text-sm">
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.nature}</p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.category}</p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatNumber(item.cost)}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatNumber(item.tva)}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatNumber(item.cost + item.tva)}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.journalOperation.currencyCode}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(item.acquisitionDate)}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(item.usageStartDate)}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatNumber(item.residualValue)}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.lifeExpectancy + " ans"}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.depreciationType}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item.seriesNumber}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item.provider}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ImmobilisationsTable;
