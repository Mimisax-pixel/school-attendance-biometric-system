import React from 'react'

const LecturerNav = () => {
  return (
    <div className="flex items-center justify-between px-20 lg:px-20">
      <p className="font-bold text-3xl">
       LECTURER
      </p>
      <button className="text-white bg-[#1173D4] py-2 px-4 rounded-lg">
        + Add new Course
      </button>
    </div>
  );
}

export default LecturerNav
