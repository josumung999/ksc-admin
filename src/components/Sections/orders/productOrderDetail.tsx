import { productOrderType } from "@/types/productOrderType";

interface ProductOrderDetailProps {
  product: productOrderType;
}

const ProductOrderDetail: React.FC<ProductOrderDetailProps> = ({ product }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className=" text-black dark:text-white">
        Nom du produit:{" "}
        <span className="font-bold">{product?.name.toUpperCase()}</span>
      </p>
      <p className=" text-black dark:text-white">
        Prix unitaire:{" "}
        <span className="font-bold"> {product?.unitePrice ?? "--"}</span>{" "}
      </p>
      <p className=" text-black dark:text-white">
        Quantité:{" "}
        <span className="font-bold">{product?.quantity ?? " -- "}</span>
      </p>
      <p className=" text-black dark:text-white">
        Prix total:{" "}
        <span className="font-bold">
          {product?.unitePrice * product?.quantity}
        </span>
      </p>
    </div>
  );
};

export default ProductOrderDetail;
