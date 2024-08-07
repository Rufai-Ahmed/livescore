"use client";
import { FC, HTMLAttributes } from "react";
import { iTableRow } from "../../public/data/types";

const TableRow: FC<iTableRow> = ({
  orderID,
  imgSrc,
  food,
  location,
  userName,
  i,
  status,
  time,
  ...props
}) => {
  const handleClick = () => {
    (document.getElementById(`my_modal_${i}`) as HTMLDialogElement).showModal();
  };

  return (
    <>
      <tr
        {...props}
        className="border-y border-2 cursor-pointer"
        onClick={handleClick}
      >
        <td className="border-y-[5px] ">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  width={100}
                  height={100}
                  src={imgSrc!}
                  alt={`Avatar of ${food}`}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{food}</div>
              <div className="text-sm opacity-50">{location}</div>
            </div>
          </div>
        </td>
        <td className="font-medium border-y-[5px] ">{userName}</td>
        <td className="border-y-[5px] ">{time}</td>
        <td className="border-y-[5px] ">{orderID}</td>
        <th className="border-y-[5px] ">
          <button
            className={`btn btn-ghost btn-xs ${
              status === "pending"
                ? "bg-yellow-500"
                : status === "delivered"
                ? "bg-green-500"
                : "bg-red-500"
            }`}
          >
            {status ? status : "begin"}
          </button>
        </th>
      </tr>
    </>
  );
};

export default TableRow;
