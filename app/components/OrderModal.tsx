"use client";
import React, { useState, FC } from "react";
import { tableData } from "../../public/data/data";
import { iTableRow } from "../../public/data/types";

interface iOrder {
  i: number;
}

const OrderModal: FC<iOrder> = ({ i }) => {
  const getData: iTableRow = tableData[i];

  return (
    <>
      <dialog id={`my_modal_${i}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">{getData?.userName}</h3>
          <p className="py-1">Order: {getData?.food}</p>
          <p className="py-1">OrderID: {getData?.orderID}</p>
          <p className="py-1">
            Order Status: {getData?.status ? getData?.status : "Idle"}
          </p>

          <div className="flex w-full justify-end">
            {getData?.status === "pending" ? (
              <button
                className="bg-neutral btn text-white"
                onClick={() => {
                  (
                    document.getElementById(
                      `my_modal_${i}`
                    ) as HTMLDialogElement
                  ).close();
                }}
              >
                Approve Delivery
              </button>
            ) : getData?.status === "delivered" ? (
              <button className="btn bg-green-600">Delivered</button>
            ) : (
              <button className="btn bg-orange-500 text-white">
                Begin Delivery
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
};

export default OrderModal;
