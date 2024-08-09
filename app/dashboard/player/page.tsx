"use client";
import {
	useGetPlayerQuery,
	usePlayerMutation,
	useGetTeamsQuery,
} from "@/public/utils/authApi";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export interface Player {
	username: string;
	phoneNumber?: string;
	teamId?: string;
	club?: any;
	photo: string;
}

interface Club {
	_id: string;
	name: string;
}

const PlayerPage: React.FC = () => {
	const [players, setPlayers] = useState<Player[]>([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newPlayer, setNewPlayer] = useState<Player>({
		username: "",
		teamId: "",
		photo: "",
		phoneNumber: "",
	});

	const {
		data: playerData,
		isLoading: isFetchingPlayers,
		error,
	} = useGetPlayerQuery();
	const { data: clubsData, isLoading: isFetchingClubs } =
		useGetTeamsQuery();
	const [addPlayer, { isLoading }] = usePlayerMutation();

	useEffect(() => {
		if (playerData) {
			setPlayers(playerData);
		}
	}, [playerData]);

	console.log(playerData);

	const handleAddPlayer = async () => {
		try {
			await addPlayer(newPlayer).unwrap();
			setPlayers((prev) => [...prev, newPlayer]);
			setNewPlayer({
				username: "",
				teamId: "",
				photo: "",
				phoneNumber: "",
			});
			setIsModalOpen(false);
		} catch (err) {
			console.error("Failed to add player:", err);
		}
	};

	if (isFetchingPlayers) {
		return <p className="text-center mt-4">Loading players...</p>;
	}

	if (error) {
		return (
			<p className="text-center mt-4 text-red-500">
				Failed to load players. Please try again later.
			</p>
		);
	}

	return (
		<div className="p-6">
			<button
				onClick={() => setIsModalOpen(true)}
				className="text-[14px] py-2 px-4 text-white font-medium bg-red-500 rounded-md shadow-lg"
			>
				Add Player
			</button>

			{/* Player Table */}
			<div className="mt-6 overflow-x-auto">
				{players.length === 0 ? (
					<p className="text-center mt-4">No players found.</p>
				) : (
					<table className="table table-zebra w-full text-sm">
						<thead>
							<tr>
								<th className="p-2">Name</th>
								<th className="p-2">Club</th>
								<th className="p-2">Image</th>
								<th className="p-2">Phone Number</th>
							</tr>
						</thead>
						<tbody>
							{players.map((player, index) => (
								<tr
									key={index}
									className="hover:bg-gray-100"
								>
									<td className="p-2">{player.username}</td>
									<td className="p-2">
										{(player.club?.name as string) ||
											"Not in any yet"}
									</td>
									<td className="p-2">
										<img
											src={player.photo}
											alt={player.username}
											className="w-16 h-16 object-cover rounded"
										/>
									</td>
									<td className="p-2">
										{player.phoneNumber || "N/A"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>

			{/* Modal for adding a new player */}
			{isModalOpen && (
				<div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
						<h2 className="text-xl font-bold mb-4">Add New Player</h2>
						<form onSubmit={(e) => e.preventDefault()}>
							<label className="block mb-2">
								Player Name
								<input
									type="text"
									className="mt-1 p-2 border rounded w-full"
									value={newPlayer.username}
									onChange={(e) =>
										setNewPlayer({
											...newPlayer,
											username: e.target.value,
										})
									}
								/>
							</label>

							<label className="block mb-2">
								Phone Number
								<input
									type="text"
									className="mt-1 p-2 border rounded w-full"
									value={newPlayer.phoneNumber}
									onChange={(e) =>
										setNewPlayer({
											...newPlayer,
											phoneNumber: e.target.value,
										})
									}
								/>
							</label>

							<label className="block mb-2">
								Image URL
								<input
									type="url"
									className="mt-1 p-2 border rounded w-full"
									value={newPlayer.photo}
									onChange={(e) =>
										setNewPlayer({
											...newPlayer,
											photo: e.target.value,
										})
									}
								/>
							</label>

							<label className="block mb-4">
								Club
								<Select
									options={clubsData?.map((club: Club) => ({
										value: club._id,
										label: club.name,
									}))}
									onChange={(selectedOption: any) =>
										setNewPlayer((prev) => ({
											...prev,
											teamId: selectedOption?.value || "",
										}))
									}
									isLoading={isFetchingClubs}
								/>
							</label>

							<div className="flex justify-end">
								<button
									type="button"
									onClick={() => setIsModalOpen(false)}
									className="mr-2 bg-gray-300 text-black px-4 py-2 rounded"
								>
									Cancel
								</button>
								<button
									type="button"
									onClick={handleAddPlayer}
									className={`px-4 py-2 rounded ${
										isLoading
											? "bg-gray-400"
											: "bg-blue-500 text-white"
									}`}
									disabled={isLoading}
								>
									{isLoading ? "Adding..." : "Add Player"}
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default PlayerPage;
