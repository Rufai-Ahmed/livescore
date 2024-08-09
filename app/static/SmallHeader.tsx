"use client";
import React, { useState } from "react";
import { GiSoccerBall } from "react-icons/gi";
import { BsStar } from "react-icons/bs";
import { BiMenu, BiNews } from "react-icons/bi";

const Header: React.FC = () => {
	const [showMenu, setShowMenu] = useState(false);

	return (
		<header className="w-full border-b p-4 text-black bg-white">
			<div className="flex justify-between items-center">
				{/* Logo and Menu Icon */}
				<div className="flex items-center gap-4">
					<BiMenu
						size={24}
						className="md:hidden cursor-pointer"
						onClick={() => setShowMenu(!showMenu)}
					/>
					<span className="text-xl font-bold">LiveScore</span>
				</div>

				{/* Navigation Links */}
				<nav className="hidden md:flex items-center gap-8">
					<div className="flex items-center gap-2 cursor-pointer">
						<GiSoccerBall size={20} />
						<p>Scores</p>
					</div>
					<div className="flex items-center gap-2 cursor-pointer">
						<BsStar size={20} />
						<p>Favourites</p>
					</div>
					<div className="flex items-center gap-2 cursor-pointer">
						<BiNews size={20} />
						<p>News</p>
					</div>
				</nav>
			</div>

			{/* Dropdown Menu for Small Screens */}
			{showMenu && (
				<div className="flex flex-col mt-4 md:hidden">
					<div className="flex items-center gap-2 cursor-pointer mb-2">
						<GiSoccerBall size={20} />
						<p>Scores</p>
					</div>
					<div className="flex items-center gap-2 cursor-pointer mb-2">
						<BsStar size={20} />
						<p>Favourites</p>
					</div>
					<div className="flex items-center gap-2 cursor-pointer">
						<BiNews size={20} />
						<p>News</p>
					</div>
				</div>
			)}
		</header>
	);
};

export default Header;
