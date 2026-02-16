import Classes from "../models/class.js";
import Student, { attendance } from "../models/students.js";
import getCurrentSession from "./getCurrentSession.js";

/**
 * Attendance service - compute attendance-related metrics in realtime
 */
const attendanceService = {
  async countAttendanceForClass(classId) {
    return await attendance.countDocuments({ classId });
  },

  async computeAttendanceRatioForClass(classId) {
    const cls = await Classes.findById(classId).lean();
    if (!cls) return 0;
    const present = await attendance.countDocuments({ classId });
    const totalStudents = await Student.countDocuments({
      department: cls.department,
      level: cls.level,
    });
    if (totalStudents === 0) return 0;
    return Math.round((present / totalStudents) * 10000) / 100; // two decimals
  },

  async getClassIdsForCourse(courseCode, session = null) {
    const sess = session || (await getCurrentSession());
    const classes = await Classes.find({ courseCode, session: sess })
      .select("_id")
      .lean();
    return classes.map((c) => c._id.toString());
  },

  async getTotalClassesForCourse(courseCode, session = null) {
    const ids = await this.getClassIdsForCourse(courseCode, session);
    return ids.length;
  },

  async getStudentClassesAttendedForCourse(
    studentId,
    courseCode,
    session = null,
  ) {
    const classIds = await this.getClassIdsForCourse(courseCode, session);
    if (classIds.length === 0) return 0;
    const possibleStudentIds = [];
    const student = await Student.findById(studentId)
      .select("matricNumber")
      .lean();
    if (!student) return 0;
    if (student.matricNumber) possibleStudentIds.push(student.matricNumber);
    if (student._id) possibleStudentIds.push(student._id.toString());

    return await attendance.countDocuments({
      studentId: { $in: possibleStudentIds },
      classId: { $in: classIds },
    });
  },

  async computeStudentAttendanceRate(studentId) {
    const student = await Student.findById(studentId)
      .select("department level matricNumber")
      .lean();
    if (!student) return 0;
    const currentSession = await getCurrentSession();
    const classes = await Classes.find({
      department: student.department,
      level: student.level,
      session: currentSession,
    })
      .select("_id")
      .lean();
    const classIds = classes.map((c) => c._id.toString());
    const totalClasses = classIds.length;
    if (totalClasses === 0) return 0;

    const possibleStudentIds = [];
    if (student.matricNumber) possibleStudentIds.push(student.matricNumber);
    if (student._id) possibleStudentIds.push(student._id.toString());

    const attended = await attendance.countDocuments({
      studentId: { $in: possibleStudentIds },
      classId: { $in: classIds },
    });

    return Math.round((attended / totalClasses) * 10000) / 100;
  },
  async computeStudentAttendanceSummary(studentId) {
    const student = await Student.findById(studentId)
      .select("department level matricNumber")
      .lean();
    if (!student) return { attended: 0, total: 0, rate: 0 };
    const currentSession = await getCurrentSession();
    const classes = await Classes.find({
      department: student.department,
      level: student.level,
      session: currentSession,
    })
      .select("_id")
      .lean();
    const classIds = classes.map((c) => c._id.toString());
    const totalClasses = classIds.length;
    if (totalClasses === 0) return { attended: 0, total: 0, rate: 0 };

    const possibleStudentIds = [];
    if (student.matricNumber) possibleStudentIds.push(student.matricNumber);
    if (student._id) possibleStudentIds.push(student._id.toString());

    const attended = await attendance.countDocuments({
      studentId: { $in: possibleStudentIds },
      classId: { $in: classIds },
    });
    const rate = Math.round((attended / totalClasses) * 10000) / 100;
    return { attended, total: totalClasses, rate };
  },
};

export default attendanceService;
