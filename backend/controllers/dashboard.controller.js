import Student from "../models/students.js";
import isAuthenticated from "../middleware/authenticate.js";

// Controller to get student dashboard data
export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.student.id;
    const student = await Student.findById(studentId).select("-password -biometricData");
    if (!student) {
      return res.status(404).json({ message: "Student not data not found" });
        }   
        res.status(200).json({ student });
    } catch (error) {       
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// You can add more dashboard-related controllers here

export default  getStudentDashboard ;