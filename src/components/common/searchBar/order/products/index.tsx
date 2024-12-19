"use client";

import { useState } from "react";
import useSWR, { mutate } from "swr";
import { Input } from "@/components/ui/input";
import { fetcher, formatCurrency } from "@/lib/utils";
import useDebounce from "@/lib/hooks/useDebounce";
import { ScrollArea } from "@/components/ui/scroll-area";
import { clientType } from "@/types/clientType";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductOrderElements } from "@/types/productOrderElement";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import SelectAndAddVariant from "./variant";
import { ProductVariantInventoryElement } from "@/types/productType";
import DataPagination from "@/components/common/pagination";
import { useSearchParams } from "next/navigation";
interface SelectAndAddProductProps {
  setPurchasedProducts: React.Dispatch<
    React.SetStateAction<ProductVariantInventoryElement[]>
  >;
}

const SelectAndAddProduct: React.FC<SelectAndAddProductProps> = ({
  setPurchasedProducts,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedSearchValue = useDebounce(searchValue, 500); // 500ms delay
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";

  // Fetch data with SWR and debounced search value
  const productSData = useSWR(
    `/api/v1/products?searchName=${debouncedSearchValue}&page=${page}`,
    fetcher,
  );

  const totalPages = productSData.data?.data?.meta?.totalPages;

  const products: ProductOrderElements[] = productSData.data?.data?.records;
  const [openProductId, setOpenProductId] = useState<string | null>(null);

  const toggleProductDetails = (productId: string) => {
    setOpenProductId((prev) => (prev === productId ? null : productId));
  };

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex min-h-fit w-full flex-col pt-5">
      <div className="flex w-full items-center justify-center">
        <div className="mb-5 flex  w-full flex-col justify-between gap-5 md:flex-row ">
          <h5 className=" font-bold">Ajouter des produits à la commande</h5>

          <div className="w-full max-w-sm">
            <Input
              type="search"
              placeholder="Chercher un produit"
              value={searchValue}
              onChange={handleInputChange}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex min-h-fit flex-col gap-10 duration-200">
        {productSData.isLoading ? (
          <div className="flex h-40 w-full items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-slate-800 dark:border-slate-50"></div>
          </div>
        ) : products?.length > 0 ? (
          <div>
            <ScrollArea className="flex flex-col gap-2 space-y-2">
              {products?.map((product: ProductOrderElements, key) => (
                <ScrollArea
                  className="mb-2 flex max-h-150 min-h-fit w-full items-start justify-start space-y-2 text-left"
                  key={product.id}
                >
                  <Card className="w-full">
                    <CardContent className="flex flex-row items-center justify-start gap-4 p-6">
                      <div className="aspect-square h-28   w-28  overflow-hidden rounded-md">
                        <Image
                          src={
                            product?.coverImage?.mediaUrl ??
                            product?.images[0]?.mediaUrl
                          }
                          alt={product.name}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      <div className="flex h-full flex-col items-start justify-between gap-y-5">
                        <p className="text-lg font-bold">{product?.name}</p>
                        <div className="flex flex-row items-center justify-between gap-2">
                          <p className="text-sm font-[400] text-slate-500">
                            {product?.variants?.length} variante(s),
                          </p>

                          <p className="text-sm font-[400] text-slate-500">
                            à partir de{" "}
                            {formatCurrency(
                              product?.variantSummary?.minSellingPrice,
                              "USD",
                            )}
                          </p>
                        </div>
                      </div>

                      <Button
                        className="absolute right-5 rounded-full p-0 px-2"
                        variant={"ghost"}
                        onClick={() => toggleProductDetails(product.id)}
                      >
                        <ChevronDown
                          className={`h-5 w-5 duration-200 ${openProductId === product.id ? "rotate-180" : "rotate-0"}`}
                        />
                      </Button>
                    </CardContent>

                    {/* about the variant  */}
                    {openProductId === product.id && (
                      <SelectAndAddVariant
                        productId={product.id}
                        isOpen={openProductId === product.id}
                        setPurchasedProducts={setPurchasedProducts}
                      />
                    )}
                  </Card>
                </ScrollArea>
              ))}
            </ScrollArea>

            <DataPagination totalPages={totalPages} />
          </div>
        ) : products === undefined ? (
          <p>Chercher un produit</p>
        ) : (
          <p className="text-slate-500">
            Aucun Resultat pour &lsquo;
            <span className="font-medium">{searchValue}</span>&lsquo;
          </p>
        )}
      </div>
    </div>
  );
};

export default SelectAndAddProduct;
