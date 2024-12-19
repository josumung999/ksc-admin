import { Button } from "@/components/ui/button";
import { Bike, Check } from "lucide-react";

interface LivraisonInTransitProps {
  livraison: any;
}

export function LivraisonInTransit({ livraison }: LivraisonInTransitProps) {
  return (
    <Button
      size="sm"
      variant="secondary"
      className="basis-2/5 bg-meta-3 text-whiten"
    >
      <Bike className="mr-2 h-5 w-5" />
      Marquer en transit
    </Button>
  );
}
