import React from "react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "@/components/ui/button";
import { clientType } from "@/types/clientType";

type clientPops = {
  client: clientType;
  setData: React.Dispatch<clientType>;
  setOpen: React.Dispatch<boolean>;
};
const OrderClientCard: React.FC<clientPops> = ({
  client,
  setData,
  setOpen,
}) => {
  return (
    <button
      className="mt-2 w-full"
      onClick={() => {
        setData(client);
        setOpen(false);
      }}
    >
      <Card className="w-full border-none duration-100 hover:scale-95 hover:bg-slate-100 dark:bg-black dark:hover:bg-slate-800">
        <CardContent className="flex gap-4 pt-1">
          <div className="col-span-3 flex w-full flex-row justify-start gap-3">
            <div className="flex w-full flex-row items-start justify-between py-3 md:h-full">
              <div className="w-full">
                <div className="flex flex-row items-start justify-start gap-x-2">
                  <h5 className="text-xl font-bold text-black dark:text-white">
                    <span className="font-bold">{client?.fullName}</span>
                  </h5>
                </div>
                <div className="mt-4 flex flex-col items-start justify-between gap-y-3 ">
                  <span className="text-sm font-medium text-black/70 dark:text-white/70">
                    <span className="font-bold">{client?.phoneNumber}</span>
                  </span>
                  <span className="text-sm font-medium text-black/70 dark:text-white/70">
                    {client?.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </button>
  );
};

export default OrderClientCard;
