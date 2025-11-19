import React, { useState } from "react";
import { Search, Filter } from "lucide-react";
import AddCourseModal from "./AddCourseModal";

const SearchBar = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 px-4 sm:px-6 md:px-8 py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
      {/* Search Input */}
      <div className="flex items-center w-full sm:w-[65%] bg-gray-50 border border-gray-200 rounded-lg px-3 py-2">
        <Search className="text-gray-400 w-5 h-5 mr-2 shrink-0" />
        <input
          type="text"
          placeholder="Search by course name or code..."
          className="w-full bg-transparent focus:outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
        <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-sm sm:text-base w-full sm:w-auto">
          <Filter className="w-4 h-4" />
          Filter
        </button>

        {/* <button
          onClick={() => setShowAddModal(true)}
          className="bg-[#1173D4] text-white px-4 py-2 rounded-lg hover:bg-[#0d5cad] transition text-sm sm:text-base w-full sm:w-auto"
        >
          + Add Course
        </button> */}
      </div>
      {showAddModal && (
        <AddCourseModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};

export default SearchBar;
