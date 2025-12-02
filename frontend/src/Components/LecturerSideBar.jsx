import React from "react";
import {
  User,
  Fingerprint,
  Settings,
  BookOpen,
  Users,
  BarChart3,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const LecturerSideBar = ({ sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { name: "Dashboard", path: "/lecturer/dashboard", icon: BarChart3 },
    { name: "Courses", path: "/lecturer/dashboard/courses", icon: BookOpen },
    {
      name: "Attendance",
      path: "/lecturer/dashboard/attendance",
      icon: Fingerprint,
    },
    { name: "Reports", path: "/lecturer/dashboard/reports", icon: BarChart3 },
    { name: "Settings", path: "/lecturer/dashboard", icon: Settings },
  ];
  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-gray-200/50 transition-transform duration-300 ease-in-out shrink-0 grow-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200/50 md:border-none">
          <div className="text-blue-700 text-2xl font-bold">
            FUITA Analytics
          </div>
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <nav className="mt-3 px-2 pb-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm md:text-base">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default LecturerSideBar;
