import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const randNum = () => Math.floor(Math.random() * 1000);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Revenue Line Chart",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Revenue",
      data: labels.map(() => randNum()),
      fill: false,
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.4, // This property makes the line curvy
    },
  ],
};

export function LineChart() {
  return <Line options={options} data={data} />;
}

export default LineChart;
