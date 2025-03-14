"use client";

import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { AuthStore } from "@/store/authStore";
import AdminDashboard from "@/components/Dashboard/AdminDashboard";

// deploying to vercel
export default function Home() {
  const { user } = AuthStore.useState();

  return (
    <>
      <DefaultLayout>
        {user?.roleCode === "ADMIN" ? (
          <AdminDashboard />
        ) : (
          <p>Another dashboard</p>
        )}
      </DefaultLayout>
    </>
  );
}
