"use client";
import Card, { iCard } from "@/app/components/Card";
import React from "react";
import { BiShoppingBag } from "react-icons/bi";
import { FaBoxesStacked } from "react-icons/fa6";
import { GoListOrdered } from "react-icons/go";
import { VscListOrdered } from "react-icons/vsc";
import PieCharts from "./components/Pie";
import { BarChart } from "./components/Bar";
import LineChart from "./components/Line";
import Header from "./static/Header";

const page = () => {
  const cardData: iCard[] = [
    {
      btnColour: true,
      icon: <GoListOrdered size={20} />,
      lgTxt: "75",
      smTxt: "Total Orders",
    },
    {
      btnColour: true,
      icon: <FaBoxesStacked size={20} />,
      lgTxt: "735",
      smTxt: "Total Delivered",
    },
    {
      icon: <VscListOrdered size={20} />,
      lgTxt: "65",
      smTxt: "Total Canceled",
    },
    {
      icon: <BiShoppingBag size={20} />,
      lgTxt: "₦128,000",
      smTxt: "Total Revenue",
    },
  ];

  return (
    <main className="w-full min-h-screen">
      <div className="mb-10">
        <h2 className="font-bold text-[24px]"> Dashboard</h2>
        <p>Hi, Admin. Welcome back to your dashboard.</p>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-5">
        {cardData.map((el: iCard, i: number) => (
          <Card
            btnColour={el.btnColour}
            icon={el.icon}
            key={i}
            lgTxt={el.lgTxt}
            smTxt={el.smTxt}
          />
        ))}
      </div>

      <div className="w-full grid grid-cols-2 mt-10 gap-10">
        <div className="w-full h-[400px] gap-5 py-20 flex justify-center bg-white shadow-md">
          <PieCharts />
        </div>

        <div className="w-full space-y-5 min-h-[400px]">
          <div className="bg-white shadow-md rounded-md p-5">
            <BarChart />
          </div>
          <div className="bg-white shadow-md rounded-md p-5">
            <LineChart />
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
