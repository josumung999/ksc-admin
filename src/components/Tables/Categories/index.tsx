import DeleteCategoryButton from "@/components/Forms/Categories/DeleteCategoryButton";
import { UpdateCategoryButton } from "@/components/Forms/Categories/UpdateCategoryForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

type CategoriesProps = {
  data: any[];
};

const Categories: React.FC<CategoriesProps> = ({ data }) => {
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
                Description
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Catégorie parente
              </th>

              <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                Sous-Catégories
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
                  <p className="text-black dark:text-white">
                    {item?.description}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.parent?.name ?? "Aucune catégorie"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {item?.subcategories?.length > 0
                      ? item?.subcategories
                          .map((sub: any) => sub.name)
                          .join(", ")
                      : "Aucune catégorie"}
                  </p>
                </td>
                <td className="border-b border-[#eee] px-4 py-5 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                    <UpdateCategoryButton category={item} />
                    <DeleteCategoryButton category={item} />
                    <Link
                      href={`/settings/categories/${item?.id}`}
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

export default Categories;
