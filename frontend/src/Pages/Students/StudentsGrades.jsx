import React from 'react'
import { BookOpen, LayoutDashboard, User, CheckCircle } from 'lucide-react'
import React, { useState } from "react";
import { BookOpen, LayoutDashboard, User, CheckCircle, Menu, X } from "lucide-react";

const Grades = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:static z-20 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0`}
      >
        <div>
          <div className="p-6 border-b border-gray-200 flex items-center justify-between md:justify-start">
            <div className="flex items-center space-x-3">
              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt="Profile"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full"
              />
              <div>
                <h2 className="text-gray-900 font-semibold text-base md:text-lg">
                  Sarah
                </h2>
                <p className="text-xs md:text-sm text-gray-500">Student</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-4 text-sm md:text-base">
            {[
              { icon: LayoutDashboard, label: "Dashboard" },
              { icon: BookOpen, label: "Courses" },
              { icon: CheckCircle, label: "Attendance" },
              { icon: User, label: "Grades", active: true },
              { icon: User, label: "Profile" },
            ].map(({ icon: Icon, label, active }) => (
              <a
                key={label}
                href="#"
                className={`flex items-center space-x-3 py-3 px-6 ${
                  active
                    ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="flex items-center justify-between bg-white p-4 border-b border-gray-200 md:hidden">
        <h1 className="text-lg font-semibold text-gray-800">Grades</h1>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 mt-14 md:mt-0">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6">
          Academic Performance
        </h1>

        {/* GPA Card */}
        <div className="bg-white shadow-sm rounded-xl p-6 text-center mb-8 w-full sm:w-56">
          <p className="text-gray-600 font-medium">Overall GPA</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
            3.8
          </h2>
        </div>

        {/* Course History */}
        <Section title="Course History">
          <ResponsiveTable
            headers={["Course Code", "Course Title", "Credits", "Grade", "Semester"]}
            rows={[
              ["CSC101", "Introduction to Programming", 3, "A", "Fall 2023"],
              ["MAT101", "Calculus I", 4, "B", "Fall 2023"],
              ["ENG101", "English Composition", 3, "A", "Fall 2023"],
              ["PHY101", "Physics I", 4, "C", "Spring 2024"],
              ["CSC201", "Data Structures", 3, "A", "Spring 2024"],
            ]}
          />
        </Section>

        {/* Attendance Records */}
        <Section title="Attendance Records">
          <ResponsiveTable
            headers={[
              "Course Code",
              "Course Title",
              "Total Classes",
              "Classes Attended",
              "Attendance Rate",
            ]}
            rows={[
              ["CSC101", "Introduction to Programming", 30, 28, "93%"],
              ["MAT101", "Calculus I", 40, 35, "88%"],
              ["ENG101", "English Composition", 30, 29, "97%"],
              ["PHY101", "Physics I", 40, 32, "80%"],
              ["CSC201", "Data Structures", 30, 27, "90%"],
            ]}
          />
        </Section>

        {/* Registered Courses */}
        <Section title="Registered Courses">
          <ResponsiveTable
            headers={["Course Code", "Course Title", "Credits", "Instructor"]}
            rows={[
              ["CSC202", "Algorithms", 3, "Dr. Smith"],
              ["MAT201", "Calculus II", 4, "Dr. Johnson"],
              ["ENG201", "Technical Writing", 3, "Prof. Williams"],
              ["PHY201", "Physics II", 4, "Dr. Brown"],
              ["CSC301", "Operating Systems", 3, "Dr. Davis"],
            ]}
          />
        </Section>
      </main>
    </div>
  );
};

/* ---------- Reusable Components ---------- */

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
      {title}
    </h2>
    {children}
  </section>
);

const ResponsiveTable = ({ headers, rows }) => (
  <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
    <table className="w-full text-xs sm:text-sm text-left text-gray-700 border-collapse">
      <thead className="bg-gray-100 text-gray-600 uppercase">
        <tr>
          {headers.map((h) => (
            <th key={h} className="py-3 px-4 sm:px-6">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t">
            {r.map((cell, j) => (
              <td key={j} className="py-3 px-4 sm:px-6 whitespace-nowrap">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Grades;
