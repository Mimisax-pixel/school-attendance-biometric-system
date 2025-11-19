import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart2,
  BookOpen,
  Building2,
  CalendarCheck,
  LayoutDashboard,
  SearchCheckIcon,
  Users,
  Menu,
  X,
  Bell,
} from "lucide-react";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { to: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/dashboard/students", icon: Users, label: "Students" },
    {
      to: "/admin/dashboard/departments",
      icon: Building2,
      label: "Departments",
    },
    {
      to: "/admin/dashboard/course-management",
      icon: BookOpen,
      label: "Courses",
    },
    {
      to: "/admin/dashboard/lecturers",
      icon: CalendarCheck,
      label: "Lecturers",
    },
    { to: "/admin/dashboard/reports", icon: BarChart2, label: "Reports" },
    { to: "/admin/dashboard/alerts", icon: Bell, label: "alerts" },
  ];

  return (
    <>
      {/* ===== MOBILE HEADER ===== */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow-md md:hidden fixed top-0 left-0 w-full z-30">
        <h2 className="text-lg font-bold text-[#0E3668]"> FUTIA</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-700 hover:text-blue-600"
        >
          <Menu size={28} />
        </button>
      </header>

      {/* ===== OVERLAY (Mobile Only) ===== */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
        ></div>
      )}

      {/* ===== SIDEBAR ===== */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] bg-gray-50 p-6 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static md:w-[280px]`}
      >
        {/* Header + Close button (mobile only) */}
        <div className="flex items-center justify-between mb-6 md:mb-10">
          <div>
            <h2 className="text-xl font-bold text-[#0E3668]"> FUTIA</h2>
            <h3 className="font-semibold text-gray-500 text-sm md:text-base">
              Academics Pro
            </h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-red-600 md:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-3">
          {navItems.map(({ to, icon: Icon, label }) => (
            <Link
              key={label}
              to={to}
              onClick={() => setIsOpen(false)} // close sidebar on mobile tap
              className="flex items-center space-x-3 p-2 rounded-lg cursor-pointer text-gray-700 text-base font-semibold transition-colors duration-200 hover:bg-blue-500 hover:text-white"
            >
              <Icon size={20} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        {/* Help Section */}
        <div className="flex items-center space-x-3 mt-20 md:mt-40 text-gray-700">
          <SearchCheckIcon />
          <p className="font-medium">Help & Support</p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
