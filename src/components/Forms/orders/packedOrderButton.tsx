import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { OrderTrackingStatus } from "@/types/getOrderType";
import { SetStateAction } from "react";
import { mutate } from "swr/_internal";
import { toast as toastReact } from "react-toastify";
import axios from "axios";

interface PackedOrderButtonProps {
  disabled: boolean;
  label: string;
  setIsLoadingUpdate: React.Dispatch<SetStateAction<boolean>>;
  token: string;
  orderId: string;
}
const PackedOrderButton: React.FC<PackedOrderButtonProps> = ({
  disabled,
  label,
  setIsLoadingUpdate,
  token,
  orderId,
}) => {
  //packed the order
  async function orderPacked(status: string, orderId: string) {
    console.log(status);
    if (status !== OrderTrackingStatus.PACKED) {
      return;
    }

    try {
      setIsLoadingUpdate(true);

      await axios({
        method: "put",
        url: `/api/v1/orders/${orderId}/packed`,
        data: {
          orderTracking: {
            status,
          },
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      await axios({
        method: "post",
        url: "/api/v1/livraisons/create",
        data: {
          orderId,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      mutate(`/api/v1/orders/${orderId}`);
      toastReact.success(`Ordre mise à jour}`);
    } catch (error: any) {
      console.log(error);
      setIsLoadingUpdate(false);
      toastReact.error(
        `Une erreur s'est produite,\n ${OrderTrackingStatus.PACKED ? error?.response?.data?.message : ""}`,
      );
    } finally {
      setIsLoadingUpdate(false);
    }
  }

  return (
    <Button
      size="sm"
      variant="secondary"
      className="bg-meta-3 text-whiten hover:text-meta-3/90 dark:bg-meta-3"
      disabled={disabled}
      onClick={() => orderPacked(OrderTrackingStatus.PACKED, orderId)}
    >
      <Check className="mr-2 h-5 w-5 " />
      {label}
    </Button>
  );
};

export default PackedOrderButton;
