import Student, { attendance, grades } from "../../models/students.js";
import Course from "../../models/courses.js";
import Lecturer from "../../models/lecturers.js";
import Classes from "../../models/class.js";

const adminDashboardController = async (req, res) => {
  try {
    // Count totals
    const totalStudents = await Student.countDocuments();
    const totalLecturers = await Lecturer.countDocuments();
    const totalCourses = await Course.countDocuments();

    // Average attendance by level (using pre-computed rateOfClassesAttended field)
    const totalAttendaceRecordsAverage = async () => {
      const levels = ["100", "200", "300", "400", "500"];
      const levelAverages = [];

      for (const level of levels) {
        // Get all students at this level with their pre-computed attendance rates
        const studentsAtLevel = await Student.find({ level }).select(
          "rateOfClassesAttended"
        ).lean();

        if (studentsAtLevel.length === 0) {
          levelAverages.push({ level: Number(level), average: 0 });
          continue;
        }

        // Calculate average attendance rate for the level
        let totalAttendanceRate = 0;
        let studentsWithCourses = 0;

        for (const student of studentsAtLevel) {
          // Skip students with no computed rate (no courses)
          if (student.rateOfClassesAttended === null || student.rateOfClassesAttended === undefined) {
            continue;
          }
          totalAttendanceRate += student.rateOfClassesAttended;
          studentsWithCourses++;
        }

        // Average attendance rate for the level
        const levelAverage =
          studentsWithCourses > 0
            ? Math.round((totalAttendanceRate / studentsWithCourses) * 100) / 100
            : 0;
        levelAverages.push({
          level: Number(level),
          average: levelAverage,
        });
      }

      return levelAverages;
    };

    // Total classes held (count of class sessions stored in `Classes` collection)
    const totalClassesHeld = async () => {
      return await Classes.countDocuments();
    };

    // Average classes held by level
    const totalCoursesHeldAverage = async () => {
      let averageClassesByLevel = [];
      for (let level = 100; level <= 500; level += 100) {
        const coursesByLevel = await Course.find({ level: level.toString() });

        if (coursesByLevel.length === 0) {
          averageClassesByLevel.push({ level, total: 0 });
          continue;
        }

        let totalClasses = 0;
        for (const course of coursesByLevel) {
          totalClasses += course.numberOfClassesHeld || 0;
        }

        averageClassesByLevel.push({ level, total: totalClasses });
      }
      return averageClassesByLevel;
    };

    // Await all results
    const [attendanceAverages, classesHeld, coursesHeldAverage] =
      await Promise.all([
        totalAttendaceRecordsAverage(),
        totalClassesHeld(),
        totalCoursesHeldAverage(),
      ]);

    console.log(
      totalStudents,
      totalLecturers,
      totalCourses,
      attendanceAverages,
      classesHeld,
      coursesHeldAverage
    );
    console.log(classesHeld);

    // ✅ Send only plain JSON data
    res.json({
      status: "success",
      totalStudents,
      totalLecturers,
      totalCourses,
      totalAttendaceRecordsAverage: attendanceAverages,
      totalClassesHeld: classesHeld,
      totalCoursesHeldAverage: coursesHeldAverage,
    });
  } catch (error) {
    console.error("Error in adminDashboardController:", error);
    res.status(500).json({
      status: "failed",
      message: "Server error",
      error: error.message,
    });
  }
};

export default adminDashboardController;
