import React, { useState } from "react";
import Navbar from "./Layouts/Navbar";
import SearchBar from "./Searchbar";
import { useCourses } from "../hooks/useCourses";
import { Edit2, Trash2 } from "lucide-react";
import EditCourseModal from "./EditCourseModal";


const CourseCodeAndName = () => {
  const { courses, isLoading, isError, error } = useCourses();
  const [selectedCourse, setSelectedCourse] = useState(null);

  if (isLoading) return <p className="p-6">Loading courses...</p>;
  if (isError)
    return (
      <p className="p-6 text-red-600">
        Error: {error?.message || "Failed to fetch courses"}
      </p>
    );

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow w-full max-w-full mx-auto px-4 sm:px-6 md:px-8 lg:px-12 pt-16 md:pt-8 pb-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 sm:mb-8">
          <p className="font-medium text-gray-600 text-sm sm:text-base md:text-lg">
            Manage courses and their details.
          </p>
          <button className="text-white bg-[#1173D4] py-2 px-4 rounded-lg w-full sm:w-auto text-sm sm:text-base hover:bg-[#0E5EAC] transition">
            + Add New Course
          </button>
        </div>

        <div className="w-full mb-6"><SearchBar /></div>

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
                {courses.map((course) => (
                  <div key={course._id} className="min-w-full grid grid-cols-5 items-center px-4 md:px-6 py-4 gap-4 text-gray-700 text-sm hover:bg-gray-50 transition">
                    <div className="truncate">{course.courseCode}</div>
                    <div className="truncate">{course.courseTitle}</div>
                    <div className="truncate">{course.department}</div>
                    <div className="truncate">{course.creditunits}</div>
                    <div className="flex gap-3">
                      <button
                        className="p-1"
                        onClick={() => setSelectedCourse(course)}
                        aria-label={`edit ${course.courseCode}`}
                      >
                        <Edit2 className="text-blue-600 w-5 h-5 hover:text-blue-800" />
                      </button>
                      <button className="p-1" aria-label={`delete ${course.courseCode}`}>
                        <Trash2 className="text-red-500 w-5 h-5 hover:text-red-700" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <EditCourseModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
      />
    </div>
  );
};

export default CourseCodeAndName;