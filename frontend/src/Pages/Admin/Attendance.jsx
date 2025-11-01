import React, { useState } from "react";
import {
  Bell,
  User,
  Fingerprint,
  Settings,
  BookOpen,
  Users,
  BarChart3,
  Menu,
  X,
} from "lucide-react";

const Attendance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", icon: BarChart3 },
    { name: "Courses", icon: BookOpen },
    { name: "Students", icon: Users },
    { name: "Attendance", icon: Fingerprint },
    { name: "Lecturers", icon: User },
    { name: "Reports", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* --- Mobile Top Bar --- */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b border-gray-200/50 md:hidden">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="text-blue-700 font-bold text-lg">FUTIA Analytics</div>
        </div>

        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-gray-500" />
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-8 h-8 rounded-full border"
          />
        </div>
      </header>

      <div className="flex">
        {/* --- Sidebar --- */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-gray-200/50 transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50 md:border-none">
            <div className="text-blue-700 text-2xl font-bold">FUTIA Analytics</div>
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <nav className="mt-3 px-2 pb-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200
                ${
                  item.name === "Attendance"
                    ? "bg-blue-50 text-blue-700"
                    : ""
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm md:text-base">{item.name}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* --- Main Content --- */}
        <main className="flex-1 min-h-screen w-full md:ml-64 bg-gray-50">
          <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-6 sm:py-8">
            {/* Desktop Header */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Biometric Attendance</h1>
              <div className="flex items-center gap-4">
                <Bell className="w-5 h-5 text-gray-500" />
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
              </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {/* LEFT COLUMN */}
              <div className="space-y-5 w-full">
                {/* Select Class */}
                <section className="bg-white border border-gray-200/40 rounded-xl p-5 sm:p-6 w-full shadow-sm">
                  <h2 className="text-lg font-semibold text-gray-800 mb-3">
                    Select Class
                  </h2>

                  <div className="space-y-3">
                    <label className="block text-sm text-gray-600">
                      Department
                    </label>
                    <select
                      className="w-full rounded-md border border-gray-200/50 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <option>Select Department</option>
                      <option>Computer Science</option>
                      <option>Electrical Engineering</option>
                      <option>Mechanical Engineering</option>
                      <option>Mass Communication</option>
                      <option>Cybersecurity</option>
                    </select>

                    <label className="block text-sm text-gray-600">Course</label>
                    <select
                      className="w-full rounded-md border border-gray-200/50 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                      <option>Select Course</option>
                      <option>CSC 401</option>
                      <option>CSC 402</option>
                      <option>MAC1102</option>
                    </select>

                    <button
                      className="w-full mt-2 bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 active:scale-98 transition-transform text-sm"
                    >
                      Start Attendance Session →
                    </button>
                  </div>
                </section>

                {/* Session Details */}
                <section className="bg-white border border-gray-200/40 rounded-xl p-5 sm:p-6 w-full shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Session Details
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>
                      <strong>Course:</strong> Mass Communication
                    </li>
                    <li>
                      <strong>Code:</strong> MAC3101
                    </li>
                    <li>
                      <strong>Lecturer:</strong> Dr. Wisdom Bassey
                    </li>
                    <li>
                      <strong>Time:</strong> 10:00 AM - 12:00 PM
                    </li>
                  </ul>
                </section>
              </div>

              {/* RIGHT COLUMN */}
              <div className="bg-white border border-gray-200/40 rounded-xl p-6 sm:p-8 flex flex-col items-center w-full shadow-sm">
                <Fingerprint className="w-14 h-14 sm:w-16 sm:h-16 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold mb-1">Ready to Scan</h3>
                <p className="text-center text-sm sm:text-base text-gray-500 mb-5 px-2">
                  Place your finger on the biometric scanner to record your attendance for
                  MAC1201.
                </p>

                {/* Verified / Failed */}
                <div className="w-full space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-green-200/60 rounded-lg p-3 bg-green-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          Roland Bassey
                        </p>
                        <p className="text-xs text-gray-500">CST/18/001</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold text-sm">
                      ✔ Verified
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-red-200/60 rounded-lg p-3 bg-red-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          Juliet Irore
                        </p>
                        <p className="text-xs text-gray-500">Not recognized</p>
                      </div>
                    </div>
                    <span className="text-red-600 font-semibold text-sm">
                      ✖ Failed
                    </span>
                  </div>
                </div>

                {/* Action */}
                <div className="w-full mt-4 text-center">
                  <button className="text-xs sm:text-sm underline text-blue-600">
                    View full attendance log
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Attendance;
