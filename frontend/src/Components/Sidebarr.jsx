// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ title, subtitle, menuItems }) => {
  return (
    <div className="fixed top-0 left-0 w-[300px] h-screen bg-gray-50 text-black p-10 overflow-y-auto">
      <h2 className="text-xl font-bold text-[#0E3668]">{title}</h2>
      <h3 className="font-semibold text-gray-500 text-xl mb-6">{subtitle}</h3>

      <div className="space-y-4">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center space-x-3 p-2 rounded cursor-pointer transition-colors duration-200 text-xl font-bold hover:bg-blue-500 hover:text-white"
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="flex space-x-3 mt-[20em]">
        <item.iconHelp />
        <p>Help & Support</p>
      </div>
    </div>
  );
};

export default Sidebar;
