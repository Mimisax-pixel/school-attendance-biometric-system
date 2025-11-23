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
import Dashboard from "./Components/DashBoard";
import LecturerSideBar from "./Components/LecturerSideBar";
import LecturerCourses from "./Components/LecturerCourses";
import Department from "./Pages/Department";
import Sidebar from "./Components/Sidebar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<ProtectedRoute />}>
          {/* THIS IS SECTION IS FOR THE ADMIN ROUTES  */}

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
            <Route
              path="/admin/dashboard/student/register"
              element={<StudentRegForm />}
            ></Route>
            <Route
              path="/admin/dashboard/course-management"
              element={<CourseManagement />}
            />
            <Route path="/admin/dashboard/lecturers" element={<Lecturers />} />
            <Route
              path="/admin/dashboard/departments"
              element={
                <div className="flex">
                  <Sidebar />
                  <Department />
                </div>
              }
            ></Route>
          </Route>

          {/* THIS IS SECTION IS FOR THE LECTURER ROUTES */}

          <Route path="/lecturer/dashboard">
            <Route
              index
              element={
                <>
                  <div className="flex">
                    <LecturerSideBar />
                    <Dashboard />
                  </div>
                </>
              }
            />
            <Route
              path="/lecturer/dashboard/attendance"
              element={<Attendance />}
            ></Route>
            <Route
              path="/lecturer/dashboard/courses"
              element={
                <div className="flex">
                  <LecturerSideBar />
                  <LecturerCourses />
                </div>
              }
            ></Route>
          </Route>
          <Route path="/student/dashboard">
            <Route index element={<StudentsGrades />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />

        {/* <Route path="/lecturers" element={<Lecturers />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
