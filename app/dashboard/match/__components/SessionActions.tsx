"use client";
import {
  useStartSessionMutation,
  useEndSessionMutation,
} from "@/public/utils/authApi";

interface SessionActionsProps {
  sessionId: string;
  isActive: boolean;
}

const SessionActions: React.FC<SessionActionsProps> = ({
  sessionId,
  isActive,
}) => {
  const [startSession] = useStartSessionMutation();
  const [endSession] = useEndSessionMutation();

  const handleStart = async () => {
    await startSession(sessionId);
  };

  const handleEnd = async () => {
    await endSession(sessionId);
  };

  return (
    <div className="flex items-center text-[16px] gap-2 my-2">
      {!isActive && (
        <button
          onClick={handleStart}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start
        </button>
      )}
      {isActive && (
        <button
          onClick={handleEnd}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          End
        </button>
      )}
    </div>
  );
};

export default SessionActions;
