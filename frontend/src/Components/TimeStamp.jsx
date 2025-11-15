import React from "react";
import AdministrativeSearchbar from "./AdministrativeSearchbar";

const TimeStamp = () => {
  return (
    <div className="container mx-auto lg:ml-[300px] py-10 px-4 sm:px-6 lg:px-20">
      {/* Searchbar */}
      <AdministrativeSearchbar />

      {/* Logs Section */}
      <div className="flex flex-col lg:flex-row flex-wrap gap-10 justify-between pb-20 pt-10">
        {/* TIMESTAMP */}
        <div className="flex-1 min-w-[150px]">
          <p className="mb-6 font-semibold text-gray-500 text-lg">TIMESTAMP</p>
          <div className="space-y-6 text-[#32333B] font-medium text-sm sm:text-base leading-5">
            <p>2023-10-27 14-30-15</p>
            <p>2023-10-27 14-25-40</p>
            <p>2023-10-27 14-20-05</p>
            <p>2023-10-27 13-55-12</p>
            <p>2023-10-27 13-40-22</p>
            <p>2023-10-27 13-15-58</p>
          </div>
        </div>

        {/* USER */}
        <div className="flex-1 min-w-[150px]">
          <p className="mb-6 font-semibold text-gray-500 text-lg">USER</p>
          <div className="space-y-6 text-[#32333B] font-medium text-sm sm:text-base">
            <p>Adim</p>
            <p>Dr. Adekunle</p>
            <p>Prof. Chidinma</p>
            <p>Admin</p>
            <p>Dr. Adekunle</p>
            <p>Adim</p>
          </div>
        </div>

        {/* ACTION */}
        <div className="flex-1 min-w-[160px]">
          <p className="mb-6 font-semibold text-gray-500 text-lg">ACTION</p>
          <div className="space-y-4 flex flex-col">
            <button className="text-green-700 bg-green-200 px-3 py-2 rounded-lg text-sm sm:text-base">
              User Login
            </button>
            <button className="text-blue-700 bg-blue-200 px-3 py-2 rounded-lg text-sm sm:text-base">
              Data Modification
            </button>
            <button className="text-blue-700 bg-blue-200 px-3 py-2 rounded-lg text-sm sm:text-base">
              Report Generation
            </button>
            <button className="text-yellow-700 bg-yellow-200 px-3 py-2 rounded-lg text-sm sm:text-base">
              System Configuration
            </button>
            <button className="text-green-700 bg-green-200 px-3 py-2 rounded-lg text-sm sm:text-base">
              User Login
            </button>
            <button className="text-red-800 bg-red-200 px-3 py-2 rounded-lg text-sm sm:text-base">
              Failed Login
            </button>
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex-1 min-w-[250px]">
          <p className="mb-6 font-semibold text-gray-500 text-lg">DETAILS</p>
          <div className="space-y-6 font-semibold text-sm sm:text-base leading-5">
            <p>Successful login</p>
            <p>
              Updated student â€˜Oluwaseunâ€™ (CSC/18/1234) performance record
            </p>
            <p>Generated attendance report for â€˜CSC 401â€™ (October 2023)</p>
            <p>Modified attendance alert threshold for 75%</p>
            <p>Successful login</p>
            <p>Failed login attempt by user â€˜Adminâ€™</p>
          </div>
        </div>

        {/* IP ADDRESS */}
        <div className="flex-1 min-w-[180px]">
          <p className="mb-6 font-semibold text-gray-500 text-lg">
            IP ADDRESS
          </p>
          <div className="space-y-6 font-semibold text-sm sm:text-base">
            <p>192.168.1.101</p>
            <p>203.0.113.45</p>
            <p>198.51.100.22</p>
            <p>192.168.1.101</p>
            <p>203.0.113.45</p>
            <p>10.0.0.5</p>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <p className="text-center sm:text-left">
          Showing 1 to 5 of 20 Courses
        </p>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            Previous
          </button>
          <button className="px-3 py-1 border rounded hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeStamp;
