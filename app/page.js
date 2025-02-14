"use client";

import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { salesData } from "@/data/data";
import { Button } from "@/components/ui/button";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function CarSalesChart() {
  const [selectedMonth, setSelectedMonth] = useState(salesData[0].month); // Default to the first month

  //Get Data for Selected Month
  const selectedMonthSales = salesData.find((d) => d.month === selectedMonth);
  const chartData = selectedMonthSales
    ? {
        labels: ["Tesla", "Toyota", "Ford", "Mercedes"],
        datasets: [
          {
            label: `${selectedMonth} Sales`,
            data: [
              selectedMonthSales.Tesla,
              selectedMonthSales.Toyota,
              selectedMonthSales.Ford,
              selectedMonthSales.Mercedes,
            ],
            backgroundColor: ["#FF0000", "#007BFF", "#28A745", "#FFC107"],
            borderWidth: 1,
          },
        ],
      }
    : null;

  //Chart Options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      x: { title: { display: true, text: "Car Brands" } },
      y: { title: { display: true, text: "Cars Sold" } },
    },
  };

  return (
    <Card className="p-4 shadow-md bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {selectedMonth} Sales Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        {chartData && <Bar data={chartData} options={options} />}
      </CardContent>
      <div className="flex flex-wrap gap-2 p-4">
        {salesData.map((d) => (
          <Button
            key={d.month}
            onClick={() => setSelectedMonth(d.month)}
            variant={selectedMonth === d.month ? "default" : "outline"}
          >
            {d.month}
          </Button>
        ))}
      </div>
    </Card>
  );
}
