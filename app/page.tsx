"use client";
import Card, { iCard } from "@/app/components/Card";
import React from "react";
import {
	BiBall,
	BiMenu,
	BiNews,
	BiShoppingBag,
} from "react-icons/bi";
import { FaAngleRight, FaBoxesStacked } from "react-icons/fa6";
import { GoListOrdered } from "react-icons/go";
import { VscListOrdered } from "react-icons/vsc";
// import PieCharts from "./components/Pie";
// import { BarChart } from "./components/Bar";
import LineChart from "./components/Line";
import Header from "./static/Header";
import {
	BsArrowDownCircle,
	BsStar,
	BsStarHalf,
} from "react-icons/bs";
import { GiSoccerBall } from "react-icons/gi";
import Sidebar from "./components/PageSidebar";
import ContentSwitcher from "./components/Switcher";
import { GrStarOutline } from "react-icons/gr";

const Page = () => {
	const cardData: iCard[] = [
		{
			btnColour: true,
			icon: <GoListOrdered size={20} />,
			lgTxt: "75",
			smTxt: "Total Orders",
		},
		{
			btnColour: true,
			icon: <FaBoxesStacked size={20} />,
			lgTxt: "735",
			smTxt: "Total Delivered",
		},
		{
			icon: <VscListOrdered size={20} />,
			lgTxt: "65",
			smTxt: "Total Canceled",
		},
		{
			icon: <BiShoppingBag size={20} />,
			lgTxt: "₦128,000",
			smTxt: "Total Revenue",
		},
	];

	return (
		<main className="w-full flex justify-center items-end min-h-screen ">
			<div className="w-full md:w-[90%] min-h-screen bg-white mt-2 shadow-lg ">
				<div className="w-full border-b flex items-center justify-between p-2">
					<div className="flex items-center gap-4">
						<BiMenu size={20} />
						LiveScore
					</div>

					<div className="flex items-center gap-8">
						<div className="flex items-center gap-2 ">
							<GiSoccerBall size={20} />
							<p>Scores</p>
						</div>
						<div className="flex items-center gap-2 ">
							<BsStar size={20} />
							<p>Favourites</p>
						</div>
						<div className="flex items-center gap-2 ">
							<BiNews size={20} />
							<p>News</p>
						</div>
					</div>
				</div>

				<div className="flex items-start">
					<div className="w-[200px]">
						<Sidebar />
					</div>

					<div className="lg:w-[calc(100%-200px)] w-full px-8 mt-10 ">
						<ContentSwitcher />
						<div className="flex items-center  justify-between">
							<div className="flex items-center gap-4">
								<GiSoccerBall size={26} />

								<div>
									<p className="text-[18px]">
										<b>Qualification</b>
									</p>
									<p>
										<small>Champions Leage</small>
									</p>
								</div>
							</div>

							<FaAngleRight size={20} />
						</div>

						<div className="flex mt-5 items-center border rounded-md p-2 justify-between relative h-[50px]">
							<div className="flex gap-4 h-full items-center">
								<div className="w-2 rounded-r-lg bg-orange-500 h-[90%] " />
								<div className="flex flex-col justify-between text-[18px]">
									61&apos;
								</div>

								<div className="flex flex-col justify-between">
									<div className="flex items-center gap-3">
										<BsStarHalf size={15} />
										<p>Slavia Prague</p>
									</div>
									<div className="flex items-center gap-3">
										<BsStarHalf size={15} />
										<p>Slavia Prague</p>
									</div>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<div className="flex flex-col justify-between">
									<p>3</p>
									<p>0</p>
								</div>
								<GrStarOutline size={20} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Page;
