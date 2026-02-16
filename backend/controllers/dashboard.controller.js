import Student from "../models/students.js";
import isAuthenticated from "../middleware/authenticate.js";
import attendanceService from "../services/attendanceService.js";

// Controller to get student dashboard data
export const getStudentDashboard = async (req, res) => {
  try {
    const studentId = req.user.id;
    const student = await Student.findById(studentId).select(
      "-password -biometricData",
    );
    if (!student) {
      return res
        .status(404)
        .json({ status: "failed", message: "Student data not found" });
    }
    // compute realtime attendance summary
    try {
      const summary =
        await attendanceService.computeStudentAttendanceSummary(studentId);
      const payload = {
        ...student.toObject(),
        rateOfClassesAttended: summary.rate,
        classesAttended: summary.attended,
        totalClasses: summary.total,
      };
      return res.status(200).json({ status: "success", student: payload });
    } catch (err) {
      // Fallback to returning student doc if attendance computation fails
      return res.status(200).json({ status: "success", student });
    }
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
