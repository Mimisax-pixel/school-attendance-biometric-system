
import React from "react";
import Sidebar from "../Components/Sidebar";
import Dashboard from "../Components/DashBoard";


const AdminDashboard = () => {
  return (
    <div className="flex  gap-10 ">
      {/* <Sidebar /> */}
      <Dashboard />
    </div>
  );
};

export default AdminDashboard;
