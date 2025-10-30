import React, { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";

const StudentsAttendance = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const students = [
    {
      name: "Sophia Clark",
      id: "2021001",
      course: "Computer Science",
      rate: "85%",
      date: "2024-03-15 08:00",
    },
    {
      name: "Ethan Miller",
      id: "2021002",
      course: "Electrical Engineering",
      rate: "92%",
      date: "2024-03-15 08:45",
    },
    {
      name: "Olivia Davis",
      id: "2021003",
      course: "Mechanical Engineering",
      rate: "78%",
      date: "2024-03-15 09:15",
    },
    {
      name: "Liam Wilson",
      id: "2021004",
      course: "Civil Engineering",
      rate: "90%",
      date: "2024-03-15 08:30",
    },
    {
      name: "Ava Martinez",
      id: "2021005",
      course: "Chemical Engineering",
      rate: "88%",
      date: "2024-03-15 09:05",
    },
    {
      name: "Noah Anderson",
      id: "2021006",
      course: "Biomedical Engineering",
      rate: "82%",
      date: "2024-03-15 08:50",
    },
    {
      name: "Isabella Thomas",
      id: "2021007",
      course: "Aerospace Engineering",
      rate: "95%",
      date: "2024-03-15 08:20",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Header */}
      <header className="bg-white shadow px-4 sm:px-6 md:px-10 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded"></div>
          <span className="font-bold text-lg sm:text-xl">EduTrack</span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-sm text-gray-600">
          <a href="/adminDashboard" className="hover:text-black">
            Dashboard
          </a>
          <a href="#" className="text-blue-600 font-medium">
            Attendance
          </a>
          <a href="/administrativeLog" className="hover:text-black">
            Performance
          </a>
          <a href="#" className="hover:text-black">
            Reports
          </a>
        </nav>

        {/* Right Icons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600">
            <i className="far fa-bell"></i>
          </button>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-inner px-6 py-4 space-y-3 text-gray-700">
          <a href="/adminDashboard" className="block hover:text-black">
            Dashboard
          </a>
          <a href="#" className="block text-blue-600 font-medium">
            Attendance
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
      <main className="p-4 sm:p-6 md:p-10">
        <h1 className="text-xl sm:text-2xl font-semibold mb-6">
          Biometric Attendance
        </h1>

        {/* Filter/Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-3 sm:space-y-0">
          <input
            className="flex-1 border rounded px-3 py-2 text-sm w-full"
            placeholder="Search by student name or ID..."
          />
          <select className="border rounded px-3 py-2 text-sm w-full sm:w-auto">
            <option>All Date Ranges</option>
          </select>
          <select className="border rounded px-3 py-2 text-sm w-full sm:w-auto">
            <option>All Courses</option>
          </select>
          <select className="border rounded px-3 py-2 text-sm w-full sm:w-auto">
            <option>All Students</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm w-full sm:w-auto">
            Export Report
          </button>
        </div>

        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow text-sm">
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
                <tr key={i} className="border-b last:border-0">
                  <td className="p-4">{s.name}</td>
                  <td className="p-4">{s.id}</td>
                  <td className="p-4">{s.course}</td>
                  <td className="p-4 flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-blue-600 rounded"
                        style={{ width: s.rate }}
                      ></div>
                    </div>
                    <span>{s.rate}</span>
                  </td>
                  <td className="p-4">{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Collapsible View */}
        <div className="md:hidden space-y-4">
          {students.map((s, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setExpanded(expanded === i ? null : i)}
              >
                <h3 className="font-semibold">{s.name}</h3>
                {expanded === i ? (
                  <ChevronUp size={18} className="text-gray-500" />
                ) : (
                  <ChevronDown size={18} className="text-gray-500" />
                )}
              </div>

              {expanded === i && (
                <div className="mt-3 text-sm text-gray-700 space-y-2">
                  <p>
                    <span className="font-semibold">ID:</span> {s.id}
                  </p>
                  <p>
                    <span className="font-semibold">Course:</span> {s.course}
                  </p>
                  <p className="flex items-center space-x-2">
                    <span className="font-semibold">Attendance:</span>
                    <div className="w-20 h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-blue-600 rounded"
                        style={{ width: s.rate }}
                      ></div>
                    </div>
                    <span>{s.rate}</span>
                  </p>
                  <p>
                    <span className="font-semibold">Last Check-In:</span>{" "}
                    {s.date}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 mt-4 gap-2 sm:gap-0">
          <span>Showing 1 to 7 of 25 entries</span>
          <div className="space-x-2">
            <button className="px-2 py-1 border rounded">Previous</button>
            <button className="px-2 py-1 border rounded">Next</button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-500 py-8 px-4">
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
        <p>© 2024 EduTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default StudentsAttendance;
