import React from "react";

const LecturerNav = () => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 px-4 sm:px-8 md:px-16 lg:px-20 py-4 sm:py-6">
      {/* Title */}
      <p className="font-bold text-2xl sm:text-3xl text-center sm:text-left text-[#0E3668]">
        LECTURERS
      </p>

      
      
      {/* Button */}
      <button className="text-white bg-[#1173D4] py-2 px-6 rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-blue-600 transition-colors">
        + Add new Lecturer
      </button>
    </div>
  );
};

export default LecturerNav;
