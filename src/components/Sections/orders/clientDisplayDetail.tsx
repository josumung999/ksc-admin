import { clientType } from "@/types/clientType";

interface OrderClientDetailProps {
  client: clientType;
}

const OrderClientDetail: React.FC<OrderClientDetailProps> = ({ client }) => {
  return (
    <div className="flex flex-col gap-4">
      <p className=" text-black dark:text-white">
        Nom copmlet:{" "}
        <span className="font-bold">{client?.fullName.toUpperCase()}</span>
      </p>
      <p className=" text-black dark:text-white">
        Téléphone:{" "}
        <span className="font-bold"> {client?.phoneNumber ?? "--"}</span>{" "}
      </p>
      <p className=" text-black dark:text-white">
        Adresse: <span className="font-bold">{client?.address ?? " -- "}</span>
      </p>
      <p className=" text-black dark:text-white">
        Email: <span className="font-bold">{client?.email ?? " -- "}</span>
      </p>
      <p className=" text-black dark:text-white">
        Nationalité:{" "}
        <span className="font-bold">{client?.civility ?? " -- "}</span>{" "}
      </p>
    </div>
  );
};

export default OrderClientDetail;
