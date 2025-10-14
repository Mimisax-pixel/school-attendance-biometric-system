import React from 'react'
import { GraduationCap, Bell } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between pt-10  px-20 lg:px-20">
        <p className="text-3xl font-bold">Course Management</p>
      <div className="flex gap-5">
        <Bell />
        <GraduationCap />
      </div>
    </div>
  );
}

export default Navbar
