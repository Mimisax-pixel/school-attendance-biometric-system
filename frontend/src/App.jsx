import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./Components/Index";
import AlertsPage from "./Components/Admin/AlertsPage";
import Attendance from "./Components/Admin/Attendance";
import StudentsGrades from "./Components/Students/StudentsGrades";
import StudentRegForm from "./Components/Admin/StudentRegForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/grades" element={<StudentsGrades />} />
        <Route path="/admin/register/student" element={<StudentRegForm/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;

