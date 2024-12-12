import React from "react";
import {
  CheckCircle,
  Package,
  Truck,
  MapPin,
  Clock,
  Bike,
  SquarePen,
  PackagePlus,
  XCircle,
  PackageCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TrackingEvent = {
  icon: React.ReactNode;
  status: string;
  date: string;
  time: string;
  location?: string;
};

interface TrackingCardProps {
  trackingHistory: any[];
}

const TrackingCard: React.FC<TrackingCardProps> = ({ trackingHistory }) => {
  console.log("Tracking history:", trackingHistory);

  // Map statuses to icons
  const statusIconMap: Record<string, React.ReactNode> = {
    CONFIRMED: <PackagePlus className="text-meta-3" />,
    PACKED: <Package className="text-yellow-500" />,
    IN_TRANSIT: <Bike className="text-purple-500" />,
    DELIVERED: <CheckCircle className="text-green-500" />,
    RETURNED: <MapPin className="text-red-500" />,
    DRAFT: <Clock className="text-meta-4" />,
  };

  // Transform trackingHistory into trackingEvents
  const trackingEvents: TrackingEvent[] = trackingHistory.map((event) => {
    const date = new Date(event.createdAt);
    return {
      icon: statusIconMap[event.status] || <Clock className="text-gray-400" />,
      status:
        event.status === "DRAFT"
          ? "Brouillon"
          : event.status === "CONFIRMED"
            ? "Confirmé"
            : event.status === "PACKED"
              ? "Emballé"
              : event.status === "IN_TRANSIT"
                ? "En transit"
                : event.status === "DELIVERED"
                  ? "Livré"
                  : event.status === "RETURNED"
                    ? "Retour"
                    : "",
      date: date.toLocaleDateString("fr-FR"), // Format as needed
      time: date.toLocaleTimeString("fr-FR"),
    };
  });

  return (
    <div className="mx-auto max-w-lg rounded-lg">
      <div className="text-center">
        <p className="text-lg font-semibold">Suivi de la commande</p>
        <p className="text-gray-500">No: #{trackingHistory[0]?.orderId}</p>
      </div>
      <div className="my-4 flex items-center justify-center">
        {trackingHistory[0]?.status === "PENDING" ? (
          <Clock className="h-8 w-8 text-meta-4" />
        ) : trackingHistory[0]?.status === "DELIVERED" ? (
          <CheckCircle className="h-8 w-8 text-green-500" />
        ) : trackingHistory[0]?.status === "CANCELED" ? (
          <XCircle className="h-8 w-8 text-meta-3" />
        ) : trackingHistory[0]?.status === "IN_TRANSIT" ? (
          <Bike className="h-8 w-8 text-purple-500" />
        ) : trackingHistory[0]?.status === "PACKED" ? (
          <Package className="h-8 w-8 text-primary" />
        ) : (
          <PackageCheck className="h-8 w-8 text-meta-3" />
        )}
        <p
          className={cn(
            "ml-2 text-xl font-semibold",
            trackingHistory[0]?.status === "PENDING"
              ? "text-meta-4"
              : trackingHistory[0]?.status === "DELIVERED"
                ? "text-green-500"
                : trackingHistory[0]?.status === "CANCELED"
                  ? "text-meta-1"
                  : trackingHistory[0]?.status === "IN_TRANSIT"
                    ? "text-purple-500"
                    : trackingHistory[0]?.status === "PACKED"
                      ? "text-primary"
                      : "text-meta-3",
          )}
        >
          {trackingEvents[0]?.status || "Status inconnu"}
        </p>
      </div>
      <p className="text-gray-500 mb-6 text-center">
        Cette commande a été {trackingEvents[0]?.status} au{" "}
        <strong>
          {trackingEvents[0]?.date}, {trackingEvents[0]?.time}
        </strong>{" "}
        à l&apos;adresse: Kinshasa, RDC
      </p>
      <div className="space-y-4">
        {trackingEvents.map((event, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0">{event.icon}</div>
            <div>
              <p className="font-medium">{event.status}</p>
              <p className="text-gray-500 text-sm">
                {event.date} à {event.time}
              </p>
              {event.location && (
                <p className="text-gray-400 text-sm">{event.location}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackingCard;
