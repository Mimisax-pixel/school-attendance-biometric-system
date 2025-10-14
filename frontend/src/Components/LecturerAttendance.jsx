import React from 'react'
import LecturesSearchbar from '../Components/LecturesSearchbar'
import LecturerNav from './LecturerNav';

const LecturerAttendance = () => {
  return (
    <div className="container mx-auto lg:ml-[300px] py-10">
      <LecturerNav />
      <LecturesSearchbar />
      <div className=" px-20 lg:px-20 flex flex-col gap-10 md:flex-row justify-between pb-20">
        <div className="pt-20">
          <p className="mb-10 font-semibold text-gray-400 text-lg">NAME</p>
          <div className="space-y-[72px] text-[#32333B] font-medium">
            <p>Dr. Anya Sharma</p>
            <p>Prof.Ben Okafor</p>
            <p>Dr.Clara Eze</p>
            <p>Prof.David Adebayo</p>
            <p>Dr.Fatima Hassan</p>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-400">
            DEPARTMENT
          </p>
          <div className="space-y-[63px] text-[#32333B] font-medium w-3.5 leading-4">
            <p>Computer Science</p>
            <p>Electrical Engineering</p>
            <p>Mechanical Engineering</p>
            <p>Civil Engineering</p>
            <p>Chemical Engineering</p>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-400">
            DEPARTMENT
          </p>
          <div className="space-y-[72px] text-[#32333B] font-medium">
            <p>Computer Science</p>
            <p>Mathematices</p>
            <p>Physices</p>
            <p>Computer Science</p>
            <p>Chemical Sciences</p>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-400">CONTACTS</p>
          <div className="space-y-[72px] font-semibold">
            <p>anya.shama@futia.edu.ng</p>
            <p>ben.okafor@futia.edu.ng</p>
            <p>clara.eze@futia.edu.ng</p>
            <p>david.adebayo@fotia.edu.ng</p>
            <p>fatima.hassan@futia.edu.ng</p>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-400">CONTACTS</p>
          <div className="space-y-[68px] font-semibold w-[250px] leading-4">
            <p>Introduction to Programming, Data Structures</p>
            <p>Circuit Analysis, Power Systems</p>
            <p>Themodymamics, Fluid Mechanics</p>
            <p>Structural Analysis, Geotechnical Engineering</p>
            <p>Chemical Reaction Engineering, Process Control</p>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-400">ACTIONS</p>
          <div className="flex flex-col text-start mb-4 md:mb-0 space-y-16">
            <p className="text-lg font-medium text-blue-600">Edit</p>
            <p className="text-lg font-medium text-blue-600">Edit</p>
            <p className="text-lg font-medium text-blue-600">Edit</p>
            <p className="text-lg font-medium text-blue-600">Edit</p>
            <p className="text-lg font-medium text-blue-600">Edit</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LecturerAttendance
