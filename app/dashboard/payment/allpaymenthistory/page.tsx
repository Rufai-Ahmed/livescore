"use client";
import { useGetPaymentsQuery } from "@/public/utils/authApi";
import React from "react";

const AllPaymentsHistoryPage = () => {
  const { data: payments = [], isLoading } = useGetPaymentsQuery();

  // Group payments by date
  const groupedPayments = payments?.reduce((acc: any, payment: any) => {
    const date = new Date(payment?.session).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(payment);
    return acc;
  }, {});

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1>All Payments History</h1>
      <div className="space-y-4">
        {Object.entries(groupedPayments).map(([date, payments]) => (
          <div key={date} className="border border-gray-300 p-4 rounded-lg">
            <h2 className="text-xl font-bold">{date}</h2>
            <ul className="mt-2">
              {payments.map((payment: any) => (
                <li key={payment._id} className="flex items-center justify-between p-2 border-b">
                  <span>{payment.player.username}</span>
                  <span>${payment.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPaymentsHistoryPage;
