import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import AlertsPage from "./Pages/Admin/AlertsPage";
import Attendance from "./Pages/Admin/Attendance";
import StudentsGrades from "./Pages/Students/StudentsGrades";
import AdminDashboard from "./Pages/AdminDashboard";
import BiometricAttendance from "./Pages/BiometricAttendance";
import CourseManagement from "./Pages/CourseManagement";
import Lecturers from "./Pages/Lecturers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/grades" element={<StudentsGrades />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/biometricAttendance" element={<BiometricAttendance />} />
        <Route path="/courseManagement" element={<CourseManagement />} />
        <Route path="/biometricAttendance" element={<BiometricAttendance />} />
        <Route path="/lecturers" element={<Lecturers/>} />
      </Routes>
    </Router>
  );
}

export default App;

