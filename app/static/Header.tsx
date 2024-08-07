"use client";
import React from "react";
import { useProfileQuery } from "@/public/utils/authApi";

const Header = () => {
  const { data, isLoading, error } = useProfileQuery();

  if (isLoading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="loading loading-spinner" />
      </div>
    );

  console.log(data, error);

  return (
    <center className="w-full flex justify-center">
      <div className="navbar bg-white fixed top-2 w-[calc(100%-300px)] h-[36px] z-[999] shadow-md rounded-[40px]">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </center>
  );
};

export default Header;
