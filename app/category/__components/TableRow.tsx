"use client";
import { iCategory } from "@/interfaces";
import { FC, HTMLAttributes } from "react";
import { BiEdit } from "react-icons/bi";
import { CgOrganisation } from "react-icons/cg";
import { RiDeleteBin7Line } from "react-icons/ri";

const TableRow: FC<iCategory> = ({ _id, image, type, ...props }) => {
  const handleClick = () => {
    (
      document.getElementById(`category${_id}`) as HTMLDialogElement
    )?.showModal()!;
  };

  return (
    <>
      <tr {...props} className="border-y border-2 cursor-pointer">
        <td className="border-y-[5px] ">
          <div className="flex items-center gap-3">
            <div className="font-bold">{type}</div>
            {/* <div className="text-sm opacity-50">ID: {_id}</div> */}
          </div>
        </td>
        <td className="font-medium border-y-[5px] ">{"address"}</td>
        <td className="font-medium border-y-[5px] ">{"email"}</td>

        <td className="border-y-[5px] ">
          <button
            onClick={handleClick}
            className="btn bg-[#a82036] text-white hover:bg-[#be2d45]"
          >
            <BiEdit size={20} />
          </button>
        </td>

        <td className="border-y-[5px]  ">
          <button
            onClick={handleClick}
            className="btn bg-[#a82036] text-white hover:bg-[#be2d45]"
          >
            <RiDeleteBin7Line size={20} />
          </button>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
