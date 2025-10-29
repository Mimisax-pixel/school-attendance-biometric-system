import React, { useState } from "react";
import Sidebar from "./Sidebar";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const gradeData = [
    { month: "Jan", grade: 3.2 },
    { month: "Feb", grade: 3.4 },
    { month: "Mar", grade: 3.6 },
    { month: "Apr", grade: 3.7 },
    { month: "May", grade: 3.8 },
    { month: "Jun", grade: 3.9 },
  ];

  const attendanceData = [
    { department: "CS", attendance: 95 },
    { department: "EE", attendance: 88 },
    { department: "ME", attendance: 90 },
    { department: "CE", attendance: 85 },
    { department: "CHE", attendance: 92 },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          sidebarOpen ? "ml-64" : "ml-0 lg:ml-64"
        }`}
      >
        {/* Top Bar (Mobile) */}
        <div className="flex items-center justify-between px-4 py-4 bg-white shadow-md lg:hidden">
          <button onClick={toggleSidebar}>
            <Menu size={24} className="text-[#0A496D]" />
          </button>
          <h1 className="text-xl font-bold text-[#0A496D]">Admin Dashboard</h1>
        </div>

        {/* Main Dashboard */}
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 py-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-[#0A496D] hidden lg:block">
            Admin Dashboard
          </h2>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[
              { label: "Total Students", value: "1,200" },
              { label: "Teachers", value: "150" },
              { label: "Courses", value: "300" },
              { label: "Attendance", value: "90%" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-gray-500 text-base sm:text-lg">
                  {stat.label}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-[#0A496D] mt-2">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Performance Charts */}
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0A496D]">
              Performance Trends
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Line Chart */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-semibold mb-4 text-gray-700 text-sm sm:text-base">
                  Average Grade Over Time
                </h3>
                <div className="h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={gradeData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="month" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" domain={[3.0, 4.0]} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="grade"
                        stroke="#0A496D"
                        strokeWidth={3}
                        dot={{ fill: "#0A496D" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-semibold mb-4 text-gray-700 text-sm sm:text-base">
                  Attendance by Department
                </h3>
                <div className="h-64 sm:h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="department" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" domain={[80, 100]} />
                      <Tooltip />
                      <Bar
                        dataKey="attendance"
                        fill="#1173D4"
                        radius={[8, 8, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
