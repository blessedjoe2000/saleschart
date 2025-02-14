"use client";

import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { salesData } from "@/data/data";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [selectedMonth, setSelectedMonth] = useState(salesData[0].month); // Default to first month

  //Get Data for Selected Month
  const selectedMonthSales = salesData.find((d) => d.month === selectedMonth);
  const pieChartData = selectedMonthSales
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

  return (
    <Card className="p-4 shadow-md bg-white">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-xl font-bold">
            {selectedMonth} Sales Breakdown
          </CardTitle>
          <Button className="text-xl font-bold bg-blue-500 hover:bg-blue-600">
            <Link href="/">View Bar Chart</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="h-[400px] flex justify-center">
        {pieChartData && <Pie data={pieChartData} />}
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
