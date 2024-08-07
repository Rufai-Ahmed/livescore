"use client";
import Link from "next/link";
import logo from "../../public/assets/go.jpg";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { iSideData } from "../../public/data/types";
import { sideData } from "../../public/data/data";

const Sidebar = () => {
  const router = usePathname();

  return (
    <div className="w-[240px] bg-white fixed left-0 px-4 h-full border-r shadow-lg text-gray-500 font-semibold">
      <div className="w-full justify-center flex pt-10">
        <Image src={logo} height={100} width={100} alt="logo" />
      </div>
      <nav className="mt-10">
        <ul className="space-y-2">
          {sideData.map((el: iSideData, i: number) => (
            <Link key={i} href={el?.route! ? el.route! : el.name!}>
              {" "}
              <li
                className={`px-4 py-2 rounded-[40px] transition-all duration-300 capitalize cursor-pointer mb-2 ${
                  router.replace("/", "") === el.name ||
                  (router === "/" && el.route === "/") ||
                  router.toLowerCase() === el.route?.toLowerCase()
                    ? "bg-[#a72036] text-white"
                    : "hover:bg-[#a72036] hover:text-white"
                }`}
              >
                {el.name}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
