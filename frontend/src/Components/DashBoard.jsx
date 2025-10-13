import React from "react";

const Dashboard = () => {
  return (
    <div className="ml-[300px] p-6 bg-gray-50 flex-1 overflow-auto pt-10">
      <h2 className="text-4xl font-bold mb-6">Admin Dashboard</h2>

      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-500 text-xl">
            Total Students
          </h3>
          <p className="text-2xl font-bold text-[#0A496D]">1,200</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-500 text-xl">Teachers</h3>
          <p className="text-2xl font-bold text-[#0A496D]">150</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-500 text-xl">Courses</h3>
          <p className="text-2xl font-bold text-[#0A496D]">300</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="font-semibold text-gray-500 text-xl">Attendance</h3>
          <p className="text-2xl font-bold text-[#0A496D]">90%</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <h3 className="text-2xl font-bold my-4">Performance Trends</h3>
        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="font-semibold mb-4">Average grade over time </h3>
          <div className="h-64  rounded">
            {/* Placeholder for Chart */}
            Chart Placeholder
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-md">
          <h3 className="font-semibold mb-4">Attendance by Department</h3>
          <p className="text-gray-500">Chart or list placeholder...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
