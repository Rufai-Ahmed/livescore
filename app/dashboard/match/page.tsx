"use client";
import React, { useState, useEffect } from "react";
import {
	useCreateSessionMutation,
	useGetSessionsQuery,
	useAddTeamToSessionMutation,
	useRemoveTeamFromSessionMutation,
	useGetTeamsQuery,
} from "@/public/utils/authApi";
import Modal from "./__components/TeamModal"; // Make sure you have a modal component

const SessionManager: React.FC = () => {
	const { data: sessions, refetch } = useGetSessionsQuery();
	const { data: teams } = useGetTeamsQuery();
	const [createSession] = useCreateSessionMutation();
	const [addTeamToSession] = useAddTeamToSessionMutation();
	const [removeTeamFromSession] = useRemoveTeamFromSessionMutation();

	const [showModal, setShowModal] = useState<boolean>(false);
	const [sessionType, setSessionType] = useState<string>("morning");
	const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
	const [selectedSessionId, setSelectedSessionId] = useState<
		string | null
	>(null);

	const handleCreateSession = async () => {
		const now = new Date();
		let startTime: Date;
		let endTime: Date;

		switch (sessionType) {
			case "morning":
				startTime = new Date(now.setHours(7, 0, 0, 0));
				endTime = new Date(now.setHours(12, 0, 0, 0));
				break;
			case "afternoon":
				startTime = new Date(now.setHours(13, 0, 0, 0));
				endTime = new Date(now.setHours(16, 0, 0, 0));
				break;
			case "evening":
				startTime = new Date(now.setHours(17, 0, 0, 0));
				endTime = new Date(now.setHours(22, 0, 0, 0));
				break;
			default:
				startTime = new Date();
				endTime = new Date(startTime.getTime() + 3600000); // Default to 1 hour later
		}

		const response = await createSession({
			type: sessionType,
			startTime: startTime.toISOString(),
			endTime: endTime.toISOString(),
			teams: selectedTeams,
		});

		if (response.data) {
			setSelectedSessionId(response.data?._id);
		}
	};
	console.log(sessions);

	const handleAddTeams = async () => {
		handleCreateSession();
		if (selectedSessionId) {
			await Promise.all(
				selectedTeams.map((teamId) =>
					addTeamToSession({ _id: selectedSessionId, teamId })
				)
			);
			setShowModal(false);
			refetch(); // Refresh session data
		}
	};

	const handleRemoveTeam = async (
		sessionId: string,
		teamId: string
	) => {
		await removeTeamFromSession({ id: sessionId, teamId });
		refetch(); // Refresh session data
	};

	const pairTeams = (teams: any[]): { team1: any; team2: any }[] => {
		const pairedTeams: { team1: any; team2: any }[] = [];
		for (let i = 0; i < teams.length; i += 2) {
			if (i + 1 < teams.length) {
				pairedTeams.push({ team1: teams[i], team2: teams[i + 1] });
			} else {
				pairedTeams.push({ team1: teams[i], team2: null }); // Handle odd number of teams
			}
		}
		return pairedTeams;
	};
	const sortSessions = (sessions: any[]) => {
		const typeOrder: { [key: string]: number } = {
			morning: 1,
			afternoon: 2,
			evening: 3,
		};

		// Create a new array to avoid mutating the original array
		return [...(sessions || [])].sort(
			(a, b) => typeOrder[a.type] - typeOrder[b.type]
		);
	};

	return (
		<div className="p-6 space-y-6">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<button
					onClick={() => {
						setSessionType("morning");
						setShowModal(true);
					}}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					Add Morning Session
				</button>
				<button
					onClick={() => {
						setSessionType("afternoon");
						setShowModal(true);
					}}
					className="bg-green-500 text-white px-4 py-2 rounded"
				>
					Add Afternoon Session
				</button>
				<button
					onClick={() => {
						setSessionType("evening");
						setShowModal(true);
					}}
					className="bg-red-500 text-white px-4 py-2 rounded"
				>
					Add Evening Session
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{sortSessions(sessions || []).map((session: any) => (
					<div
						key={session._id}
						className="p-4 bg-gray-100 rounded"
					>
						<h2 className="text-xl font-bold">{session.name}</h2>
						<p>
							Start Time:{" "}
							{new Date(session.startTime).toLocaleTimeString()}
						</p>
						<p>
							End Time:{" "}
							{new Date(session.endTime).toLocaleTimeString()}
						</p>
						<p>Status: {session.isActive ? "Active" : "Inactive"}</p>
						<p>
							Teams: <br />
							{pairTeams(session.teams).map(
								(pair: any, index: number) => (
									<div key={index}>
										{pair.team1 && <span>{pair.team1.name}</span>}
										{pair.team2 && <span> vs {pair.team2.name}</span>}
									</div>
								)
							)}
						</p>
						{session.isActive && (
							<button
								onClick={() =>
									handleRemoveTeam(session._id, "team-id")
								} // Replace 'team-id' with actual team ID
								className="bg-red-500 text-white px-4 py-2 rounded"
							>
								Remove Team
							</button>
						)}
					</div>
				))}
			</div>

			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<h2 className="text-lg font-bold">
						Select Teams for {sessionType} Session
					</h2>
					<div>
						{teams?.map((team: any) => (
							<div key={team._id}>
								<input
									type="checkbox"
									id={team._id}
									onChange={(e) => {
										const teamId = e.target.id;
										setSelectedTeams((prev) =>
											e.target.checked
												? [...prev, teamId]
												: prev.filter((id) => id !== teamId)
										);
									}}
								/>
								<label htmlFor={team._id}>{team.name}</label>
							</div>
						))}
					</div>
					<button
						onClick={handleAddTeams}
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Add Teams
					</button>
				</Modal>
			)}
		</div>
	);
};

export default SessionManager;
