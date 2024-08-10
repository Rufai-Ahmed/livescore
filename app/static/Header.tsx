"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLoginMutation } from "@/public/utils/authApi";

const Header = () => {
  const path = usePathname();

  if (path.includes("dashboard")) return null;

  return (
    <center className="w-full flex justify-center">
      <div className="navbar bg-white fixed top-2 w-[calc(100%-300px)] h-[36px] z-[999] shadow-md rounded-[40px]">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">admin</a>
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
                  src="https://deleoye.ng/wp-content/uploads/2016/11/Dummy-image-370x368.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/dashboard" className="justify-between">
                  Settings
                </Link>
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
