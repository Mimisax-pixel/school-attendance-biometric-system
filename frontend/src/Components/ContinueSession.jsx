import React, { useState, useEffect } from "react";
import api from "../api/axiosInstance.js";
import toast from "react-hot-toast";

const ContinueSession = ({ onSessionSelected, onBack }) => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const response = await api.get("/session/lecturer-sessions");
      setSessions(response.data.data || []);
      if (response.data.data && response.data.data.length > 0) {
        toast.success(`Found ${response.data.data.length} previous session(s)`);
      } else {
        toast.error("No previous sessions found");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch sessions");
    } finally {
      setLoading(false);
    }
  };

  const handleContinueSession = () => {
    if (!selectedSession) {
      toast.error("Please select a session");
      return;
    }

    const session = sessions.find((s) => s._id === selectedSession);
    if (session) {
      const sessionData = {
        sessionId: session._id,
        courseTitle: session.courseTitle,
        courseCode: session.courseCode,
        instructorName: session.instructorName,
        createdAt: session.createdAt,
        ...session,
      };
      onSessionSelected(sessionData);
      toast.success("Session loaded successfully");
    }
  };

  return (
    <section className="bg-white border border-gray-200/40 rounded-xl p-5 sm:p-6 w-full shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">
        Continue Previous Session
      </h2>

      {loading ? (
        <div className="text-center py-6">
          <p className="text-gray-600">Loading sessions...</p>
        </div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-600 mb-4">No previous sessions available</p>
          <button
            className="w-full text-blue-700 font-medium py-2 rounded-md hover:bg-blue-100 transition-colors text-sm underline"
            onClick={onBack}
          >
            Back to Start New Session
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <label className="block text-sm text-gray-600">
            Select a previous session
          </label>
          <select
            className="w-full rounded-md border border-gray-200/50 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
          >
            <option value="">Select a session</option>
            {sessions.map((session) => (
              <option key={session._id} value={session._id}>
                {session.courseTitle} ({session.courseCode}) -{" "}
                {new Date(session.createdAt).toLocaleString()}
              </option>
            ))}
          </select>

          <div className="flex gap-3 mt-4">
            <button
              className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 active:scale-98 transition-transform text-sm"
              onClick={handleContinueSession}
            >
              Continue Session
            </button>
            <button
              className="flex-1 text-blue-700 font-medium py-3 rounded-md hover:bg-gray-100 transition-colors text-sm border border-blue-700"
              onClick={onBack}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContinueSession;
