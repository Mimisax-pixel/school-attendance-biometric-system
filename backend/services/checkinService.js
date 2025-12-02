import Classes from "../models/class.js";
import Student from "../models/students.js";
import { attendance } from "../models/students.js";

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
    });
    await attendanceRecord.save();

    // Step 6: Update class session - increment student present
    await Classes.updateOne(
      { _id: classId },
      { $inc: { numberOfStudentPresent: 1 } }
    );

    // Step 7: Calculate attendance ratio
    // Get all students in the same department and level
    const totalStudentsInDeptAndLevel = await Student.countDocuments({
      department: classSession.department,
      level: classSession.level,
    });

    if (totalStudentsInDeptAndLevel === 0) {
      return {
        success: false,
        message: "No students found in department and level",
      };
    }

    // Get updated class (with new numberOfStudentPresent)
    const updatedClass = await Classes.findById(classId);
    const attendanceRatio =
      (updatedClass.numberOfStudentPresent / totalStudentsInDeptAndLevel) * 100;

    // Step 8: Update attendance ratio in class session
    await Classes.updateOne(
      { _id: classId },
      { attendanceRatio: parseFloat(attendanceRatio.toFixed(2)) }
    );

    // Step 9: Recalculate and update this student's overall attendance rate
    // based on classes in the same department and level as the class session.
    // This keeps student rates up-to-date without a heavy cron job.
    try {
      const dept = classSession.department;
      const level = classSession.level;

      // Find all class IDs for this department+level
      const deptLevelClasses = await Classes.find({
        department: dept,
        level: level,
      })
        .select("_id")
        .lean();
      const deptLevelClassIds = deptLevelClasses.map((c) => c._id.toString());

      const totalDeptLevelClasses = deptLevelClassIds.length;

      if (totalDeptLevelClasses > 0) {
        // attendance records may store studentId as matricNumber or _id depending on usage.
        const possibleStudentIds = [];
        if (student.matricNumber) possibleStudentIds.push(student.matricNumber);
        if (student._id) possibleStudentIds.push(student._id.toString());

        const studentAttendanceCount = await attendance.countDocuments({
          studentId: { $in: possibleStudentIds },
          classId: { $in: deptLevelClassIds },
        });

        const studentAttendanceRate =
          (studentAttendanceCount / totalDeptLevelClasses) * 100;

        await Student.updateOne(
          { _id: student._id },
          {
            rateOfClassesAttended:
              Math.round(studentAttendanceRate * 100) / 100,
          }
        );
      }
    } catch (err) {
      // Non-fatal: if student rate update fails, log and continue — checkin already succeeded
      console.error("Failed to update student attendance rate:", err.message);
    }

    return {
      success: true,
      message: "Check-in successful",
      data: {
        attendanceRecord,
        updatedClass: {
          ...updatedClass._doc,
          numberOfStudentPresent: updatedClass.numberOfStudentPresent + 1,
          attendanceRatio: parseFloat(attendanceRatio.toFixed(2)),
        },
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
