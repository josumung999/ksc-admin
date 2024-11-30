import DeleteUserButton from "@/components/Forms/Users/DeleteUserButton";
import { UpdateUserButton } from "@/components/Forms/Users/UpdateUserButton";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { ArchiveRestoreIcon, ArrowBigDown, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { LivraisonStatus, OrderType } from "@/types/getOrderType";
type OrdersTableProps = {
  data: any[];
};

const OrdersTable: React.FC<OrdersTableProps> = ({ data }) => {
  return (
    <div className="my-10 w-full overflow-hidden rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="overflow-x-auto">
        <div className="my-4 flex w-full items-center justify-between">
          <h3 className="font-bold">Listes des commandes</h3>
          <Button className="flex gap-x-1">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Exporter
          </Button>
        </div>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left text-sm dark:bg-meta-4">
              <th className="min-w-[220px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                Client
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Date
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Prix Total
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Livreur
              </th>
              <th className="min-w-[120px] px-4 py-4 text-center font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item: OrderType, key: number) => (
              <tr key={key} className="text-sm">
                <td className="border-b border-[#eee] px-4 py-5 pl-9 dark:border-strokedark xl:pl-11">
                  <div className=" flex flex-col">
                    <p className="font-medium text-black dark:text-white">
                      {item?.client?.fullName}
                    </p>

                    <p className="text-black dark:text-white">
                      {" "}
                      {item?.client?.phoneNumber}
                    </p>
                  </div>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatDate(item?.createdAt)}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatCurrency(item?.totalAmount, "USD")}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className=" flex flex-col">
                    <p className="font-medium text-black dark:text-white">
                      {item?.livraison
                        ? item?.livraison?.vehicle?.name
                        : "Pas de livreur"}
                    </p>

                    <p className="text-black dark:text-white">
                      {" "}
                      {item?.livraison
                        ? item?.livraison?.vehicle?.immatriculation
                        : " "}
                    </p>
                  </div>
                </td>

                <td className="border-b border-[#eee] px-7 py-5 dark:border-strokedark">
                  <p
                    className={`rounded-3xl bg-opacity-15 px-[2px] text-center font-medium  ${item?.livraison?.status === LivraisonStatus.CANCELLED ? "bg-rose-400 text-rose-400" : item?.livraison?.status === LivraisonStatus.IN_TRANSIT ? "bg-yellow-400 text-yellow-400" : item?.livraison?.status === LivraisonStatus.DELIVERED ? "bg-blue-400 text-blue-400" : "bg-green-400 text-green-400"} `}
                  >
                    {item?.livraison?.status === LivraisonStatus.CANCELLED
                      ? "Annullé"
                      : item?.livraison?.status === LivraisonStatus.IN_TRANSIT
                        ? "En transit"
                        : item?.livraison?.status === LivraisonStatus.DELIVERED
                          ? "Livré"
                          : "En cours"}
                  </p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <UpdateUserButton user={item} />
                    <Link
                      href={`/orders/list/${item?.id}`}
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

export default OrdersTable;
