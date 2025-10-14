import React from "react";
import { Link } from "react-router-dom";
import {
  BarChart2,
  BookOpen,
  Building2,
  CalendarCheck,
  LayoutDashboard,
  SearchCheckIcon,
  Users,
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-[300px] h-screen bg-gray-50 text-black p-10 overflow-y-auto">
      <h2 className="text-xl font-bold text-[#0E3668]">📚Futa</h2>
      <h3 className="font-semibold text-gray-500 text-xl mb-6">
        Academics Pro
      </h3>
      <div className="space-y-4">
        <Link
          to="/adminDashboard"
          className="flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors duration-200 text-xl font-bold hover:bg-blue-500 hover:text-white"
        >
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/adminDashboard"
          className="flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors duration-200 text-xl font-bold hover:bg-blue-500 hover:text-white"
        >
          <Users size={20} />
          <span>Student</span>
        </Link>
        <Link
          to="/adminDashboard"
          className="flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors duration-200 text-xl font-bold hover:bg-blue-500 hover:text-white"
        >
          <Building2 size={20} />
          <span>Departments</span>
        </Link>
        <Link
          to="/courseManagement"
          className="flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors duration-200 text-xl font-bold hover:bg-blue-500 hover:text-white"
        >
          <BookOpen size={20} />
          <span>Courses</span>
        </Link>
        <Link
          to="/biometricAttendance"
          className="flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors duration-200 text-xl font-bold hover:bg-blue-500 hover:text-white"
        >
          <CalendarCheck size={20} />
          <span>Attendance</span>
        </Link>
        <Link
          to="/lecturers"
          className="flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors duration-200 text-xl font-bold hover:bg-blue-500 hover:text-white"
        >
          <CalendarCheck size={20} />
          <span>Lecturers</span>
        </Link>
        <Link
          to="/adminDashboard"
          className="flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors duration-200 text-xl font-bold hover:bg-blue-500 hover:text-white"
        >
          <BarChart2 size={20} />
          <span>Reports</span>
        </Link>
      </div>
      <div className="flex space-x-3 mt-[20em]">
        <SearchCheckIcon />
        <p>Help & Support</p>
      </div>
    </div>
  );
};

export default Sidebar;
