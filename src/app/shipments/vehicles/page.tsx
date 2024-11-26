"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { CreateVehicleButton } from "@/components/Forms/Vehicles/CreateVehicleButton";
import VehiclesTable from "@/components/Tables/Vehicles";

const Vehicles = () => {
  const { data, isLoading, error } = useSWR("/api/v1/vehicles", fetcher);
  const vehicles = data?.data?.records;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les véhicules" />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : vehicles?.length > 0 ? (
          <VehiclesTable data={vehicles} />
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucun véhicule trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Gérez vos véhicules
            </EmptyPlaceholder.Description>
            <CreateVehicleButton />
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Vehicles;
