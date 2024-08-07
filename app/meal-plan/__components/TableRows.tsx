"use client";
import { FC, HTMLAttributes } from "react";

import { iMealRow } from "@/public/data/types";

const TableRow: FC<iMealRow> = ({
  user,
  type,
  date,
  mealsLeft,
  i,
  ...props
}) => {
  const handleClick = () => {
    (
      document.getElementById(`meal_modal_${i}`) as HTMLDialogElement
    ).showModal();
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
                  src={"/assets/dummy.jpg"}
                  alt={`Avatar of ${user}`}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{user}</div>
            </div>
          </div>
        </td>
        <td className="font-medium border-y-[5px] ">{type}</td>
        <td className="border-y-[5px] ">{date}</td>
        <td className="border-y-[5px] ">{mealsLeft}</td>
      </tr>
    </>
  );
};

export default TableRow;
