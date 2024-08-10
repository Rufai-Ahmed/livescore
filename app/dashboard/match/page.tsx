"use client";
import React, { useState } from "react";
import {
  useCreateSessionMutation,
  useGetSessionsQuery,
  useAddTeamToSessionMutation,
  useRemoveTeamFromSessionMutation,
  useGetTeamsQuery,
} from "@/public/utils/authApi";
import Modal from "./__components/TeamModal";
import SortSessions from "./__components/SortSessions";
import SessionActions from "./__components/SessionActions";

const SessionManager: React.FC = () => {
  const { data: sessions, refetch, isLoading } = useGetSessionsQuery();
  const { data: teams } = useGetTeamsQuery();
  const [createSession] = useCreateSessionMutation();
  const [addTeamToSession] = useAddTeamToSessionMutation();
  const [removeTeamFromSession] = useRemoveTeamFromSessionMutation();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [sessionType, setSessionType] = useState<string>("morning");
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null
  );

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

  const handleRemoveTeam = async (sessionId: string, teamId: string) => {
    await removeTeamFromSession({ id: sessionId, teamId });
    refetch(); // Refresh session data
  };

  if (isLoading) return <div>Loading...</div>;

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

      <SortSessions sessions={sessions || []} />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2 className="text-lg font-bold">
            Select Teams for {sessionType} Session
          </h2>
          <div>
            {teams?.map((team: any) => (
              <div key={team._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={selectedTeams.includes(team._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedTeams([...selectedTeams, team._id]);
                    } else {
                      setSelectedTeams(
                        selectedTeams.filter((id) => id !== team._id)
                      );
                    }
                  }}
                />
                <label className="ml-2">{team.name}</label>
              </div>
            ))}
            <button
              onClick={handleAddTeams}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Teams
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default SessionManager;
