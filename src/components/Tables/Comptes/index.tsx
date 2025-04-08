import DeleteCompteButton from "@/components/Forms/Comptes/DeleteCompteButton";
import { UpdateCompteButton } from "@/components/Forms/Comptes/UpdateCompteButton";
import React from "react";

type ComptesTableProps = {
  data: any[];
};

const ComptesTable: React.FC<ComptesTableProps> = ({ data }) => {
  return (
    <div className="my-10 w-full overflow-hidden rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left text-sm dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Compte Principal
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Compte Intermédiaire
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Sous-compte
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Libellé
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Sens
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Type
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Classe
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Catégorie
              </th>

              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, key: number) => (
              <tr key={key} className="text-sm">
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {item?.mainAccount}
                    <br />
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.intermediateAccount}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.subAccount}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item?.label}</p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.direction === "DEBIT"
                      ? "Débit"
                      : item?.direction === "CREDIT"
                        ? "Crédit"
                        : item?.direction === "DEUX"
                          ? "2"
                          : "Solde"}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.type ?? "N/A"}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.class?.class}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.class?.name}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <UpdateCompteButton account={item} />
                    <DeleteCompteButton account={item} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComptesTable;
