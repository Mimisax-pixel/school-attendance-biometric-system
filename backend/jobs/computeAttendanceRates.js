import Student from "../models/students.js";
import Classes from "../models/class.js";
import { attendance } from "../models/students.js";

/**
 * Compute and store attendance rate for each student.
 * Rate = (total attendance records / total classes for student's courses) * 100
 */
export const computeAttendanceRates = async () => {
  try {
    console.log("[Job] Starting attendance rate computation...");

    const students = await Student.find().lean();

    if (students.length === 0) {
      console.log("[Job] No students found.");
      return;
    }

    let updated = 0;
    let skipped = 0;

    for (const student of students) {
      // Skip if student has no courses
      if (!student.courses || student.courses.length === 0) {
        skipped++;
        continue;
      }

      // Count total classes for this student's courses
      const studentCourseClasses = await Classes.countDocuments({
        courseCode: { $in: student.courses },
      });

      if (studentCourseClasses === 0) {
        // No classes for this student's courses; set rate to 0
        await Student.updateOne(
          { _id: student._id },
          { rateOfClassesAttended: 0 }
        );
        updated++;
        continue;
      }

      // Count attendance records for this student
      const studentAttendanceCount = await attendance.countDocuments({
        studentId: student.matricNumber,
      });

      // Calculate student's attendance rate (percentage)
      const attendanceRate =
        (studentAttendanceCount / studentCourseClasses) * 100;

      // Store the rate (rounded to 2 decimals)
      await Student.updateOne(
        { _id: student._id },
        { rateOfClassesAttended: Math.round(attendanceRate * 100) / 100 }
      );

      updated++;
    }

    console.log(
      `[Job] Completed. Updated: ${updated}, Skipped: ${skipped}, Total: ${students.length}`
    );
  } catch (error) {
    console.error("[Job] Error computing attendance rates:", error.message);
  }
};

/**
 * Start the background job to run at regular intervals
 * @param {number} intervalMs - Interval in milliseconds (default: 1 hour)
 */
export const startAttendanceRateJob = (intervalMs = 60 * 60 * 1000) => {
  console.log(
    `[Job] Scheduling attendance rate computation every ${intervalMs / 1000 / 60} minutes`
  );

  // Run immediately on startup
  computeAttendanceRates();

  // Then run at regular intervals
  setInterval(computeAttendanceRates, intervalMs);
};
