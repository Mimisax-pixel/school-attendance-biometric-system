import React from "react";
import LecturesSearchbar from "../Components/LecturesSearchbar";
import LecturerNav from "./LecturerNav";

const LecturerAttendance = () => {
  const lecturers = [
    {
      name: "Dr. Anya Sharma",
      department: "Computer Science",
      faculty: "Computer Science",
      contact: "anya.sharma@futia.edu.ng",
      courses: "Introduction to Programming, Data Structures",
    },
    {
      name: "Prof. Ben Okafor",
      department: "Electrical Engineering",
      faculty: "Mathematics",
      contact: "ben.okafor@futia.edu.ng",
      courses: "Circuit Analysis, Power Systems",
    },
    {
      name: "Dr. Clara Eze",
      department: "Mechanical Engineering",
      faculty: "Physics",
      contact: "clara.eze@futia.edu.ng",
      courses: "Thermodynamics, Fluid Mechanics",
    },
    {
      name: "Prof. David Adebayo",
      department: "Civil Engineering",
      faculty: "Computer Science",
      contact: "david.adebayo@futia.edu.ng",
      courses: "Structural Analysis, Geotechnical Engineering",
    },
    {
      name: "Dr. Fatima Hassan",
      department: "Chemical Engineering",
      faculty: "Chemical Sciences",
      contact: "fatima.hassan@futia.edu.ng",
      courses: "Chemical Reaction Engineering, Process Control",
    },
  ];

  return (
    <div className="container mx-auto lg:ml-[300px] py-10 px-4 sm:px-6 lg:px-20">
      {/* Navbar */}
      <LecturerNav />

      {/* Search bar */}
      <LecturesSearchbar />

      {/* Desktop Table Header */}
      <div className="hidden md:grid grid-cols-[1.3fr_1.2fr_1.2fr_1.8fr_2fr_0.6fr] gap-6 mt-10 pb-3 border-b border-gray-200 text-gray-500 font-semibold text-sm lg:text-base">
        <p className="text-left">NAME</p>
        <p className="text-left">DEPARTMENT</p>
        <p className="text-left">FACULTY</p>
        <p className="text-left">CONTACT</p>
        <p className="text-left">COURSES</p>
        <p className="text-right">ACTIONS</p>
      </div>

      {/* Table Rows */}
      <div className="mt-6 space-y-4">
        {lecturers.map((lect, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-[1.3fr_1.2fr_1.2fr_1.8fr_2fr_0.6fr] gap-y-3 md:gap-x-6 bg-white md:bg-transparent border md:border-0 shadow-sm md:shadow-none rounded-lg md:rounded-none p-4 md:p-2 items-start md:items-center hover:bg-gray-50 transition-all"
          >
            {/* Name */}
            <p className="font-medium text-[#32333B] text-sm md:text-base">
              {lect.name}
            </p>

            {/* Department */}
            <p className="font-medium text-[#32333B] text-sm md:text-base">
              {lect.department}
            </p>

            {/* Faculty */}
            <p className="font-medium text-[#32333B] text-sm md:text-base">
              {lect.faculty}
            </p>

            {/* Contact */}
            <p className="font-medium text-[#32333B] text-sm md:text-base break-words">
              {lect.contact}
            </p>

            {/* Courses */}
            <p className="font-medium text-[#32333B] text-sm md:text-base whitespace-normal leading-relaxed break-words max-w-[250px] md:max-w-full">
              {lect.courses}
            </p>

            {/* Action */}
            <div className="flex justify-start md:justify-end">
              <button className="text-blue-600 font-semibold hover:underline text-sm md:text-base">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturerAttendance;
