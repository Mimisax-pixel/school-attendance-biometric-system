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
import { useAdminDashboard } from "../hooks/useAdminDashboard"; // your custom hook





const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // Fetch live admin dashboard data
  const { data, isLoading, isError } = useAdminDashboard();

  if (isLoading) {
    return (
      <div className="flex bg-gray-50 min-h-screen overflow-x-hidden w-full">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <p className="p-6 text-gray-500">Loading dashboard...</p>
      </div>
    );
        
  }
  if (isError)
    return <p className="p-6 text-red-500">Failed to load dashboard data.</p>;

  // Extract data from API
  const totalStudents = data.totalStudents || 0;
  const totalLecturers = data.totalLecturers || 0;
  const totalCourses = data.totalCourses || 0;

  // Calculate average attendance across levels
  const totalAttendance =
    data.totalAttendaceRecordsAverage?.reduce(
      (acc, item) => acc + item.average,
      0
    ) / (data.totalAttendaceRecordsAverage?.length || 1) || 0;

  const attendanceData =
    data.totalAttendaceRecordsAverage?.map((item) => ({
      level: item.level,
      attendance: item.average,
    })) || [];

  return (
    <div className="flex bg-gray-50 min-h-screen overflow-x-hidden w-full">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      <div
        className={`flex-1 transition-all duration-300 w-full ${
          sidebarOpen ? "" : "ml-0 "
        }`}
      >
        {/* Mobile Navbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-white shadow-md lg:hidden sticky top-0 z-40 w-full">
          <h1 className="text-lg sm:text-xl font-bold text-[#0A496D]">
            Admin Dashboard 
          </h1>
        </div>

        <div className="w-full px-3 sm:px-5 md:px-8 lg:px-10 py-8 sm:py-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-[#0A496D] hidden lg:block">
            Admin Dashboard 
          </h2>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full mb-10">
            {[
              { label: "Total Students", value: totalStudents },
              { label: "Teachers", value: totalLecturers },
              { label: "Courses", value: totalCourses },
              { label: "Attendance", value: `${totalAttendance.toFixed(1)}%` },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white w-full p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col justify-center items-start"
              >
                <h3 className="font-semibold text-gray-500 text-sm sm:text-base">
                  {stat.label}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-[#0A496D] mt-2">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="w-full space-y-6">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#0A496D]">
              Attendance by Level
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 w-full">
              {/* Bar Chart */}
              <div className="bg-white w-full p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <div className="h-64 sm:h-72 md:h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attendanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis dataKey="level" stroke="#6B7280" />
                      <YAxis stroke="#6B7280" />
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
