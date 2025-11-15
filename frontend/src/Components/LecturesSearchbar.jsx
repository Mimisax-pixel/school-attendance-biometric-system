import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center px-4 sm:px-8 md:px-12 lg:px-20 xl:px-32 2xl:px-48 py-6 sm:py-8 md:py-12 lg:py-16">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center justify-between w-full max-w-[1100px] mx-auto"
      >
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search Lecturers by Name, Department or Courses..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full
            border border-gray-300 rounded-xl
            py-3 sm:py-4 md:py-5
            pl-4 sm:pl-6 md:pl-8 lg:pl-10
            pr-12
            font-medium text-gray-700 placeholder-gray-400
            text-sm sm:text-base md:text-lg lg:text-xl
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            shadow-sm hover:shadow-md
            transition-all duration-300
          "
        />

        {/* Search Icon Button */}
        <button
          type="submit"
          className="
            absolute right-3 sm:right-5 md:right-6 lg:right-8
            flex items-center justify-center
            text-gray-500 hover:text-blue-600
            transition-colors duration-200
          "
        >
          <Search
            className="w-5 sm:w-6 md:w-7 lg:w-8"
            strokeWidth={2}
          />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
