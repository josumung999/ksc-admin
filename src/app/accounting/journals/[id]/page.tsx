"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { cn, fetcher } from "@/lib/utils";
import useSWR from "swr";
import { DataLoader } from "@/components/common/Loader";
import { EmptyPlaceholder } from "@/components/EmptyPlaceholder";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import JournalOverview from "@/components/Sections/JournalSections/JournalOverview";
import JournalOperations from "@/components/Sections/JournalSections/JournalOperations";

const JournalDetails = () => {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const { data, isLoading, error } = useSWR(
    `/api/v1/accounting/journals/${id}`,
    fetcher,
  );
  const journal = data?.data?.record;

  console.log("Journal Comptable: ", journal);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={journal?.name ?? "Détails du Journal"} />

      <div className="flex min-h-screen flex-col gap-10">
        {isLoading ? (
          <DataLoader />
        ) : journal ? (
          <>
            <JournalOverview journal={journal} />
            <h1 className="text-2xl font-bold text-meta-4">Opérations</h1>
            <JournalOperations journal={journal} />
          </>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon />
            <EmptyPlaceholder.Title>
              Aucun journal trouvé
            </EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              Le journal que vous cherchez est introuvable
            </EmptyPlaceholder.Description>
            <Link
              href="/accounting/journals"
              className={cn(buttonVariants({ variant: "default", size: "lg" }))}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Retour aux journaux
            </Link>
          </EmptyPlaceholder>
        )}
      </div>
    </DefaultLayout>
  );
};

export default JournalDetails;
