import React, { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { useAttendance } from "../hooks/useAttendance";
import { useDepartments } from "../hooks/useDepartments";
import Navbar from "./Layouts/Navbar";
import { useNavigate } from "react-router-dom";
import { is } from "zod/v4/locales";

const StudentsAttendance = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  let navigate = useNavigate();
  const limit = 20;

  // Determine if search looks like a matric/studentId (simple heuristic)
  const studentId =
    searchQuery && searchQuery.includes("/") ? searchQuery : undefined;

  const { data, isLoading, error } = useAttendance({
    page,
    limit,
    q: searchQuery,
    department,
    level,
    studentId,
  });

  const { departments, isLoading: deptsLoading } = useDepartments();

  // if (isLoading)
  // return <p className="text-center mt-10">Loading attendance...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load attendance
      </p>
    );

  let students = data?.results || [];

  // If backend doesn't support name search, apply client-side name filter as fallback
  if (searchQuery && !studentId) {
    const q = searchQuery.toLowerCase();
    students = students.filter(
      (s) =>
        (s.fullname || "").toLowerCase().includes(q) ||
        (s.matricNumber || "").toLowerCase().includes(q)
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 font-sans overflow-x-hidden">
      {/* Header */}
      <Navbar Title={"Student Records"}></Navbar>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-inner px-6 py-4 space-y-3 text-gray-700">
          <a href="/admin/dashboard" className="block hover:text-black">
            Dashboard
          </a>
          <a href="/admin/students" className="block text-blue-600 font-medium">
            Studenta
          </a>
          <a href="/administrativeLog" className="block hover:text-black">
            Performance
          </a>
          <a href="#" className="block hover:text-black">
            Reports
          </a>
        </nav>
      )}

      {/* Main */}
      <main className="w-full px-4 sm:px-6 md:px-10 lg:px-16 py-8">
        <h1 className="text-lg font-semibold mb-6 text-gray-800">
          Students Academic and Attendance records
        </h1>

        {/* Filter/Search */}
        <div className="w-full bg-white p-4 rounded-xl shadow flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
          <input
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 w-full"
            placeholder="Search by student name or ID..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(0); // reset to page 0 on search change
            }}
          />
          <select
            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setPage(0);
            }}
          >
            <option value="">All Departments</option>
            {departments.map((d) => (
              <option key={d._id || d.title} value={d.title}>
                {d.title}
              </option>
            ))}
          </select>
          <select
            className="border rounded-lg px-3 py-2 text-sm w-full sm:w-auto"
            value={level}
            onChange={(e) => {
              setLevel(e.target.value);
              setPage(0);
            }}
          >
            <option value="">All Levels</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
          </select>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm w-full sm:w-auto hover:bg-blue-700 transition"
            onClick={() => navigate("/admin/dashboard/student/register")}
          >
            Register new Student
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block w-full mt-6 overflow-x-auto">
          {isLoading && (
            <p className="text-center my-6">Loading attendance...</p>
          )}
          {isLoading == false && (
            <table className="min-w-full bg-white rounded-xl shadow text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="p-4">STUDENT NAME</th>
                  <th className="p-4">STUDENT ID</th>
                  <th className="p-4">COURSE</th>
                  <th className="p-4">ATTENDANCE RATE</th>
                  <th className="p-4">LAST CHECK-IN</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr
                    key={i}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="p-4">{s.fullname}</td>
                    <td className="p-4">{s.matricNumber}</td>
                    <td className="p-4">{s.department}</td>
                    <td className="p-4 flex items-center space-x-2">
                      <div className="w-24 h-2 bg-gray-200 rounded">
                        <div
                          className="h-2 bg-blue-600 rounded"
                          style={{ width: `${s.rateOfClassesAttended}%` }}
                        ></div>
                      </div>
                      <span>{s.rateOfClassesAttended}%</span>
                    </td>
                    <td className="p-4">{s.lastCheckIn || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Mobile Collapsible View */}
        <div className="md:hidden space-y-4 mt-6">
          {students.map((s, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <h3 className="font-semibold text-gray-800">{s.fullname}</h3>
                {expanded === i ? (
                  <ChevronUp size={18} className="text-gray-500" />
                ) : (
                  <ChevronDown size={18} className="text-gray-500" />
                )}
              </div>
              {expanded === i && (
                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <p>
                    <span className="font-semibold">ID:</span> {s.matricNumber}
                  </p>
                  <p>
                    <span className="font-semibold">Course:</span>{" "}
                    {s.department}
                  </p>
                  <p className="flex items-center space-x-2">
                    <span className="font-semibold">Attendance:</span>
                    <div className="w-20 h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-blue-600 rounded"
                        style={{ width: `${s.rateOfClassesAttended}%` }}
                      ></div>
                    </div>
                    <span>{s.rateOfClassesAttended}%</span>
                  </p>
                  <p>
                    <span className="font-semibold">Last Check-In:</span>{" "}
                    {s.lastCheckIn || "N/A"}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 mt-6 gap-2 sm:gap-0">
          <span>
            Showing {students.length} of {data?.total || 0} entries
          </span>
          <div className="space-x-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              className="px-2 py-1 border rounded hover:bg-gray-100"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-2 py-1 border rounded hover:bg-gray-100"
            >
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-gray-500 py-8 px-4 border-t mt-10">
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 mb-2">
          <a href="#" className="hover:text-blue-600">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-600">
            Terms of Service
          </a>
          <a href="#" className="hover:text-blue-600">
            Contact Us
          </a>
        </div>
        <p>Â© 2024 EduTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StudentsAttendance;
