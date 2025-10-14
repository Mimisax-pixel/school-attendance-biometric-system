import React from 'react'
import { Edit2Icon, Trash, Trash2 } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from './Layouts/Navbar';
import SearchBar from './Searchbar';



const CourseCodeAndName = () => {
  return (
    <div className="container mx-auto ml-[300px]">
      <Navbar />
      <div className="flex items-center justify-between px-20 lg:px-20 py-20">
        <p className="font-semibold text-gray-500 text-xl">
          Manage courses and thier details.
        </p>
        <button className="text-white bg-[#1173D4] py-2 px-4 rounded-lg">
          + Add new Course
        </button>
      </div>
      <SearchBar />
      <div className=" px-20 lg:px-20 flex flex-col gap-10 md:flex-row justify-between">
        <div className="pt-20">
          <p className="mb-10 font-semibold text-gray-400 text-lg">
            COURSE CODE
          </p>
          <div className="space-y-16 text-[#32333B] font-medium">
            <p>CSC 401</p>
            <p>MTH 211</p>
            <p>PHY 101</p>
            <p>CSCS 303</p>
            <p>CHM 102</p>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-400">
            COURSE TITLE
          </p>
          <div className="space-y-16 text-[#32333B] font-medium">
            <p>Software Engineering</p>
            <p>LInear Algebra I</p>
            <p>General Physics I</p>
            <p>Data Structures and Algorithms</p>
            <p>General Chemistry II</p>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-400">
            DEPARTMENT
          </p>
          <div className="space-y-16 text-[#32333B] font-medium">
            <p>Computer Science</p>
            <p>Mathematices</p>
            <p>Physices</p>
            <p>Computer Science</p>
            <p>Chemical Sciences</p>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-400">
            CREDIT UNIT
          </p>
          <div className="space-y-16 font-semibold">
            <p>3</p>
            <p>3</p>
            <p>4</p>
            <p>3</p>
            <p>4</p>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-400">ACTIONS</p>
          <div className="flex flex-col text-start mb-4 md:mb-0 space-y-16">
            <div className="flex gap-4">
              <Edit2Icon />
              <Trash2 />
            </div>
            <div className="flex gap-4">
              <Edit2Icon />
              <Trash2 />
            </div>
            <div className="flex gap-4">
              <Edit2Icon />
              <Trash2 />
            </div>
            <div className="flex gap-4">
              <Edit2Icon />
              <Trash2 />
            </div>
            <div className="flex gap-4">
              <Edit2Icon />
              <Trash2 />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[15rem] flex items-center justify-between  px-20 lg:px-20">
        <p>Showing 1 to 5 of 20 Courses</p>
        <div className="flex items-center gap-4">
          <ChevronLeft />
          <ChevronRight />
        </div>
      </div>
    </div>
  );
}

export default CourseCodeAndName
