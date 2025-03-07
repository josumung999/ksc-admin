"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { DataLoader } from "@/components/common/Loader";
import DriversStatsTable from "@/components/Tables/DriversStats";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { useParams } from "next/navigation";

const DriverDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useSWR(
    `/api/v1/auth/users/${id}`,
    fetcher,
  );
  const driver = data?.data?.record;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Gérer les livreurs" />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : driver ? (
          <p>Driver details here</p>
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
