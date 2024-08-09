"use client";

import React, { useState } from "react";
import { BiTrendingUp, BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { useGetSessionsQuery } from "@/public/utils/authApi";

interface CardProps {
	title: string;
	content: string;
}

interface Team {
	id: number;
	name: string;
	standings: string[];
	rating: number;
	logo: string;
}

const Dashboard: React.FC = () => {
	const [teams, setTeams] = useState<Team[]>([
		{
			id: 1,
			name: "Henado FC",
			standings: ["W", "D"],
			rating: 3,
			logo: "https://via.placeholder.com/50",
		},
	]);

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newTeam, setNewTeam] = useState<Team>({
		id: teams.length + 1,
		name: "",
		standings: [],
		rating: 0,
		logo: "",
	});
	const [uploadOption, setUploadOption] = useState<"url" | "file">(
		"url"
	);

	const handleAddTeam = () => {
		setIsModalOpen(true);
	};

	const handleSaveTeam = () => {
		setTeams((prevTeams) => [
			...prevTeams,
			{ ...newTeam, id: prevTeams.length + 1 },
		]);
		setIsModalOpen(false);
		setNewTeam({
			id: teams.length + 1,
			name: "",
			standings: [],
			rating: 0,
			logo: "",
		});
	};

	const handleImageUpload = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			const reader = new FileReader();
			reader.onloadend = () => {
				setNewTeam({ ...newTeam, logo: reader.result as string });
			};
			reader.readAsDataURL(file);
		}
	};
	const { data: sessions, refetch } = useGetSessionsQuery();

	return (
		<div className="lg:w-[calc(100%-0px)] w-full mt-10">
			{/* Header section */}
			<div className="flex justify-center items-center mb-6 flex-col">
				<h1 className="text-2xl font-bold">HENADO PLAY ARENA</h1>
				<img
					src="https://via.placeholder.com/150"
					alt="Henado Logo"
					className="h-12"
				/>
			</div>

			{/* Match info section */}
			{
				<div className="bg-gradient-to-r from-blue-500 to-red-500 rounded-lg p-4 text-red-200 w-4/5 mx-auto h-[300px]">
					<div className="flex justify-between items-center">
						<div className="text-center">
							<img
								src="https://via.placeholder.com/100"
								alt="Henado FC"
								className="mx-auto mb-2"
							/>
							<h2 className="text-xl font-semibold">HENADO FC</h2>
							<p>Isaac A. ⚽ 6&apos;</p>
							<p>Isaac A. ⚽ 6&apos;</p>
						</div>

						<div className="flex flex-col justify-center text-center">
							<h1 className="text-4xl font-bold">2 - 1</h1>
							<p>Monday | 5 Aug. 2024 | 5:00 PM</p>
						</div>

						<div className="text-center">
							<img
								src="https://via.placeholder.com/100"
								alt="Green Henado FC"
								className="mx-auto mb-2"
							/>
							<h2 className="text-xl font-semibold">
								GREEN HENADO FC
							</h2>
							<p>James Z. ⚽ 8&apos;</p>
						</div>
					</div>
				</div>
			}

			{/* Card section */}
			<div className="grid grid-cols-4 space-y-4 gap-4 mt-6">
				<Card
					title="Goal of the Day"
					content="Alfred N."
				/>
				<Card
					title="Best Team Today"
					content="Henado FC"
				/>
				<Card
					title="Top Goal Scorer Today"
					content="Isaac Adogbeji"
				/>
				<Card
					title="Total Teams Today"
					content={teams.length.toString()}
				/>
			</div>

			{/* Overview and Next Team to Play section */}
			<div className="grid grid-cols-1 lg:grid-cols-8 mt-6 gap-4">
				{/* Overview section */}
				<div className="col-span-1 lg:col-span-3 overflow-x-auto p-4 border rounded-lg shadow-md bg-white">
					<h1 className="font-medium text-[25px] mb-2">Overview</h1>
					<p className="text-gray-600">
						<small>Your Balance</small>
					</p>
					<div className="flex items-center gap-3 mt-2">
						<p className="font-bold">
							You can add other functions you think will be good
						</p>
						<button className="text-[14px] py-2 px-4 text-white font-medium bg-red-500 rounded-md shadow-lg">
							Add
						</button>
					</div>
					<div className="mt-4">
						<p className="text-sm text-gray-600">Monthly Goal</p>
						<div className="flex items-center justify-between">
							<div className="flex items-baseline">
								<span className="text-2xl font-bold">62.2%</span>
								<span className="text-sm text-gray-500 ml-1">
									/ $12,000
								</span>
							</div>
							<button className="text-xs text-blue-500">Edit</button>
						</div>
						<div className="w-full bg-gray-200 h-2 mt-1">
							<div
								className="bg-red-500 h-2"
								style={{ width: "62.2%" }}
							></div>
						</div>
					</div>
				</div>

				{/* Next team to play section */}
				<div className="col-span-1 lg:col-span-5 overflow-auto min-h-[300px] p-4 border rounded-lg shadow-md bg-white">
					<div className="flex justify-between items-center mb-2">
						<h1 className="font-medium text-[25px]">
							Next Team to Play
						</h1>
						{/* <button
							onClick={handleAddTeam}
							className="text-[14px] py-2 px-4 text-white font-medium bg-red-500 rounded-md shadow-lg"
						>
							+ Add New Team
						</button> */}
					</div>
					<p className="text-sm text-gray-500 mb-4">
						If a team is not available to play, they will be moved 1
						place down the list.
					</p>
					<div className="w-full text-sm text-left text-gray-500">
						<div className="grid grid-cols-5 gap-2 font-medium text-gray-700 bg-gray-100 p-2 rounded-t-md">
							<span className="text-center">S/N</span>
							<span className="text-center">Teams</span>
							<span className="text-center">Today Standings</span>
							<span className="text-center">Rating</span>
							<span className="text-center">Actions</span>
						</div>
						{teams.map((team) => (
							<div
								key={team.id}
								className="grid grid-cols-5 gap-2 py-3 border-b items-center"
							>
								<span className="text-center">{team.id}</span>
								<div className="flex items-center justify-center">
									<img
										src={team.logo}
										alt="Team Logo"
										className="w-8 h-8 mr-2"
									/>
									<span className="font-bold">{team.name}</span>
								</div>
								<div className="flex items-center justify-center gap-1">
									{team.standings.map((status, index) => (
										<span
											key={index}
											className="border rounded-full p-1 px-2 text-center text-xs"
										>
											{status}
										</span>
									))}
								</div>
								<div className="flex items-center justify-center">
									{Array.from({ length: 4 }, (_, index) => {
										if (index < team.rating) {
											return (
												<AiFillStar
													key={index}
													color="orange"
												/>
											);
										}
										return (
											<AiOutlineStar
												key={index}
												color="orange"
											/>
										);
									})}
								</div>
								<div className="flex justify-center">
									<BiDotsVerticalRounded size={20} />
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Modal for adding a new team */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
					<div className="bg-white rounded-lg p-6 w-96">
						<h2 className="text-xl font-semibold mb-4">
							Add New Team
						</h2>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								handleSaveTeam();
							}}
						>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-medium text-gray-700">
									Upload Image
								</label>
								<div className="flex space-x-4 mb-2">
									<button
										type="button"
										onClick={() => setUploadOption("url")}
										className={`px-4 py-2 rounded-md ${
											uploadOption === "url"
												? "bg-blue-500 text-white"
												: "bg-gray-200"
										}`}
									>
										Use Image URL
									</button>
									<button
										type="button"
										onClick={() => setUploadOption("file")}
										className={`px-4 py-2 rounded-md ${
											uploadOption === "file"
												? "bg-blue-500 text-white"
												: "bg-gray-200"
										}`}
									>
										Upload from Device
									</button>
								</div>
								{uploadOption === "url" ? (
									<input
										type="text"
										value={newTeam.logo}
										onChange={(e) =>
											setNewTeam({ ...newTeam, logo: e.target.value })
										}
										className="w-full px-3 py-2 border rounded-md"
										placeholder="Enter image URL"
									/>
								) : (
									<input
										type="file"
										onChange={handleImageUpload}
										className="w-full"
									/>
								)}
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-medium text-gray-700">
									Team Name
								</label>
								<input
									type="text"
									value={newTeam.name}
									onChange={(e) =>
										setNewTeam({ ...newTeam, name: e.target.value })
									}
									className="w-full px-3 py-2 border rounded-md"
								/>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-medium text-gray-700">
									Today Standings
								</label>
								<div className="flex space-x-2">
									{["W", "D", "L"].map((status) => (
										<button
											type="button"
											key={status}
											onClick={() =>
												setNewTeam((prevTeam) => ({
													...prevTeam,
													standings: prevTeam.standings.includes(
														status
													)
														? prevTeam.standings.filter(
																(s) => s !== status
														  )
														: [...prevTeam.standings, status],
												}))
											}
											className={`p-2 border rounded-md ${
												newTeam.standings.includes(status)
													? "bg-blue-500 text-white"
													: ""
											}`}
										>
											{status}
										</button>
									))}
								</div>
							</div>
							<div className="mb-4">
								<label className="block mb-2 text-sm font-medium text-gray-700">
									Rating
								</label>
								<div className="flex space-x-1">
									{Array.from({ length: 4 }, (_, index) => (
										<button
											type="button"
											key={index}
											onClick={() =>
												setNewTeam((prevTeam) => ({
													...prevTeam,
													rating: index + 1,
												}))
											}
											className={`p-1 ${
												index < newTeam.rating
													? "text-yellow-500"
													: "text-gray-300"
											}`}
										>
											<AiFillStar size={20} />
										</button>
									))}
								</div>
							</div>
							<div className="flex justify-end">
								<button
									type="button"
									onClick={() => setIsModalOpen(false)}
									className="px-4 py-2 mr-2 text-sm font-medium text-gray-500 border rounded-md"
								>
									Cancel
								</button>
								<button
									type="submit"
									className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md"
								>
									Save
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

// Card component with type annotation for props
const Card: React.FC<CardProps> = ({ title, content }) => (
	<div className="bg-white col-span-2 lg:col-span-1 p-4 rounded-lg shadow-md flex gap-5 items-center">
		<BiTrendingUp
			size={25}
			color="red"
		/>
		<div>
			<h3 className="text-[12px] font-semibold">{title}</h3>
			<p className="text-[20px] font-bold">{content}</p>
		</div>
	</div>
);

export default Dashboard;
