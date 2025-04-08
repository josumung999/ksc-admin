"use client";

import { ApexOptions } from "apexcharts";
import React from "react";
import dynamic from "next/dynamic";
import { formatCurrency } from "@/lib/utils";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface MonthlyIncome {
  month: string;
  totalSales: number;
  netIncome: number;
}

interface MonthlyIncomeProps {
  monthlySummary: MonthlyIncome[];
}

const MonthlyIncomeChart: React.FC<MonthlyIncomeProps> = ({
  monthlySummary,
}) => {
  const salesData = monthlySummary.map((item) => item.totalSales);
  const incomeData = monthlySummary.map((item) => item.netIncome);
  const categories = monthlySummary.map((item) => item.month);
  const maxValue = Math.max(...salesData, ...incomeData);

  const chartOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    colors: ["#4F46E5", "#16A34A"], // Blue for Sales, Green for Income
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "45%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
      labels: {
        rotate: -45,
      },
    },
    yaxis: {
      min: 0,
      max: maxValue + 100,
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${formatCurrency(val, "USD")}`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  const series = [
    {
      name: "Ventes",
      data: salesData,
    },
    {
      name: "Revenu net",
      data: incomeData,
    },
  ];

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-2 block h-3 w-3 rounded-full bg-[#4F46E5]" />
            <span className="font-semibold text-primary">Total Ventes</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2 block h-3 w-3 rounded-full bg-[#16A34A]" />
            <span className="font-semibold text-green-600">Revenu Net</span>
          </div>
        </div>
      </div>

      <div id="MonthlyIncomeChart" className="-ml-5">
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="bar"
          height={350}
          width="100%"
        />
      </div>
    </div>
  );
};

export default MonthlyIncomeChart;
