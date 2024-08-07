"use client";
import { FC, HTMLAttributes } from "react";

import { iStaffRow } from "@/public/data/types";
import { RiDeleteBin2Fill } from "react-icons/ri";

const TableRow: FC<iStaffRow> = ({
  firstName,
  lastName,
  phone,
  accessCode,
  email,
  status,
  i,
  ...props
}) => {
  const handleClick = () => {
    (
      document.getElementById(`staffer_modal_${i}`) as HTMLDialogElement
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
                  alt={`Avatar of ${email}`}
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{email}</div>
            </div>
          </div>
        </td>
        <td className="border-y-[5px] ">
          {firstName && lastName
            ? `${firstName + " " + lastName}`
            : "Pending Verification"}
        </td>
        <td className="font-medium border-y-[5px] ">
          {accessCode ? accessCode : "N/A"}
        </td>
        <td className="border-y-[5px] ">{phone ? phone : "N/A"}</td>
        <th className="border-y-[5px] ">
          <button
            className={`btn text-white btn-ghost btn-xs ${
              !accessCode ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {!accessCode ? "Verified" : "Unverified"}
          </button>
        </th>
        <td>
          <RiDeleteBin2Fill color="red" size={24} />
        </td>
      </tr>
    </>
  );
};

export default TableRow;
