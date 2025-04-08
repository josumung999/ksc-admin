import React from "react";
import { formatDate } from "@/lib/utils";
import { UpdateExerciceComptableButton } from "@/components/Forms/ExerciceComptables/UpdateExerciceComptable";
import DeleteExerciceComptable from "@/components/Forms/ExerciceComptables/DeleteExerciceComptable";

type ExercicesComptablesTableProps = {
  data: any[];
};

const ExercicesComptablesTable: React.FC<ExercicesComptablesTableProps> = ({
  data,
}) => {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left text-sm dark:bg-meta-4">
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Exercice
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Date de début
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Date de fin
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: any, key: number) => (
              <tr key={key} className="text-sm">
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className=" text-black dark:text-white">
                    {formatDate(item?.startDate)}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(item?.endDate)}
                  </p>
                </td>

                <td className="flex-row items-center justify-end space-x-2 border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <UpdateExerciceComptableButton exerciceComptable={item} />
                  <DeleteExerciceComptable exerciceComptable={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExercicesComptablesTable;
