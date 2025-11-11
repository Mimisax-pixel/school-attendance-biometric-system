import React from "react";
import { Bell } from "lucide-react";

const Navbar = ({Title}) => {
  return (
    <nav className="flex items-center justify-between bg-white border-b border-gray-200 px-4 sm:px-6 md:px-10 lg:px-16 h-[60px] sm:h-[70px] sticky top-0 z-20 w-full">
      {/* Page Title */}
      <h1 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 truncate">
        {Title}
      </h1>

      {/* Right Icons */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Notification Icon */}
        <button
          aria-label="Notifications"
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <Bell className="w-5 h-5 text-gray-600" />
        </button>

        {/* User Avatar */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-gray-200 cursor-pointer">
          <img
            src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
