"use client";
import {
  useGetSessionsQuery,
  useStartSessionMutation,
} from "@/public/utils/authApi";
import React from "react";

interface Session {
  _id: string;
  name: string;
  startTime: string;
  endTime: string;
  isActive: boolean;
  type: string;
  teams: any[];
}

interface SortSessionsProps {
  sessions: Session[];
}

const SortSessions: React.FC<SortSessionsProps> = ({ sessions }) => {
  const [startSession] = useStartSessionMutation();
  const { refetch } = useGetSessionsQuery();
  const typeOrder: { [key: string]: number } = {
    morning: 1,
    afternoon: 2,
    evening: 3,
  };

  // Sort sessions by type
  const sortedSessions = [...sessions].sort(
    (a, b) => typeOrder[a.type] - typeOrder[b.type]
  );

  // Group sessions by type
  const groupedSessions = sortedSessions.reduce(
    (acc: { [key: string]: Session[] }, session) => {
      if (!acc[session.type]) {
        acc[session.type] = [];
      }
      acc[session.type].push(session);
      return acc;
    },
    {}
  );

  const handleStartSession = async (id: string) => await startSession(id);
  const handleStopSession = async (id: string) => await startSession(id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.keys(groupedSessions).map((type) => (
        <div key={type}>
          {groupedSessions[type].map((session) => (
            <div key={session._id} className="p-4 bg-gray-100 rounded">
              <h2 className="text-xl font-bold">{session.name}</h2>
              <p>
                Start Time: {new Date(session.startTime).toLocaleTimeString()}
              </p>
              <p>End Time: {new Date(session.endTime).toLocaleTimeString()}</p>
              <p>Status: {session.isActive ? "Active" : "Inactive"}</p>

              <div className="flex items-center text-[16px] gap-2 my-2">
                <button
                  onClick={() => {
                    handleStartSession(session?._id);
                    refetch();
                  }}
                  disabled={session?.isActive}
                  className={` text-white px-4 py-2 rounded ${
                    session?.isActive ? "disabled" : "bg-green-500"
                  }`}
                >
                  Start
                </button>

                <button
                  onClick={() => {
                    handleStopSession(session?._id);
                    refetch();
                  }}
                  disabled={!session?.isActive}
                  className={` text-white px-4 py-2 rounded ${
                    !session?.isActive ? "disabled" : "bg-red-500"
                  }`}
                >
                  Stop
                </button>
              </div>

              <p>
                Teams: <br />
                {pairTeams(session.teams).map((pair, index) => (
                  <div key={index}>
                    {pair.team1 && <span>{pair.team1.name}</span>}
                    {pair.team2 && <span> vs {pair.team2.name}</span>}
                  </div>
                ))}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const pairTeams = (teams: any[]): { team1: any; team2: any }[] => {
  const pairedTeams: { team1: any; team2: any }[] = [];
  for (let i = 0; i < teams.length; i += 2) {
    if (i + 1 < teams.length) {
      pairedTeams.push({ team1: teams[i], team2: teams[i + 1] });
    } else {
      pairedTeams.push({ team1: teams[i], team2: null });
    }
  }
  return pairedTeams;
};

export default SortSessions;
