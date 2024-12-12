import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { OrderTrackingStatus } from "@/types/getOrderType";
import { SetStateAction } from "react";
import { mutate } from "swr/_internal";
import { toast as toastReact } from "react-toastify";
import axios from "axios";

interface ConfirmOrderButtonProps {
  disabled: boolean;
  label: string;
  setIsLoadingUpdate: React.Dispatch<SetStateAction<boolean>>;
  token: string;
  orderId: string;
}
const ConfirmOrderButton: React.FC<ConfirmOrderButtonProps> = ({
  disabled,
  label,
  setIsLoadingUpdate,
  token,
  orderId,
}) => {
  //confirm the order
  async function orderConfirmed(status: string) {
    if (status !== OrderTrackingStatus.CONFIRMED) {
      return;
    }

    const url = `/api/v1/orders/${orderId}/confirmed`;

    try {
      setIsLoadingUpdate(true);

      await axios({
        method: "put",
        url,
        data: {
          orderTracking: {
            status,
          },
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      mutate(`/api/v1/orders/${orderId}`);
      toastReact.success(`Ordre mise à jour`);
    } catch (error: any) {
      console.log(error);
      setIsLoadingUpdate(false);
      toastReact.error(
        `Une erreur s'est produite,\n ${OrderTrackingStatus.CONFIRMED ? error?.response?.data?.message : ""}`,
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
      onClick={() => orderConfirmed(OrderTrackingStatus.CONFIRMED)}
    >
      <Check className="mr-2 h-5 w-5 " />
      {label}
    </Button>
  );
};

export default ConfirmOrderButton;
