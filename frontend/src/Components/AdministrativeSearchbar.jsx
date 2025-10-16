import React, { useState } from 'react'
import { Calendar, ChevronDown, Search } from 'lucide-react';

const AdministrativeSearchbar = ({onSearch}) => {
     const [query, setQuery] = useState("");
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearch) onSearch(query);
      };
  return (
    <div className=" px-20 lg:px-20">
      <h2 className="text-3xl font-bold">Administrative Log</h2>
      <p className="mb-10 text-gray-500 text-base font-medium">
        Track all systen activities, including users login, data modification,
        and report generation.
      </p>
      <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 items-center">
        <div>
          <h4 className="text-lg font-medium text-gray-500 mb-2">Search</h4>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex items-center w-[28px]"
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
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-500 mb-2">
            Action Types
          </h4>
          <div className="border border-gray-300 flex justify-between items-center px-4 py-3 rounded-2xl">
            <button>All Actions</button>
            <ChevronDown />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-500 mb-2">
            Action Types
          </h4>
          <div className="border border-gray-300 flex justify-between items-center px-4 py-3 rounded-2xl">
            <button>All Actions</button>
            <ChevronDown />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-500 mb-2">
            {" "}
            Action Types
          </h4>
          <div className="border border-gray-300 flex justify-between items-center px-4 py-3 rounded-2xl">
            <button>mm/dd/yyyy</button>
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdministrativeSearchbar
