import React from "react";
import Navbar from "./Layouts/Navbar";
import SearchBar from "./Searchbar";
import { useCourses } from "../hooks/useCourses";
import { Edit2, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

const CourseCodeAndName = () => {
  const { courses, isLoading, isError, error } = useCourses();

  if (isLoading) return <p className="p-6">Loading courses...</p>;
  if (isError)
    return <p className="p-6 text-red-600">Error: {error?.message || "Failed to fetch courses"}</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-16 md:pt-8 pb-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <p className="font-medium text-gray-600 text-sm sm:text-base md:text-lg">
            Manage courses and their details.
          </p>
          <button className="text-white bg-[#1173D4] py-2 px-4 rounded-lg w-full sm:w-auto text-sm sm:text-base hover:bg-[#0E5EAC] transition">
            + Add New Course
          </button>
        </div>

        {/* Search */}
        <div className="w-full mb-6"><SearchBar /></div>

        {/* Courses Table */}
        <section className="w-full">
          <div className="hidden sm:block bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
            <div className="overflow-x-auto">
              <div className="min-w-full grid grid-cols-5 text-left px-4 md:px-6 gap-4 font-semibold text-gray-500 text-xs sm:text-sm border-b border-gray-200 py-3">
                <div>CODE</div>
                <div>TITLE</div>
                <div>DEPARTMENT</div>
                <div>UNIT</div>
                <div>ACTIONS</div>
              </div>
              <div className="divide-y divide-gray-200">
                {courses.map(({ _id, courseCode, courseTitle, department, creditunits }) => (
                  <div key={_id} className="min-w-full grid grid-cols-5 items-center px-4 md:px-6 py-4 gap-4 text-gray-700 text-sm hover:bg-gray-50 transition">
                    <div className="truncate">{courseCode}</div>
                    <div className="truncate">{courseTitle}</div>
                    <div className="truncate">{department}</div>
                    <div className="truncate">{creditunits}</div>
                    <div className="flex gap-3">
                      <button className="p-1" aria-label={`edit ${courseCode}`}><Edit2 className="text-blue-600 w-5 h-5 hover:text-blue-800" /></button>
                      <button className="p-1" aria-label={`delete ${courseCode}`}><Trash2 className="text-red-500 w-5 h-5 hover:text-red-700" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile list */}
          <div className="sm:hidden space-y-4">
            {courses.map(({ _id, courseCode, courseTitle, department, creditunits }) => (
              <article key={_id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-400">CODE</div>
                    <div className="font-medium text-gray-800">{courseCode}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1" aria-label={`edit ${courseCode}`}><Edit2 className="text-blue-600 w-5 h-5" /></button>
                    <button className="p-1" aria-label={`delete ${courseCode}`}><Trash2 className="text-red-500 w-5 h-5" /></button>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                  <div>
                    <div className="text-xs text-gray-400">TITLE</div>
                    <div>{courseTitle}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-400">UNIT</div>
                    <div>{creditunits}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-xs text-gray-400">DEPARTMENT</div>
                    <div>{department}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CourseCodeAndName;