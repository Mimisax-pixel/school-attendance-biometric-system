import React, { useState } from "react";
import { ChevronDown, MoreVerticalIcon, Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 px-4 sm:px-6 md:px-10 lg:px-20 py-6 lg:py-10 w-full">
      
      {/* Search Input */}
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full lg:max-w-[700px] relative"
      >
        <input
          type="text"
          placeholder="Search by course code or title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-gray-600 text-base sm:text-lg"
        />
        <button
          type="submit"
          className="absolute right-3 flex items-center justify-center text-gray-500 hover:text-blue-600"
        >
          <Search size={20} />
        </button>
      </form>

      {/* Dropdown */}
      <div className="flex items-center border border-gray-300 rounded-xl w-full sm:w-auto justify-between sm:justify-start">
        <MoreVerticalIcon className="ml-4 text-gray-600" />
        <button className="flex-1 sm:flex-none px-6 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#32333B] font-medium text-base sm:text-lg">
          Department
        </button>
        <ChevronDown className="mr-4 text-gray-600" />
      </div>
    </div>
  );
};

export default SearchBar;
