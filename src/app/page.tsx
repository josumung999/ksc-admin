"use client";

import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { AuthStore } from "@/store/authStore";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";
import DeliveryDashboard from "@/components/Dashboard/DeliveryDashBoad";

// deploying to vercel
export default function Home() {
  const { user } = AuthStore.useState();

  if (user?.roleCode === "ADMIN") {
    return (
      <>
        <DefaultLayout>
          <AdminDashboard />
        </DefaultLayout>
      </>
    );
  }

  if (user?.roleCode === "DELIVERY") {
    return (
      <>
        <DefaultLayout>
          <DeliveryDashboard />
        </DefaultLayout>
      </>
    );
  }
}
