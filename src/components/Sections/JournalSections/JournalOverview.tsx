import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthStore } from "@/store/authStore";
import { Printer } from "lucide-react";

export interface Props {
  journal: any;
}
const JournalOverview: React.FC<Props> = ({ journal }) => {
  const { user } = AuthStore.useState();

  return (
    <div className="flex flex-col space-y-8">
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <div className="flex items-center justify-between px-4 py-5 sm:px-6">
          <div className="">
            <h3 className="text-gray-900 text-lg font-medium leading-6">
              {journal.name}
            </h3>
            <p className="mt-1 max-w-2xl text-base text-primary">
              Vue d&apos;ensemble
            </p>
          </div>
        </div>
        <div className="border-t border-gray">
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-gray-500 text-sm font-medium">Code</dt>
              <dd
                style={{ whiteSpace: "pre-line" }}
                className="text-gray-900 mt-1 text-sm sm:col-span-2 sm:mt-0"
              >
                {journal.code}
              </dd>
            </div>
            <div className="bg-gray px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-gray-500 text-sm font-medium">Type</dt>
              <dd className="text-gray-900 mt-1 text-sm sm:col-span-2 sm:mt-0">
                <p className=" text-black dark:text-white">
                  {journal.type === "FINANCIER"
                    ? "FINANCIER"
                    : journal.type === "ACHAT"
                      ? "ACHAT"
                      : journal.type === "VENTE"
                        ? "VENTE"
                        : journal.type === "OPERATION_CLIENTELE"
                          ? "OPÉRATIONS AVEC LA CLIENTÈLE"
                          : journal.type === "OPERATIONS_DIVERSES"
                            ? "OPÉRATIONS DIVERSES"
                            : ""}
                </p>
                <p
                  className={cn(
                    journal.status === "SYSTEM" ? "text-meta-1" : "text-meta-3",
                  )}
                >
                  {journal.status === "SYSTEM" ? "Système" : "Interne"}
                </p>
              </dd>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-gray-500 text-sm font-medium">
                Actions rapides
              </dt>
              <dd className="mt-1 flex flex-row items-center justify-start space-x-3 sm:col-span-2 sm:mt-0">
                <Button>
                  <Printer className="mr-2 h-5 w-5" />
                  Rapports
                </Button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default JournalOverview;
