import React from "react";
import { CheckCircle, Package, Truck, MapPin, Clock, Bike } from "lucide-react";

type TrackingEvent = {
  icon: React.ReactNode;
  status: string;
  date: string;
  time: string;
  location?: string;
};

const TrackingCard: React.FC = () => {
  const trackingEvents: TrackingEvent[] = [
    {
      icon: <CheckCircle className="text-green-500" />,
      status: "Livrée",
      date: "10th Sep 2020",
      time: "10:35 AM",
      location: "à 23 Blvd du 30 juin, Gombe, Kinshasa",
    },
    {
      icon: <Bike className="text-purple-500" />,
      status: "En Transit",
      date: "8th Sep 2020",
      time: "06:18 AM",
      location: "De l'entrepot à 23 Blvd du 30 juin, Gombe, Kinshasa",
    },
    {
      icon: <Package className="text-yellow-500" />,
      status: "Commande emballée",
      date: "6th Sep 2020",
      time: "05:54 AM",
      location: "Depuis l'entrepôt principqal",
    },
    {
      icon: <Clock className="text-meta-4" />,
      status: "Commande confirmée",
      date: "5th Sep 2020",
      time: "11:54 AM",
    },
  ];

  // For deployment

  return (
    <div className="mx-auto max-w-lg rounded-lg">
      <div className="text-center">
        <p className="text-lg font-semibold">Suivi de la commande</p>
        <p className="text-gray-500">No: #786548918</p>
      </div>
      <div className="my-4 flex items-center justify-center">
        <CheckCircle className="h-8 w-8 text-green-500" />
        <p className="ml-2 text-xl font-semibold text-green-600">Livrée</p>
      </div>
      <p className="text-gray-500 mb-6 text-center">
        Cette commande a été livrée le <strong>10th Sep 2020, 10:35 AM</strong>{" "}
        à l&apos;adresse: Ahmedabad, GJ
      </p>
      <div className="space-y-4">
        {trackingEvents.map((event, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0">{event.icon}</div>
            <div>
              <p className="font-medium">{event.status}</p>
              <p className="text-gray-500 text-sm">
                {event.date} at {event.time}
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
