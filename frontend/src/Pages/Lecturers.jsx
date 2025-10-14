import React from 'react'
import Sidebar from '../Components/Sidebar'
import LecturerAttendance from '../Components/LecturerAttendance'
import LecturerNav from '../Components/LecturerNav';

const Lecturers = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <LecturerAttendance />
      </div>
    </div>
  );
}

export default Lecturers
