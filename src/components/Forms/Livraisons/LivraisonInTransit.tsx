import { Button } from "@/components/ui/button";
import { AuthStore } from "@/store/authStore";
import { Bike, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import { mutate } from "swr";

interface LivraisonInTransitProps {
  livraison: any;
}

export function LivraisonInTransit({ livraison }: LivraisonInTransitProps) {
  const [loading, setLoading] = useState(false);
  const { user } = AuthStore.useState();

  async function markInTransit() {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/v1/livraisons/${livraison.orderId}/in-transit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
          },
        },
      );
      if (response.ok) {
        toast.success("Livraison marquée en transit");
        mutate(`/api/v1/livraisons/${livraison.id}`);
      } else {
        toast.error("Une erreur est survenue");
      }
    } catch (error) {
      console.log("Error", error);
      toast.error("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button
      size="sm"
      variant="secondary"
      className="basis-2/5 bg-meta-3 text-whiten"
      disabled={loading}
      onClick={markInTransit}
    >
      {loading ? (
        <div className=" h-5 w-5 animate-spin rounded-full border-b-2 border-t-2 border-slate-50 dark:border-slate-50"></div>
      ) : (
        <Bike className="mr-2 h-5 w-5" />
      )}
      {loading ? "En cours de traitement" : "Marquer en transit"}
    </Button>
  );
}
