import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import AlertsPage from "./Pages/Admin/AlertsPage";
import Attendance from "./Pages/Admin/Attendance";
import StudentsGrades from "./Pages/Students/StudentsGrades";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/grades" element={<StudentsGrades />} />
      </Routes>
    </Router>
  );
}

export default App;

