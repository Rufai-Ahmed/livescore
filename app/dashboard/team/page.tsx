"use client";
import React, { useState } from "react";
import Select from "react-select";
import {
	useGetPlayersQuery,
	useAddPlayerToTeamMutation,
	useGetTeamsQuery,
	useCreateTeamMutation, // Assuming you have a mutation to add teams
} from "@/public/utils/authApi";

const TeamsPage: React.FC = () => {
	const {
		data: teams,
		error,
		isLoading: teamsLoading,
	} = useGetTeamsQuery();
	const { data: players, isLoading: playersLoading } =
		useGetPlayersQuery();
	const [addPlayerToTeam] = useAddPlayerToTeamMutation();
	const [addTeam] = useCreateTeamMutation(); // Hook for adding a team
	const [selectedPlayers, setSelectedPlayers] = useState<any[]>([]);
	const [showAddPlayerModal, setShowAddPlayerModal] =
		useState<boolean>(false);
	const [showAddTeamModal, setShowAddTeamModal] =
		useState<boolean>(false);
	const [showAllPlayersModal, setShowAllPlayersModal] =
		useState<boolean>(false);
	const [newTeamName, setNewTeamName] = useState<string>("");
	const [newTeamLogo, setNewTeamLogo] = useState<string>("");
	const [teamId, setTeamId] = useState<string | null>(null);

	if (teamsLoading || playersLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading data</div>;

	// Get player IDs of a specific team
	const getTeamPlayerIds = (teamId: string) => {
		const team = teams?.find((team: any) => team._id === teamId);
		return team?.players?.map((player: any) => player._id) || [];
	};

	// Filter out players already in the team
	const playerOptions =
		players
			?.filter(
				(player: any) =>
					!getTeamPlayerIds(teamId || "").includes(player._id)
			)
			.map((player: any) => ({
				value: player._id,
				label: player.username,
			})) || [];

	const handleAddPlayers = async () => {
		if (teamId) {
			try {
				for (const player of selectedPlayers) {
					await addPlayerToTeam({
						teamId,
						playerId: player.value,
					}).unwrap();
				}
				setSelectedPlayers([]);
				setShowAddPlayerModal(false);
			} catch (err) {
				console.error("Failed to add players to team", err);
			}
		}
	};

	const handleShowAllPlayers = () => {
		setShowAllPlayersModal(true);
	};

	console.log(teams);

	const handleAddTeam = async () => {
		try {
			await addTeam({
				name: newTeamName,
				logo: newTeamLogo,
			}).unwrap();
			setNewTeamName("");
			setNewTeamLogo("");
			setShowAddTeamModal(false);
		} catch (err) {
			console.error("Failed to add team", err);
		}
	};

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Teams</h1>
			<button
				onClick={() => setShowAddTeamModal(true)}
				className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 mb-4"
			>
				Add Team
			</button>
			<table className="min-w-full divide-y divide-gray-200">
				<thead>
					<tr>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Logo
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Name
						</th>
						<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							Actions
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{teams?.map((team: any) => (
						<tr key={team._id}>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
								<img
									src={team?.logo} // Assuming logoUrl is the field for the logo URL
									alt={`${team.name} logo`}
									className="w-12 h-12 object-cover rounded"
								/>
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
								{team.name}
							</td>
							<td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
								<button
									onClick={() => {
										setTeamId(team._id);
										setShowAddPlayerModal(true);
									}}
									className="text-green-600 hover:text-green-900 bg-white px-2 py-1 rounded"
								>
									Add Player
								</button>
								<button
									onClick={() => {
										setTeamId(team._id);

										handleShowAllPlayers();
									}}
									className="ml-2 text-blue-600 hover:text-blue-900 bg-white px-2 py-1 rounded"
								>
									View All Players
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
			{showAddTeamModal && (
				<div className="fixed right-0 inset-0 pr-14 flex items-center justify-end bg-gray-800 bg-opacity-50">
					<div className="bg-white p-6 rounded shadow-lg">
						<h2 className="text-xl font-bold mb-4">Add Team</h2>
						<input
							type="text"
							placeholder="Team Name"
							value={newTeamName}
							onChange={(e) => setNewTeamName(e.target.value)}
							className="mb-4 p-2 border rounded w-full"
						/>
						<input
							type="text"
							placeholder="Logo URL"
							value={newTeamLogo}
							onChange={(e) => setNewTeamLogo(e.target.value)}
							className="mb-4 p-2 border rounded w-full"
						/>
						<button
							onClick={handleAddTeam}
							className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
						>
							Add Team
						</button>
						<button
							onClick={() => setShowAddTeamModal(false)}
							className="ml-2 bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
						>
							Cancel
						</button>
					</div>
				</div>
			)}
			{showAddPlayerModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
					<div className="bg-white p-6 rounded shadow-lg">
						<h2 className="text-xl font-bold mb-4">
							Add Players to Team
						</h2>
						<Select
							isMulti
							options={playerOptions}
							value={selectedPlayers}
							onChange={(selectedOptions: any) =>
								setSelectedPlayers(selectedOptions || [])
							}
							className="mb-4"
						/>
						<button
							onClick={handleAddPlayers}
							className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
						>
							Add Players
						</button>
						<button
							onClick={() => setShowAddPlayerModal(false)}
							className="ml-2 bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
						>
							Cancel
						</button>
					</div>
				</div>
			)}
			{showAllPlayersModal && (
				<div className="w-full flex justify-end">
					<div className="fixed inset-0 flex right-0 items-center justify-center bg-gray-800 bg-opacity-50">
						<div className="bg-white p-6 rounded shadow-lg">
							<h2 className="text-xl font-bold mb-4">All Players</h2>
							<table className="min-w-full divide-y divide-gray-200">
								<thead>
									<tr>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Name
										</th>
										<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
											Phone Number
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{players
										?.filter((el: any) => el?.club?._id === teamId)
										.map((player: any) => (
											<tr key={player._id}>
												<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
													{player.username}
												</td>
												<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
													{player.phoneNumber || "N/A"}
												</td>
											</tr>
										))}
								</tbody>
							</table>
							<button
								onClick={() => setShowAllPlayersModal(false)}
								className="mt-4 bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default TeamsPage;
