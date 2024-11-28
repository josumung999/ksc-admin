import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatCurrency, formatNumber } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

type LivraisonsTableProps = {
  data: any[];
};

const LivraisonsTable: React.FC<LivraisonsTableProps> = ({ data }) => {
  // For deployment
  return (
    <div className="my-10 w-full overflow-hidden rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left text-sm dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Client
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Articles
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Montant total
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Livreur
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Moyen de paiement
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Statut
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
                    {`${item?.order?.client?.fullName}`}
                  </h5>
                  <p className="text-black dark:text-white">
                    {" "}
                    {`${item?.order?.clientPhoneNumber} | ${item?.order?.clientEmail ?? ""} ${item?.order?.clientAddress}`}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatNumber(item?.order?.items?.length)}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatCurrency(item?.order?.totalAmount, "USD")}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    <p className="font-medium text-black dark:text-white">
                      {`${item?.vehicle?.driver?.firstName} ${item?.vehicle?.driver?.middleName ?? ""} ${item?.vehicle?.driver?.lastName}`}
                    </p>

                    <p className="text-black dark:text-white">
                      Vehicule:{" "}
                      {`${item?.vehicle?.brand} | ${item?.vehicle?.model} | ${item?.vehicle?.year} | ${item?.vehicle?.immatriculation}`}
                    </p>
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <Badge>{item?.order?.paymentMethod}</Badge>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <Badge>{item?.status}</Badge>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link
                      href={`/shipments/${item?.id}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "icon" }),
                        "border-none hover:text-meta-1",
                      )}
                    >
                      <Eye className="h-5 w-5" />
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

export default LivraisonsTable;
