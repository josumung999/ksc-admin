import DeleteVehicleButton from "@/components/Forms/Vehicles/DeleteVehicleButton";
import { UpdateVehicleButton } from "@/components/Forms/Vehicles/UpdateVehicleButton";
import { buttonVariants } from "@/components/ui/button";
import { cn, formatNumber } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

type VehiclesTableProps = {
  data: any[];
};

const VehiclesTable: React.FC<VehiclesTableProps> = ({ data }) => {
  // For deployment
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
                Marque
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Modèle
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Année
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Chauffeur
              </th>
              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Livraisons éffectuées
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
                    {item?.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item?.brand}</p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item?.model}</p>
                </td>

                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">{item?.year}</p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    <p className="font-medium text-black dark:text-white">
                      {`${item?.driver?.firstName} ${item?.driver?.middleName ?? ""} ${item?.driver?.lastName}`}
                    </p>

                    <p className="text-black dark:text-white">
                      {" "}
                      {item?.driver?.phoneNumber}
                    </p>
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {formatNumber(item?.livraisons?.length)}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <Link
                      href={`/shipments/vehicles/${item?.id}`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "icon" }),
                        "border-none hover:text-meta-1",
                      )}
                    >
                      <Eye className="h-5 w-5" />
                    </Link>
                    <UpdateVehicleButton vehicle={item} />
                    <DeleteVehicleButton vehicle={item} />
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

export default VehiclesTable;
