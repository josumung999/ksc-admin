import React from "react";
import { cn } from "@/lib/utils";
import { UpdateJournalButton } from "@/components/Forms/Journals/UpdateJournalButton";
import DeleteJournalButton from "@/components/Forms/Journals/DeleteJournalButton";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

type JournalsTableProps = {
  data: any[];
};

const JournalsTable: React.FC<JournalsTableProps> = ({ data }) => {
  return (
    <div className="w-full overflow-hidden rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left text-sm dark:bg-meta-4">
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Code
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Nom
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Type
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
                    {item.code}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className=" text-black dark:text-white">{item.name}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className=" text-black dark:text-white">
                    {item.type === "FINANCIER"
                      ? "FINANCIER"
                      : item.type === "ACHAT"
                        ? "ACHAT"
                        : item.type === "VENTE"
                          ? "VENTE"
                          : item.type === "OPERATION_CLIENTELE"
                            ? "OPÉRATIONS AVEC LA CLIENTÈLE"
                            : item.type === "OPERATIONS_DIVERSES"
                              ? "OPÉRATIONS DIVERSES"
                              : ""}
                  </p>
                  <p
                    className={cn(
                      item.status === "SYSTEM" ? "text-meta-1" : "text-meta-3",
                    )}
                  >
                    {item.status === "SYSTEM" ? "Système" : "Interne"}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex flex-row items-center justify-start space-x-2">
                    {item.status !== "SYSTEM" && (
                      <>
                        <UpdateJournalButton journal={item} />
                        <DeleteJournalButton journal={item} />
                      </>
                    )}

                    <Link
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "bg-meta-3",
                      )}
                      href={`/accounting/journals/${item.id}`}
                    >
                      Opérations
                    </Link>
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

export default JournalsTable;
