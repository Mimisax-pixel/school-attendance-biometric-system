import Student from "../../models/students.js";

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
      "fullname matricNumber department rateOfClassesAttended"
    );

    const total = await Student.countDocuments(filter);
    const results = await query
      .skip(page * limit)
      .limit(limit)
      .lean();

    return res.status(200).json({ total, page, limit, results });
  } catch (error) {
    console.error("studentRecords error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export default studentRecords;
