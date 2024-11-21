import { productOrderType } from "@/types/productOrderType";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
interface ProductOrderDetailProps {
  product: productOrderType;
  setOrderData: React.Dispatch<
    React.SetStateAction<productOrderType[] | undefined>
  >;
}

const ProductOrderDetail: React.FC<ProductOrderDetailProps> = ({
  product,
  setOrderData,
}) => {
  const onSetQuantity = (id: string, quantity: number) => {
    if (quantity && !Number.isNaN(quantity)) {
      setOrderData((el) => {
        if (el) {
          const myIndex = el.findIndex((el) => el.id === id);
          if (myIndex != -1) {
            const table1 = [...el];
            table1[myIndex] = { ...table1[myIndex], quantity: quantity };
            el = table1;
            return el;
          }
        }

        return el;
      });
    }
  };
  const onDelete = (id: string) => {
    setOrderData((el) => (el ? el.filter((value) => value.id !== id) : el));
  };
  return (
    <div className="mt-14 flex flex-col gap-4">
      <div className="aspect-square h-40   w-full  overflow-hidden rounded-md">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={100}
          className="h-full w-full object-cover"
        />
      </div>
      <p className=" text-sm text-black dark:text-white">
        Nom du produit:{" "}
        <span className="font-medium">{product?.name.toUpperCase()}</span>
      </p>
      <p className=" text-sm text-black dark:text-white">
        Prix unitaire:{" "}
        <span className="font-medium">
          {" "}
          {formatCurrency(product?.unitePrice, "USD") ?? "--"}
        </span>{" "}
      </p>
      <p className=" text-sm text-black dark:text-white">
        Quantité:{" "}
        <span className="font-medium">{product?.quantity ?? " -- "}</span>
      </p>

      <p>
        Details:{" "}
        <span className="text-sm/70 flex flex-col pl-2 text-sm font-medium  dark:text-white/70">
          {product?.attribut?.map((item: any, key: number) => (
            <span key={key}>
              {`${item?.name}: ${item?.value}`}
              {key !== product?.attribut?.length - 1 && ", "}
            </span>
          ))}
        </span>
      </p>
      <p className=" text-sm text-black dark:text-white">
        Prix total:{" "}
        <span className="font-medium text-green-600 dark:text-green-500">
          {formatCurrency(
            product?.unitePrice * (product?.quantity ? product.quantity : 1),
            "USD",
          )}
        </span>
      </p>

      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium">*Veillez preciser la quantité</p>
        <Input
          onChange={(e) => onSetQuantity(product.id, Number(e.target.value))}
          placeholder="Quantité"
          type="number"
          className="w-full"
        />
      </div>

      <Button
        onClick={() => onDelete(product.id)}
        variant={"outline"}
        className="flex w-full items-center justify-center bg-rose-500 dark:bg-rose-500"
      >
        <Trash className=" text-sm text-black dark:text-white" />
      </Button>
      <div className="-mt-1 h-[1px] w-full bg-black opacity-50 dark:bg-white"></div>
    </div>
  );
};

export default ProductOrderDetail;
