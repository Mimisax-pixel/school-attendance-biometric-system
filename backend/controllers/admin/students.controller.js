import Student from "../../models/students.js";
import attendanceService from "../../services/attendanceService.js";

const studentRecords = async (req, res) => {
  const studentId = req.query.studentId;
  const page = parseInt(req.query.page, 10) || 0;
  const department = req.query.department;
  const level = req.query.level;

  const filter = {};
  if (studentId) filter.matricNumber = studentId; // only add if provided
  if (department) filter.department = department;
  if (level) filter.level = level;

  try {
    const limit = parseInt(req.query.limit, 10) || 20; // default page size

    const query = Student.find(filter).select(
      "fullname email phone matricNumber department",
    );

    const total = await Student.countDocuments(filter);
    const results = await query
      .skip(page * limit)
      .limit(limit)
      .lean();

    // Compute realtime attendance rate for each student
    const resultsWithRate = await Promise.all(
      results.map(async (stu) => {
        try {
          const rate = await attendanceService.computeStudentAttendanceRate(
            stu._id,
          );
          return { ...stu, rateOfClassesAttended: rate };
        } catch (err) {
          return { ...stu, rateOfClassesAttended: 0 };
        }
      }),
    );

    return res.status(200).json({
      status: "success",
      total,
      page,
      limit,
      results: resultsWithRate,
    });
  } catch (error) {
    console.error("studentRecords error:", error);
    return res
      .status(500)
      .json({ status: "failed", error: "Internal server error" });
  }
};

export default studentRecords;
