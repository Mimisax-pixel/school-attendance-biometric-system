import React from "react";
import { Home, BarChart2, Users, LogOut, Menu } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-[#0A496D] text-white flex flex-col transition-all duration-300 z-40
      ${isOpen ? "w-64" : "w-0 overflow-hidden lg:w-64"}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-blue-400">
        <h1 className="text-2xl font-bold">EduTrack</h1>
        <button onClick={toggleSidebar} className="lg:hidden text-white">
          <Menu size={22} />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-4 text-lg">
        <a href="/adminDashboard" className="flex items-center gap-3 hover:text-gray-300">
          <Home size={20} /> Dashboard
        </a>
        <a href="/attendance" className="flex items-center gap-3 hover:text-gray-300">
          <Users size={20} /> Attendance
        </a>
        <a href="/performance" className="flex items-center gap-3 hover:text-gray-300">
          <BarChart2 size={20} /> Performance
        </a>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-400">
        <button className="flex items-center gap-3 text-gray-200 hover:text-white">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

