"use client";
import { FormEvent, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Modal = () => {
  const [img, setImg] = useState<string | undefined>(undefined);
  const addImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const uri = URL.createObjectURL(file);
      setImg(uri);
    }
  };

  const handleAction = (e: FormEvent<HTMLFormElement>) => {};

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        theme="light"
      />

      <button
        className="btn bg-white text-[#a72036] border border-gray-50 shadow-md"
        onClick={() => document.getElementById("catModal")?.showModal()}
      >
        Add Category
      </button>
      <dialog id="catModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <form onSubmit={handleAction}>
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
              <button className="btn ">Submit</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
