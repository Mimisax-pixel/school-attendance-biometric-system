import React from 'react'
import Sidebar from '../Components/Sidebar';
import CourseCodeAndName from '../Components/CourseCodeAndName';
import Navbar from '../Components/Layouts/Navbar';

const CourseManagement = () => {
  return (
    <div>
      <div className="flex  gap-10 ">
        <Sidebar />

        <CourseCodeAndName />
      </div>
    </div>
  );
}

export default CourseManagement
