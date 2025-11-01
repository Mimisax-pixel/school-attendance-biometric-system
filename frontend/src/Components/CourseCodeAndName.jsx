import React from "react";
import { Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "./Layouts/Navbar";
import SearchBar from "./Searchbar";

const CourseCodeAndName = () => {
  const courses = [
    { code: "CSC 401", title: "Software Engineering", dept: "Computer Science", unit: 3 },
    { code: "MTH 211", title: "Linear Algebra I", dept: "Mathematics", unit: 3 },
    { code: "PHY 101", title: "General Physics I", dept: "Physics", unit: 4 },
    { code: "CSC 303", title: "Data Structures and Algorithms", dept: "Computer Science", unit: 3 },
    { code: "CHM 102", title: "General Chemistry II", dept: "Chemical Sciences", unit: 4 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar - if your Navbar is fixed, we add top padding to main so content isn't hidden */}
      <Navbar />

      {/* Main container: full width, with safe top padding for mobile if navbar is fixed */}
      <main className="flex-grow w-full max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-16 md:pt-8 pb-10">
        {/* Header row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <p className="font-medium text-gray-600 text-sm sm:text-base md:text-lg">
            Manage courses and their details.
          </p>

          <button className="text-white bg-[#1173D4] py-2 px-4 rounded-lg w-full sm:w-auto text-sm sm:text-base hover:bg-[#0E5EAC] transition">
            + Add New Course
          </button>
        </div>

        {/* Search bar */}
        <div className="w-full mb-6">
          <SearchBar />
        </div>

        {/* Table/Card container */}
        <section className="w-full">
          {/* Desktop / tablet table: visible from sm and up */}
          <div className="hidden sm:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              {/* Header */}
              <div className="min-w-full grid grid-cols-5 text-left px-4 md:px-6 gap-4 font-semibold text-gray-500 text-xs sm:text-sm border-b border-gray-200 py-3">
                <div>CODE</div>
                <div>TITLE</div>
                <div>DEPARTMENT</div>
                <div>UNIT</div>
                <div>ACTIONS</div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-gray-200">
                {courses.map((course, idx) => (
                  <div
                    key={idx}
                    className="min-w-full grid grid-cols-5 items-center px-4 md:px-6 py-4 gap-4 text-gray-700 text-sm hover:bg-gray-50 transition"
                  >
                    <div className="truncate">{course.code}</div>
                    <div className="truncate">{course.title}</div>
                    <div className="truncate">{course.dept}</div>
                    <div className="truncate">{course.unit}</div>
                    <div className="flex gap-3">
                      <button aria-label={`edit ${course.code}`} className="p-1">
                        <Edit2 className="text-blue-600 w-5 h-5 hover:text-blue-800" />
                      </button>
                      <button aria-label={`delete ${course.code}`} className="p-1">
                        <Trash2 className="text-red-500 w-5 h-5 hover:text-red-700" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile list: visible below sm */}
          <div className="sm:hidden space-y-4">
            {courses.map((course, idx) => (
              <article
                key={idx}
                className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-400">CODE</div>
                    <div className="font-medium text-gray-800">{course.code}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button aria-label={`edit ${course.code}`} className="p-1">
                      <Edit2 className="text-blue-600 w-5 h-5" />
                    </button>
                    <button aria-label={`delete ${course.code}`} className="p-1">
                      <Trash2 className="text-red-500 w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                  <div>
                    <div className="text-xs text-gray-400">TITLE</div>
                    <div className="truncate">{course.title}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-400">UNIT</div>
                    <div>{course.unit}</div>
                  </div>

                  <div className="col-span-2">
                    <div className="text-xs text-gray-400">DEPARTMENT</div>
                    <div className="truncate">{course.dept}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-gray-200 pt-4 text-gray-600 text-sm">
          <p>Showing 1 to {courses.length} of 20 Courses</p>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded hover:bg-gray-100">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="p-2 rounded hover:bg-gray-100">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CourseCodeAndName;
