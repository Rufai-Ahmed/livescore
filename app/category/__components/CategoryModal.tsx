"use client";
import { iCategory } from "@/interfaces";
import { useGetOrganizationQuery } from "@/public/utils/organizationApi";
import React, { FC, use, useState } from "react";

const CategoryModal: FC<iCategory> = ({ description, type, _id }) => {
  const { data: getOrganizations, isLoading } = useGetOrganizationQuery();

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loading loading-spinner" />
      </div>
    );

  //   const getData: iOrganization | undefined = getOrganizations?.find(
  //     (el: iOrganization) => el._id === _id
  //   );

  return (
    <>
      <dialog id={`category${_id}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <form>
            <div>
              <label className="label-text text-[16px] font-semibold">
                Category
              </label>
              <input
                placeholder="Category Type"
                type="text"
                className="input border input-bordered h-[40px] w-full my-2"
                name="name"
              />
            </div>
            <div>
              <label className="label-text text-[16px] font-semibold">
                Description
              </label>
              <input
                placeholder="Description"
                type="text"
                className="input border input-bordered h-[40px] w-full my-2"
                name="description"
              />
            </div>

            <div className="w-full flex justify-end mt-5">
              <button type="submit" className="btn ">
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default CategoryModal;
