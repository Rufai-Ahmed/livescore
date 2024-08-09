"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { menuItems } from "@/public/data/data";
import { BiSearch } from "react-icons/bi";
import { PiSoccerBallDuotone } from "react-icons/pi";
import { FaAngleRight } from "react-icons/fa6";

const Sidebar: React.FC = () => {
	const pathname = usePathname();

	return (
		<div className="hidden h-screen lg:flex justify-center flex-col p-3">
			<div className="h-[50px] border w-full p-3 flex items-center gap-2 ">
				<BiSearch size={25} />
				<input
					type="text"
					className="bg-transparent outline-none w-full h-full"
					name=""
					placeholder="Search"
					id=""
				/>
			</div>
			<div className="w-full bg-white h-[83%] rounded-md">
				<nav className="mt-4 space-y-1">
					<ul>
						<li className="list-none">
							<div
								className={`flex items-center p-2 mt-[8px] rounded-lg cursor-pointer justify-between`}
							>
								<span className="text-gray-700 text-sm">Team</span>
								<span className="text-orange-500 mr-2">
									<FaAngleRight size={17} />
								</span>
							</div>
						</li>

						{menuItems.map((item, index) => (
							<li
								key={index}
								className="list-none"
							>
								<Link href={item.name}>
									<div
										className={`flex items-center p-2 mt-[8px] border rounded-lg cursor-pointer ${
											pathname === item.name
												? "bg-green-100"
												: "hover:bg-orange-100"
										}`}
									>
										<span className="text-orange-500 mr-2">
											<PiSoccerBallDuotone />
										</span>
										<span className="text-gray-700 text-sm">
											{item.name}
										</span>
									</div>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</div>
	);
};

export default Sidebar;
