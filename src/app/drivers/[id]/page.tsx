"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useSWR from "swr";
import { cn, fetcher, formatNumber, medianDeliveryTime } from "@/lib/utils";
import { DataLoader } from "@/components/common/Loader";
import DriversStatsTable from "@/components/Tables/DriversStats";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  Bike,
  Calendar as CalendarIcon,
  Locate,
  MapPin,
  OctagonPause,
  Phone,
  PhoneCall,
  Pin,
  Route,
  RouteIcon,
  Timer,
} from "lucide-react";
import { differenceInMonths, format } from "date-fns";
import { Button } from "@/components/ui/button";
import CardDataStats from "@/components/CardDataStats";
import {
  CardTitle,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import ItineraryMap from "@/components/Cards/ItineraryMap";

const dummyItinerary = [
  { lat: -4.44193, lng: 15.266293 }, // Central Kinshasa (starting point)
  { lat: -4.4395, lng: 15.268 }, // Near the National Assembly area
  { lat: -4.437, lng: 15.2705 }, // A local market region
  { lat: -4.435, lng: 15.273 }, // Historical site vicinity
  { lat: -4.4325, lng: 15.2755 }, // River view (ending point)
];

const DriverDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/auth/users/${id}`,
    fetcher,
  );
  const driver = data?.data?.record;
  const vehicle = driver?.vehicles[0];
  const [date, setDate] = React.useState<Date>();
  const livraisons = vehicle?.livraisons;

  return (
    <DefaultLayout>
      <Breadcrumb
        pageName={
          driver
            ? `${driver.firstName} ${driver.middleName} ${driver.lastName}`
            : "Profil livreur"
        }
      />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : driver ? (
          <>
            <div className="flex w-full flex-row items-center justify-between rounded-xl bg-primary px-8 py-10">
              <div className="flex flex-col items-start justify-start gap-y-4">
                <h1 className="text-3xl font-bold text-white">
                  {driver?.firstName} {driver?.middleName} {driver?.lastName}
                </h1>
                <div className="flex flex-row items-center justify-start gap-x-4">
                  <Badge
                    variant="default"
                    className="bg-transparent text-white hover:bg-transparent"
                  >
                    <Phone className="mr-1 h-3.5 w-3.5" />
                    <p className="text-xs font-medium text-white">
                      {driver?.phoneNumber}
                    </p>
                  </Badge>

                  <Badge
                    variant="default"
                    className="bg-transparent text-white hover:bg-transparent"
                  >
                    <MapPin className="mr-1 h-3.5 w-3.5" />
                    <p className="text-xs font-medium text-white">
                      {driver?.address ?? "Adresse non renseignée"}
                    </p>
                  </Badge>

                  <Badge
                    variant="default"
                    className="bg-transparent text-white hover:bg-transparent"
                  >
                    <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                    <p className="text-xs font-medium text-white">
                      depuis{" "}
                      {differenceInMonths(
                        new Date(),
                        new Date(driver?.createdAt),
                      )}{" "}
                      mois
                    </p>
                  </Badge>
                </div>
              </div>

              <div className="flex-row items-start justify-start space-x-4">
                <Button variant="default">
                  <PhoneCall className="mr-2 h-5 w-5" />
                  Appeler
                </Button>
                <Button variant="destructive">
                  <OctagonPause className="mr-2 h-5 w-5" />
                  Suspendre
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
              <CardDataStats
                title="Livraisons effectuées"
                total={formatNumber(livraisons?.length)}
                rate="0.43%"
                levelUp
              >
                <Bike className="h-5 w-5 text-meta-3" />
              </CardDataStats>
              <CardDataStats
                title="Temps moyen par livraison"
                total={medianDeliveryTime(livraisons)}
                rate="4.35%"
                levelUp
              >
                <Timer className="h-5 w-5 text-primary" />
              </CardDataStats>
              <CardDataStats
                title="Distance parcourue"
                total="1.234 km"
                rate="0.43%"
                levelUp
              >
                <Route className="h-5 w-5 text-meta-5" />
              </CardDataStats>
            </div>

            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-6 2xl:gap-7.5">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Informations sur le véhicule</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Véhicule:</p>
                    <p>{vehicle?.name}</p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Immatriculation:</p>
                    <p>{vehicle?.immatriculation}</p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Marque:</p>
                    <p>{vehicle?.brand}</p>
                  </div>
                  <div className="flex w-full flex-row items-center justify-between gap-x-4">
                    <p>Modele:</p>
                    <p>{vehicle?.model}</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle>Itineraires</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-y-2">
                  <ItineraryMap routeData={dummyItinerary} />
                </CardContent>
                <CardFooter className="flex flex-row items-center justify-between gap-x-5">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full flex-1 justify-start text-left font-normal",
                          !date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon />
                        {date ? (
                          format(date, "PPP")
                        ) : (
                          <span>Choisissez une date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="z-[10000] w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <Button className="bg-primary">
                    <Route className="mr-2 h-5 w-5" />
                    Voir Itinéraire
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Chauffeur non trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Veuillez vérifier l&apos;identifiant de chauffeur
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default DriverDetails;
