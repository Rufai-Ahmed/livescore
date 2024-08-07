import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const orderData = [12, 3];

export const data = {
  labels: [
    `Pending Orders: ${orderData[0]}`,
    `Completed Orders: ${orderData[1]}`,
  ],
  datasets: [
    {
      label: "# of Votes",
      data: orderData,
      backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
      borderColor: ["rgba(255, 99, 132, 1)", "rgba(75, 192, 192, 1)"],
      borderWidth: 1,
    },
  ],
};

const PieCharts = () => {
  return <Pie data={data} />;
};

export default PieCharts;
