"use client";

import { useAddStafferMutation } from "@/public/utils/staffAPI";
import React, { FormEvent } from "react";

const Modal = () => {
  const [addStaffer, { isLoading }] = useAddStafferMutation();

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loading-spinner loader" />
      </div>
    );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;

    const data = await addStaffer(email).unwrap();

    console.log(data);
  };

  return (
    <>
      <button
        className="btn bg-white text-[#a72036] border border-gray-50 shadow-md"
        onClick={() => document.getElementById("staffer_modal3")?.showModal()}
      >
        Add Staffer
      </button>
      <dialog id="staffer_modal3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button
              onClick={() => document.getElementById("staffer_modal3")?.close()}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </button>
          </form>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="label-text text-[16px] font-semibold">
                Staffer Email
              </div>
              <input
                placeholder="Email"
                type="text"
                className="input border input-bordered h-[40px] w-full mt-2"
                name="email"
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

export default Modal;
