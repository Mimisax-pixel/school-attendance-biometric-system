import Student from "../models/students.js";
import isAuthenticated from "../middleware/authenticate.js";

// Controller to get student dashboard data
export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId).select(
      "-password -biometricData"
    );
    if (!student) {
      return res
        .status(404)
        .json({ status: "failed", message: "Student data not found" });
    }
    res.status(200).json({ status: "success", student });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: error.message,
    });
  }
};

// You can add more dashboard-related controllers here

export default getStudentDashboard;
