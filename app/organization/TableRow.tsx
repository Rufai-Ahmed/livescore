"use client";
import { FC, HTMLAttributes } from "react";
import { CgOrganisation } from "react-icons/cg";

const TableRow: FC<iOrganization> = ({
  _id,
  address,
  members,
  name,
  email,
  accessCode,
  phone,
  ...props
}) => {
  const handleClick = () => {
    (
      document.getElementById(`orgModal${_id}`) as HTMLDialogElement
    )?.showModal()!;
  };

  return (
    <>
      <tr {...props} className="border-y border-2 cursor-pointer">
        <td onClick={handleClick} className="border-y-[5px] ">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle">
                <CgOrganisation color="#a72036" size={30} />
              </div>
            </div>
            <div>
              <div className="font-bold">{name}</div>
              <div className="text-sm opacity-50">ID: {_id}</div>
            </div>
          </div>
        </td>
        <td className="font-medium border-y-[5px] ">{address}</td>
        <td className="font-medium border-y-[5px] ">{email}</td>

        <td className="border-y-[5px] ">{phone}</td>

        <td className="border-y-[5px]  ">
          {members?.length ? members?.length : 0}
        </td>
      </tr>
    </>
  );
};

export default TableRow;
