import React from "react";
import LecturesSearchbar from "../Components/LecturesSearchbar";
import LecturerNav from "./LecturerNav";

const LecturerAttendance = () => {
  const lecturers = [
    {
      name: "Dr. Anya Sharma",
      department: "Computer Science",
      faculty: "Computer Science",
      contact: "anya.shama@futia.edu.ng",
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
      contact: "david.adebayo@fotia.edu.ng",
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
      <LecturerNav />
      <LecturesSearchbar />

      {/* Table Header (hidden on small screens) */}
      <div className="hidden md:grid grid-cols-6 gap-4 mt-10 pb-2 border-b border-gray-200 text-gray-500 font-semibold text-sm lg:text-lg">
        <p>NAME</p>
        <p>DEPARTMENT</p>
        <p>FACULTY</p>
        <p>CONTACTS</p>
        <p>COURSES</p>
        <p>ACTIONS</p>
      </div>

      {/* Responsive Rows */}
      <div className="mt-8 space-y-8">
        {lecturers.map((lect, i) => (
          <div
            key={i}
            className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6 p-4 md:p-2 rounded-lg border md:border-0 shadow-sm md:shadow-none bg-white md:bg-transparent"
          >
            <p className="font-medium text-[#32333B]">{lect.name}</p>
            <p className="font-medium text-[#32333B]">{lect.department}</p>
            <p className="font-medium text-[#32333B]">{lect.faculty}</p>
            <p className="font-medium text-[#32333B]">{lect.contact}</p>
            <p className="font-medium text-[#32333B] leading-5">{lect.courses}</p>
            <p className="text-blue-600 font-semibold cursor-pointer">Edit</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturerAttendance;
