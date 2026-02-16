/**
 * Student Data Controller
 * Handles fetching student-specific data including grades and attendance
 */

import Student, { grades, attendance } from "../../models/students.js";
import Course from "../../models/courses.js";
import Classes from "../../models/class.js";
import { successResponse, errorResponse } from "../../utils/response.js";
import { logger } from "../../utils/logger.js";
import attendanceService from "../../services/attendanceService.js";
import getCurrentSession from "../../services/getCurrentSession.js";

/**
 * Get student's course grades
 */
export const getStudentGrades = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Fetch student's grades
    const studentGrades = await grades
      .find({ studentid: studentId })
      .select("courseCode courseTitle grade semester year");

    if (!studentGrades || studentGrades.length === 0) {
      logger.info("No grades found for student", { studentId });
      return successResponse(res, [], "No grades found yet");
    }

    logger.info("Student grades retrieved", {
      studentId,
      count: studentGrades.length,
    });
    successResponse(
      res,
      studentGrades,
      "Student grades retrieved successfully",
    );
  } catch (error) {
    logger.error("Error fetching student grades", error);
    errorResponse(res, "Failed to fetch grades", 500, error);
  }
};

/**
 * Get student's attendance records by course
 */
export const getStudentAttendanceRecords = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Get student info
    const student = await Student.findById(studentId);
    if (!student) {
      logger.warn("Student not found", { studentId });
      return errorResponse(res, "Student not found", 404);
    }

    // Get all courses the student is enrolled in
    const enrolledCourses = student.courses || [];

    if (enrolledCourses.length === 0) {
      logger.info("Student not enrolled in any courses - falling back to attendance records", { studentId });
      // Fallback: derive attended courses from attendance records
      const currentSession = await getCurrentSession();
      const possibleStudentIds = [];
      if (student.matricNumber) possibleStudentIds.push(student.matricNumber);
      if (student._id) possibleStudentIds.push(student._id.toString());

      // fetch all attendance docs for this student
      const studentAttendanceDocs = await attendance.find({ studentId: { $in: possibleStudentIds } }).lean();

      if (!studentAttendanceDocs || studentAttendanceDocs.length === 0) {
        return successResponse(res, [], "No attendance records found for current session");
      }

      // determine class IDs from attendance and lookup classes to filter by current session
      const attendedClassIdsAll = [...new Set(studentAttendanceDocs.map((a) => a.classId.toString()))];
      const attendedClassesAll = await Classes.find({ _id: { $in: attendedClassIdsAll } }).select("_id session courseCode courseTitle").lean();
      const attendedClasses = attendedClassesAll.filter((c) => c.session === currentSession);

      if (!attendedClasses || attendedClasses.length === 0) {
        return successResponse(res, [], "No attendance records found for current session");
      }

      // map classes by id for quick lookup
      const classMap = new Map(attendedClasses.map((c) => [c._id.toString(), c]));

      // Aggregate attendance counts per courseCode for classes in current session
      const agg = {};
      for (const doc of studentAttendanceDocs) {
        const cls = classMap.get(doc.classId.toString());
        if (!cls) continue; // skip attendance for classes outside current session
        const code = cls.courseCode || "UNKNOWN";
        if (!agg[code]) agg[code] = { courseCode: code, courseTitle: cls.courseTitle || "Unknown Course", classesAttended: 0 };
        agg[code].classesAttended += 1;
      }

      const attendanceRecords = await Promise.all(
        Object.values(agg).map(async (entry) => {
          const totalClasses = await attendanceService.getTotalClassesForCourse(entry.courseCode, currentSession);
          const attendanceRate = totalClasses > 0 ? Math.round((entry.classesAttended / totalClasses) * 100) : 0;
          return {
            courseCode: entry.courseCode,
            courseTitle: entry.courseTitle,
            totalClasses,
            classesAttended: entry.classesAttended,
            attendanceRate: `${attendanceRate}%`,
          };
        }),
      );

      logger.info("Derived attendance records from attendance collection", { studentId, count: attendanceRecords.length });
      return successResponse(res, attendanceRecords, "Student attendance records retrieved from attendance log");
    }

    // Get course details
    const courseDetails = await Course.find({
      courseCode: { $in: enrolledCourses },
    }).select("courseCode courseTitle creditunits semester");
    // Current academic session
    const currentSession = await getCurrentSession();

    // Get attendance records for each course by computing counts from Classes and Attendance
    const attendanceRecords = await Promise.all(
      enrolledCourses.map(async (courseCode) => {
        const course = courseDetails.find((c) => c.courseCode === courseCode);
        const totalClasses = await attendanceService.getTotalClassesForCourse(
          courseCode,
          currentSession,
        );
        const classesAttended =
          await attendanceService.getStudentClassesAttendedForCourse(
            studentId,
            courseCode,
            currentSession,
          );

        const attendanceRate =
          totalClasses > 0
            ? Math.round((classesAttended / totalClasses) * 100)
            : 0;

        return {
          courseCode,
          courseTitle: course?.courseTitle || "Unknown Course",
          totalClasses,
          classesAttended,
          attendanceRate: `${attendanceRate}%`,
        };
      }),
    );

    logger.info("Student attendance records retrieved", {
      studentId,
      count: attendanceRecords.length,
    });
    successResponse(
      res,
      attendanceRecords,
      "Student attendance records retrieved successfully",
    );
  } catch (error) {
    logger.error("Error fetching student attendance", error);
    errorResponse(res, "Failed to fetch attendance records", 500, error);
  }
};

/**
 * Get student's registered courses
 */
export const getStudentCourses = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Get student info
    const student = await Student.findById(studentId);
    if (!student) {
      logger.warn("Student not found", { studentId });
      return errorResponse(res, "Student not found", 404);
    }

    const enrolledCourses = student.courses || [];

    // Get detailed course information
    const courses = await Course.find({
      courseCode: { $in: enrolledCourses },
    }).select("courseCode courseTitle creditunits level semester lecturerId");

    logger.info("Student courses retrieved", {
      studentId,
      count: courses.length,
    });
    successResponse(res, courses, "Student courses retrieved successfully");
  } catch (error) {
    logger.error("Error fetching student courses", error);
    errorResponse(res, "Failed to fetch courses", 500, error);
  }
};

/**
 * Get student's overall academic performance
 */
export const getStudentPerformance = async (req, res) => {
  try {
    const studentId = req.user.id;

    // Get all grades
    const studentGrades = await grades.find({ studentid: studentId });

    if (!studentGrades || studentGrades.length === 0) {
      logger.info("No grades found for performance calculation", { studentId });
      return successResponse(
        res,
        { gpa: 0, totalCredits: 0, gradesCount: 0 },
        "No grades found yet",
      );
    }

    // Calculate GPA (assuming A=4.0, B=3.0, C=2.0, D=1.0, F=0.0)
    const gradePoints = {
      A: 4.0,
      B: 3.0,
      C: 2.0,
      D: 1.0,
      F: 0.0,
    };

    let totalPoints = 0;
    let totalCourses = studentGrades.length;

    studentGrades.forEach((grade) => {
      const points = gradePoints[grade.grade] || 0;
      totalPoints += points;
    });

    const gpa = (totalPoints / totalCourses).toFixed(2);

    logger.info("Student performance calculated", { studentId, gpa });
    successResponse(
      res,
      { gpa, totalCourses },
      "Student performance data retrieved",
    );
  } catch (error) {
    logger.error("Error calculating student performance", error);
    errorResponse(res, "Failed to calculate performance", 500, error);
  }
};

export default {
  getStudentGrades,
  getStudentAttendanceRecords,
  getStudentCourses,
  getStudentPerformance,
};
