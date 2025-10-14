import React from 'react'
import AdministrativeSearchbar from './AdministrativeSearchbar';

const TimeStamp = () => {
  return (
    <div className="container mx-auto lg:ml-[300px] py-10">
      <AdministrativeSearchbar />
      <div className=" px-20 lg:px-20 flex flex-col gap-10 md:flex-row justify-between pb-20">
        <div className="pt-20">
          <p className="mb-10 font-semibold text-gray-500 text-lg">TIMESTAMP</p>
          <div className="space-y-[72px] text-[#32333B] font-medium w-[98px] leading-4">
            <p>2023-10-27 14-30-15</p>
            <p>2023-10-27 14-25-40</p>
            <p>2023-10-27 14-20-05</p>
            <p>2023-10-27 13-55-12</p>
            <p>2023-10-27 13-40-22</p>
            <p>2023-10-27 13-15-58</p>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-500">USER</p>
          <div className="space-y-[81px] text-[#32333B] font-medium ">
            <p>Adim</p>
            <p>Dr.Adekunle</p>
            <p>Prof.Chidinma</p>
            <p>Admin</p>
            <p>Dr.Adekunle</p>
            <p>Adim</p>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-500">ACTION</p>
          <div className="space-y-[64px] text-[#32333B] font-medium flex flex-col">
            <button className="text-green-700 bg-green-200 p-2 rounded-lg">
              User Login
            </button>
            <button className="text-blue-700 bg-blue-200 p-2 rounded-2xl">
              Data Modification
            </button>
            <button className="text-blue-700 bg-blue-200 p-2 rounded-2xl">
              Report Generation
            </button>
            <button className="text-yellow-700 bg-yellow-200 p-2 rounded-2xl">
              Sytem Configuration
            </button>
            <button className="text-green-700 bg-green-200 p-2 rounded-lg">
              User Login
            </button>
            <button className="text-red-800 bg-red-200 p-2 rounded-lg">
              Failed Login
            </button>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-500">DETAILS</p>
          <div className="space-y-[84px] font-semibold w-[380px] leading-4">
            <p>Successful login</p>
            <p>Update student 'Oluwaseun' (CSC/18/1234) Performance record</p>
            <p>Generated attendance Report for 'CSC 401' for October 2023</p>
            <p>Modifield attendance alert threshold for 75%</p>
            <p>Successful Login</p>
            <p>Failed Login attempt user 'Admin'</p>
          </div>
        </div>
        <div className="pt-20">
          <p className="mb-10 font-semibold text-lg text-gray-400">
            IP ADDRESS
          </p>
          <div className="space-y-[81px] font-semibold">
            <p>192.168.1.101</p>
            <p>203.0.113.45</p>
            <p>198.51.100.22</p>
            <p>192.168.1.101</p>
            <p>203.0.113.45</p>
            <p>10.0.0.5</p>
          </div>
        </div>
      </div>
      <div className="mt-[15rem] flex items-center justify-between  px-20 lg:px-20">
        <p>Showing 1 to 5 of 20 Courses</p>
        <div className="flex items-center gap-4">
          <p>Previous</p>
          <p>Next</p>
        </div>
      </div>
    </div>
  );
}

export default TimeStamp
