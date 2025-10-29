import React from "react";
import { Edit2Icon, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "./Layouts/Navbar";
import SearchBar from "./Searchbar";

const CourseCodeAndName = () => {
  return (
    <div className="container mx-auto lg:ml-[300px] px-4 sm:px-6 md:px-10 py-10">
      <Navbar />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-10">
        <p className="font-semibold text-gray-500 text-lg sm:text-xl">
          Manage courses and their details.
        </p>
        <button className="text-white bg-[#1173D4] py-2 px-4 rounded-lg w-full sm:w-auto">
          + Add new Course
        </button>
      </div>

      <SearchBar />

      {/* Responsive Table Layout */}
      <div className="overflow-x-auto mt-10">
        <div className="min-w-[600px] md:min-w-full">
          <div className="grid grid-cols-5 text-left px-4 md:px-10 gap-6 font-semibold text-gray-400 text-sm md:text-lg border-b pb-4">
            <p>COURSE CODE</p>
            <p>COURSE TITLE</p>
            <p>DEPARTMENT</p>
            <p>CREDIT UNIT</p>
            <p>ACTIONS</p>
          </div>

          {/* Rows */}
          <div className="divide-y">
            {[
              {
                code: "CSC 401",
                title: "Software Engineering",
                dept: "Computer Science",
                unit: 3,
              },
              {
                code: "MTH 211",
                title: "Linear Algebra I",
                dept: "Mathematics",
                unit: 3,
              },
              {
                code: "PHY 101",
                title: "General Physics I",
                dept: "Physics",
                unit: 4,
              },
              {
                code: "CSCS 303",
                title: "Data Structures and Algorithms",
                dept: "Computer Science",
                unit: 3,
              },
              {
                code: "CHM 102",
                title: "General Chemistry II",
                dept: "Chemical Sciences",
                unit: 4,
              },
            ].map((course, index) => (
              <div
                key={index}
                className="grid grid-cols-5 items-center text-[#32333B] text-sm md:text-base font-medium px-4 md:px-10 py-6 gap-6"
              >
                <p>{course.code}</p>
                <p>{course.title}</p>
                <p>{course.dept}</p>
                <p>{course.unit}</p>
                <div className="flex gap-3">
                  <Edit2Icon className="text-blue-600 cursor-pointer" />
                  <Trash2 className="text-red-500 cursor-pointer" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-4 px-4 md:px-10 text-sm md:text-base">
        <p>Showing 1 to 5 of 20 Courses</p>
        <div className="flex items-center gap-4">
          <ChevronLeft className="cursor-pointer hover:text-[#1173D4]" />
          <ChevronRight className="cursor-pointer hover:text-[#1173D4]" />
        </div>
      </div>
    </div>
  );
};

export default CourseCodeAndName;
