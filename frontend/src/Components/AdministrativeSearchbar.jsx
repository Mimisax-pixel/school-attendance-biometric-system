import React, { useState } from "react";
import { Calendar, ChevronDown, ChevronUp, Filter, Search } from "lucide-react";

const AdministrativeSearchbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <div
      className="
        w-full 
        px-4 sm:px-6 md:px-8 lg:px-0 xl:px-0
        py-8 xl:pt-2
        lg:mr-[260px] 
         
        mx-auto
      "
    >
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#0E3668]">
          Administrative Log
        </h2>
        <p className="mt-2 xl:mt-10 text-gray-500 text-sm sm:text-base font-medium leading-relaxed">
          Track all system activities, including user logins, data modifications,
          and report generation.
        </p>
      </div>

      {/* Search and Toggle Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Search Input */}
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center w-full sm:max-w-md"
        >
          <button
            type="submit"
            className="absolute right-4 flex items-center justify-center"
          >
            <Search size={18} className="text-gray-500" />
          </button>
          <input
            type="text"
            placeholder="Search by name or activity..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600 text-sm sm:text-base"
          />
        </form>

        {/* Filter Toggle (Mobile only) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center sm:hidden bg-[#1173D4] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        >
          <Filter size={18} className="mr-2" />
          Filters
          {showFilters ? (
            <ChevronUp size={18} className="ml-2" />
          ) : (
            <ChevronDown size={18} className="ml-2" />
          )}
        </button>
      </div>

      {/* Filters Section */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-300 ${
          showFilters ? "block" : "hidden sm:grid"
        }`}
      >
        {/* Action Type */}
        <div>
          <h4 className="text-base sm:text-lg font-medium text-gray-500 mb-2">
            Action Type
          </h4>
          <div className="border border-gray-300 flex justify-between items-center px-4 py-3 rounded-xl bg-white">
            <button className="text-sm sm:text-base text-gray-700">
              All Actions
            </button>
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>

        {/* User Role */}
        <div>
          <h4 className="text-base sm:text-lg font-medium text-gray-500 mb-2">
            User Role
          </h4>
          <div className="border border-gray-300 flex justify-between items-center px-4 py-3 rounded-xl bg-white">
            <button className="text-sm sm:text-base text-gray-700">
              All Roles
            </button>
            <ChevronDown size={18} className="text-gray-500" />
          </div>
        </div>

        {/* Start Date */}
        <div>
          <h4 className="text-base sm:text-lg font-medium text-gray-500 mb-2">
            Start Date
          </h4>
          <div className="border border-gray-300 flex justify-between items-center px-4 py-3 rounded-xl bg-white">
            <button className="text-sm sm:text-base text-gray-700">
              mm/dd/yyyy
            </button>
            <Calendar size={18} className="text-gray-500" />
          </div>
        </div>

        {/* End Date */}
        <div>
          <h4 className="text-base sm:text-lg font-medium text-gray-500 mb-2">
            End Date
          </h4>
          <div className="border border-gray-300 flex justify-between items-center px-4 py-3 rounded-xl bg-white">
            <button className="text-sm sm:text-base text-gray-700">
              mm/dd/yyyy
            </button>
            <Calendar size={18} className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdministrativeSearchbar;
