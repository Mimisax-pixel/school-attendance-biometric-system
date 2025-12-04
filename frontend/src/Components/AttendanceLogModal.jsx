import React, { useState, useEffect } from "react";
import { X, Download, Loader } from "lucide-react";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export default function AttendanceLogModal({
  sessionId,
  sessionData,
  onClose,
}) {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAttendanceLog();
  }, [sessionId]);

  const fetchAttendanceLog = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/session/${sessionId}/attendance-log`);

      if (res.status === 200 && res.data.status === "success") {
        setAttendanceData(res.data.data);
      } else {
        toast.error("Failed to fetch attendance log");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || error.message;
      toast.error("Error fetching attendance log: " + msg);
    } finally {
      setLoading(false);
    }
  };

  // Filter attendance records based on search term
  const filteredAttendance =
    attendanceData?.attendance?.filter(
      (record) =>
        record.studentDetails?.fullname
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.studentDetails?.matricNumber
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        record.studentDetails?.email
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
    ) || [];

  // Download as CSV
  const downloadCSV = () => {
    if (!attendanceData?.attendance) {
      toast.error("No attendance data to download");
      return;
    }

    const headers = [
      "Student Name",
      "Matric Number",
      "Email",
      "Department",
      "Check-in Time",
    ];
    const rows = attendanceData.attendance.map((record) => [
      record.studentDetails?.fullname || "N/A",
      record.studentDetails?.matricNumber || "N/A",
      record.studentDetails?.email || "N/A",
      record.studentDetails?.department || "N/A",
      new Date(record.timestamp).toLocaleString(),
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance-${
      attendanceData.classSession.courseCode
    }-${new Date().getTime()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success("Attendance log downloaded successfully");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[rgba(0,0,255,0.05)] bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Attendance Log</h2>
            <p className="text-sm text-gray-600 mt-1">
              {attendanceData?.classSession?.courseTitle || "Course"}
              {" ("}
              {attendanceData?.classSession?.courseCode || ""}
              {")"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="flex flex-col items-center gap-3">
                <Loader size={32} className="text-blue-600 animate-spin" />
                <p className="text-gray-600">Loading attendance log...</p>
              </div>
            </div>
          ) : attendanceData?.attendance?.length === 0 ? (
            <div className="flex items-center justify-center h-64">
              <p className="text-gray-500 text-lg">
                No attendance records found for this session
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Session Summary */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Present</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {attendanceData?.totalPresent || 0}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Department</p>
                  <p className="text-lg font-semibold text-green-600">
                    {attendanceData?.classSession?.department || "N/A"}
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Level</p>
                  <p className="text-lg font-semibold text-purple-600">
                    {attendanceData?.classSession?.level || "N/A"}
                  </p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Session Date</p>
                  <p className="text-xs font-semibold text-orange-600">
                    {new Date(
                      attendanceData?.classSession?.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search by name, matric number, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Attendance Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-100 border-b border-gray-200">
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        #
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Student Name
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Matric Number
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Department
                      </th>
                      <th className="px-4 py-3 text-left font-semibold text-gray-700">
                        Check-in Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAttendance.map((record, index) => (
                      <tr
                        key={record._id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="px-4 py-3 text-gray-700 font-medium">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 text-gray-700 font-medium">
                          {record.studentDetails?.fullname || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {record.studentDetails?.matricNumber || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {record.studentDetails?.email || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {record.studentDetails?.department || "N/A"}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {new Date(record.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Search result info */}
              {searchTerm && (
                <p className="text-sm text-gray-600 mt-4">
                  Showing {filteredAttendance.length} of{" "}
                  {attendanceData?.attendance?.length || 0} records
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={downloadCSV}
            disabled={!attendanceData?.attendance?.length}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Download size={18} />
            Download as CSV
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
