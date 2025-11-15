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
import AdministrativeLog from "./Pages/AdministrativeLog";
import StudentRegForm from "./Pages/Admin/StudentRegForm";
import ProtectedRoute from "./Components/ProtectedRoute";
import NotFound from "./Pages/Notfound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard">
            <Route index element={<AdminDashboard />}></Route>
            <Route path=""></Route>
            <Route path="/admin/dashboard/alerts" element={<AlertsPage />} />
            <Route
              path="/admin/dashboard/administrativeLog"
              element={<AdministrativeLog />}
            />
            <Route
              path="/admin/dashboard/students"
              element={<BiometricAttendance />}
            />
              <Route path="/admin/dashboard/student/register" element={<StudentRegForm />}></Route>
            <Route
              path="/admin/dashboard/course-management"
              element={<CourseManagement />}
            />
            <Route path="/admin/dashboard/lecturers" element={<Lecturers />} />
          </Route>
          <Route path="/lecturer/dashboard">
            <Route index element={<Attendance />} />
          </Route>
          <Route path="/student/dashboard">
            <Route
              index
              element={<StudentsGrades />}
              />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />

        {/* <Route path="/lecturers" element={<Lecturers />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
