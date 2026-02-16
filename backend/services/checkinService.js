import Classes from "../models/class.js";
import Student from "../models/students.js";
import { attendance } from "../models/students.js";
import getCurrentSession from "./getCurrentSession.js";
import attendanceService from "./attendanceService.js";

/**
 * Process student check-in for a class session
 * - Verify student belongs to the class department/level
 * - Record attendance
 * - Update student present count
 * - Calculate attendance ratio
 * @param {string} studentId - Student matric number
 * @param {string} classId - Class session ID
 * @returns {Object} { success: boolean, message: string, data?: Object, error?: string }
 */
export async function processCheckIn(studentId, classId) {
  try {
    let currentSession = await getCurrentSession();
    // Step 1: Fetch class session
    const classSession = await Classes.findById(classId);
    if (!classSession) {
      return { success: false, message: "Class session not found" };
    }

    // Step 2: Fetch student details
    const student = await Student.findOne({ _id: studentId });
    if (!student) {
      return { success: false, message: "Student not found" };
    }

    // Step 3: Authorization - verify student belongs to the class department and level
    if (student.department !== classSession.department) {
      return {
        success: false,
        message: `Student department (${student.department}) does not match class department (${classSession.department})`,
      };
    }

    if (student.level !== classSession.level) {
      return {
        success: false,
        message: `Student level (${student.level}) does not match class level (${classSession.level})`,
      };
    }

    // Step 4: Check if student already checked in
    const existingCheckIn = await attendance.findOne({
      studentId: studentId,
      classId: classId,
    });
    if (existingCheckIn) {
      return {
        success: false,
        message: "Student has already checked in for this class",
      };
    }

    // Step 5: Record attendance
    const attendanceRecord = new attendance({
      studentId: studentId,
      classId: classId,
      session: currentSession,
    });
    await attendanceRecord.save();

    // Step 6: Compute realtime metrics (do not persist computed fields)
    const numberPresent =
      await attendanceService.countAttendanceForClass(classId);
    const attendanceRatio =
      await attendanceService.computeAttendanceRatioForClass(classId);

    // Compute student's overall attendance rate in realtime (do not persist)
    const studentAttendanceRate =
      await attendanceService.computeStudentAttendanceRate(student._id);

    return {
      success: true,
      message: "Check-in successful",
      data: {
        attendanceRecord,
        updatedClass: {
          ...classSession._doc,
          numberOfStudentPresent: numberPresent,
          attendanceRatio,
        },
        studentAttendanceRate,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Check-in failed",
      error: error.message,
    };
  }
}
