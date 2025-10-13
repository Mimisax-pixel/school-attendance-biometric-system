import React from "react";
import { useState } from "react";
import { ChevronDown, MoreVertical, MoreVerticalIcon, Search, TrendingDownIcon } from "lucide-react"; // Import the icon from lucide-react


const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <div className="flex items-center justify-between px-20 lg:px-20 py-20 relative">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full max-w-[1100px]"
      >
        <button
          type="submit"
          className="px-4 py-2  text-white rounded-r-md  flex items-center justify-center absolute right-[-1]"
        >
          <Search size={16} className=" text-gray-500 text-xl" />
        </button>
        <input
          type="text"
          placeholder="Search by course code or title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-10 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-gray-500 text-lg"
        />
      </form>
      <div className="border border-gray-300  flex items-center rounded-xl">
        <MoreVerticalIcon className="ml-4"/>
        <button className="flex-1 px-8 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#32333B] font-medium text-lg">
          Department
        </button>
        <ChevronDown className="mr-4"/>
      </div>
    </div>
  );
};

export default SearchBar;
