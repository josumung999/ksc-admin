import DeleteRubricButton from "@/components/Forms/Rubrics/DeleteRubricButton";
import { UpdateRubricButton } from "@/components/Forms/Rubrics/UpdateRubricButton";
import React from "react";

type RubricsTableProps = {
  data: any[];
};

const RubricsTable: React.FC<RubricsTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left text-sm dark:bg-meta-4">
              <th className="max-w-[40px] px-4 py-4 font-medium text-black dark:text-white">
                #
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Rubrique
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
                  <h5 className=" text-black dark:text-white">{key + 1}</h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <h5 className="font-medium text-black dark:text-white">
                    {item.label}
                  </h5>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex flex-row items-center space-x-2">
                    <DeleteRubricButton rubric={item} />
                    <UpdateRubricButton rubric={item} />
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

export default RubricsTable;
