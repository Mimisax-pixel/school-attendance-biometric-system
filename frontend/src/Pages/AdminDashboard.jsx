
import React,{useState} from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/DashBoard";


const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="flex bg-gray-50 min-h-screen overflow-x-hidden w-full">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;
