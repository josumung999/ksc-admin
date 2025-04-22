import DeleteUserButton from "@/components/Forms/Users/DeleteUserButton";
import { UpdateUserButton } from "@/components/Forms/Users/UpdateUserButton";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatCurrency, formatDate } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { LivraisonStatus, OrderType } from "@/types/getOrderType";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type OrdersTableProps = {
  data: any[];
};

const OrdersTable: React.FC<OrdersTableProps> = ({ data }) => {
  return (
    <div className="my-10 w-full overflow-hidden rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-3 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      {/* Header */}
      <div className="my-4 flex w-full items-center justify-between">
        <h3 className="font-bold">Listes des commandes</h3>
        <Button className="flex gap-x-1">
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

      {/* Table View (visible on sm and above) */}
      <div className="hidden overflow-x-auto sm:block">
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
                Statut
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
                  <div className="flex flex-col">
                    <p className="font-medium text-black dark:text-white">
                      {item?.client?.fullName}
                    </p>
                    <p className="text-black dark:text-white">
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
                  <div className="flex flex-col">
                    <p className="font-medium text-black dark:text-white">
                      {item?.livraison
                        ? `${item?.livraison?.vehicle?.driver?.firstName} ${item?.livraison?.vehicle?.driver?.lastName}`
                        : "Pas de livreur"}
                    </p>
                    <p className="text-black dark:text-white">
                      {item?.livraison?.vehicle?.driverId
                        ? item?.livraison?.vehicle?.driver?.phoneNumber
                        : ""}
                    </p>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-7 py-5 dark:border-strokedark">
                  <div className="flex items-center justify-center">
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-center font-medium",
                        "ml-2 text-xs font-semibold capitalize",
                        item?.currentTracking?.status === "DRAFT"
                          ? "text-meta-4"
                          : item?.currentTracking?.status === "DELIVERED"
                            ? "text-green-500"
                            : item?.currentTracking?.status === "RETURNED"
                              ? "text-meta-1"
                              : item?.currentTracking?.status === "IN_TRANSIT"
                                ? "text-purple-500"
                                : item?.currentTracking?.status === "PACKED"
                                  ? "text-primary"
                                  : "text-meta-5/70",
                      )}
                    >
                      {item?.currentTracking?.status === "DRAFT"
                        ? "Nouveau"
                        : item?.currentTracking?.status === "CONFIRMED"
                          ? "confirmée"
                          : item?.currentTracking?.status === "PACKED"
                            ? "emballée"
                            : item?.currentTracking?.status === "IN_TRANSIT"
                              ? "en transit"
                              : item?.currentTracking?.status === "DELIVERED"
                                ? "livrée"
                                : item?.currentTracking?.status === "RETURNED"
                                  ? "retournée"
                                  : "N/A"}
                    </Badge>
                  </div>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link
                      href={`/orders/list/${item?.id}`}
                      className={cn(
                        buttonVariants({ variant: "default", size: "icon" }),
                        "bg-primary",
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

      {/* Mobile Card View */}
      <div className="space-y-4 sm:hidden">
        {data.map((item: OrderType, key: number) => (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{item?.client?.fullName}</CardTitle>
              <CardDescription>{item?.client?.phoneNumber}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 mt-2 text-sm dark:text-white">
                Date: {formatDate(item?.createdAt)}
              </p>
              <p className="text-gray-500 text-sm dark:text-white">
                Prix: {formatCurrency(item?.totalAmount, "USD")}
              </p>

              <p className="text-gray-500 text-sm dark:text-white">
                Livreur:{" "}
                {item?.livraison
                  ? `${item?.livraison?.vehicle?.driver?.firstName} ${item?.livraison?.vehicle?.driver?.lastName}`
                  : "Pas de livreur"}
              </p>

              <div className="mt-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs font-semibold capitalize",
                    item?.currentTracking?.status === "DRAFT"
                      ? "text-meta-4"
                      : item?.currentTracking?.status === "DELIVERED"
                        ? "text-green-500"
                        : item?.currentTracking?.status === "RETURNED"
                          ? "text-meta-1"
                          : item?.currentTracking?.status === "IN_TRANSIT"
                            ? "text-purple-500"
                            : item?.currentTracking?.status === "PACKED"
                              ? "text-primary"
                              : "text-meta-5/70",
                  )}
                >
                  {item?.currentTracking?.status === "DRAFT"
                    ? "Nouveau"
                    : item?.currentTracking?.status === "CONFIRMED"
                      ? "confirmée"
                      : item?.currentTracking?.status === "PACKED"
                        ? "emballée"
                        : item?.currentTracking?.status === "IN_TRANSIT"
                          ? "en transit"
                          : item?.currentTracking?.status === "DELIVERED"
                            ? "livrée"
                            : item?.currentTracking?.status === "RETURNED"
                              ? "retournée"
                              : "N/A"}
                </Badge>
              </div>
            </CardContent>

            <CardFooter className="flex justify-end gap-2">
              <Link
                href={`/orders/list/${item?.id}`}
                className={cn(
                  buttonVariants({ variant: "default", size: "icon" }),
                  "bg-primary",
                )}
              >
                <Eye className="h-5 w-5" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;
