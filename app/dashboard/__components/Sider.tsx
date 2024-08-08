import React from "react";
import { AiOutlineBell, AiOutlineDashboard } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoMdPeople } from "react-icons/io";

const Sider = () => {
	return (
		<div className=" h-screen md:block fixed top-0 left-0 bg-orange-400 w-64 p-6 z-10 hidden">
			<div className="flex flex-col items-center">
				<div className="flex items-center justify-center mb-8">
					<img
						src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
						alt="profile"
						className="w-12 h-12 rounded-full"
					/>
					<div className="ml-4 text-white">
						<h3 className="text-lg">Andrew D.</h3>
						<p className="text-sm">admin@gmail.com</p>
					</div>
				</div>
				<AiOutlineBell className="text-white text-2xl absolute top-8 right-6" />
			</div>

			<div className="text-white text-lg font-bold mb-10">
				<span className="text-2xl">check.io</span>
			</div>

			<nav>
				<ul>
					<li className="mb-6">
						<a
							href="#"
							className="flex items-center text-white hover:text-gray-300"
						>
							<AiOutlineDashboard className="mr-3 text-xl" />
							Dashboard
						</a>
					</li>
					<li className="mb-6">
						<a
							href="#"
							className="flex items-center text-white hover:text-gray-300"
						>
							<BsCurrencyDollar className="mr-3 text-xl" />
							Daily Games
						</a>
					</li>
					<li className="mb-6">
						<a
							href="#"
							className="flex items-center text-white hover:text-gray-300"
						>
							<BsCurrencyDollar className="mr-3 text-xl" />
							Henado Professional League
						</a>
					</li>
					<li className="mb-6">
						<a
							href="#"
							className="flex items-center text-white hover:text-gray-300"
						>
							<BsCurrencyDollar className="mr-3 text-xl" />
							Henado Champions League
						</a>
					</li>
					<li className="mb-6">
						<a
							href="#"
							className="flex items-center text-white hover:text-gray-300"
						>
							<BsCurrencyDollar className="mr-3 text-xl" />
							Henado Community Shield
						</a>
					</li>
					<li className="mb-6">
						<a
							href="#"
							className="flex items-center text-white hover:text-gray-300"
						>
							<BsCurrencyDollar className="mr-3 text-xl" />
							Custom Competitions
						</a>
					</li>
					<li className="mb-6">
						<a
							href="#"
							className="flex items-center text-white hover:text-gray-300"
						>
							<BsCurrencyDollar className="mr-3 text-xl" />
							Hall of Fame
						</a>
					</li>
					<li>
						<a
							href="#"
							className="flex items-center text-white hover:text-gray-300"
						>
							<IoMdPeople className="mr-3 text-xl" />
							Users
						</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Sider;
