"use client";
import React, { use, useEffect } from "react";
import Modal from "./Modal";
import TableRow from "./TableRow";
import MemberModal from "./MembersModal";
import { useGetOrganizationQuery } from "@/public/utils/organizationApi";

const page = () => {
  const { data: getOrganizations, isLoading } = useGetOrganizationQuery();

  if (isLoading)
    return (
      <div className="w-full fixed overflow-hidden h-screen flex items-center justify-center">
        <div className="loading loading-spinner" />
      </div>
    );

  return (
    <div className="">
      <Modal />

      <table className="table mt-10">
        <thead>
          <tr>
            <th>Name and ID</th>
            <th>Address</th>
            <th>email</th>
            <th>Phone Number</th>
            <th>Number of Members</th>
          </tr>
        </thead>

        <tbody className="border-[5px]">
          {getOrganizations &&
            getOrganizations?.map((row: iOrganization, i: number) => (
              <TableRow _id={row._id} key={i} {...row} />
            ))}
        </tbody>

        {getOrganizations &&
          getOrganizations?.map((el: iOrganization, i: number) => (
            <MemberModal key={i} _id={el._id} />
          ))}
      </table>
    </div>
  );
};

export default page;
