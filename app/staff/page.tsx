"use client";
import React from "react";
import { iStaffRow } from "@/public/data/types";
import TableRow from "./__components/TableRows";
import Modal from "./__components/Modal";
import { useGetAllMembersQuery } from "@/public/utils/staffAPI";

const page = () => {
  const { data, isLoading } = useGetAllMembersQuery();

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loading loading-spinner" />
      </div>
    );

  return (
    <div>
      <Modal />

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Email</th>
              <th> Staffer's Name </th>
              <th>PIN Code</th>
              <th>Phone Number</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          <tbody className="border-[5px]">
            {data &&
              data.salesPersons.map((row: iStaffRow, i: number) => (
                <TableRow i={i} key={i} {...row} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
