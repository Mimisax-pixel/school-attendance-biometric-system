import Student, { attendance, grades } from "../../models/students.js";
import Course from "../../models/courses.js";
import Lecturer from "../../models/lecturers.js";

const adminDashboardController = async (req, res) => {
  try {
    // Count totals
    const totalStudents = await Student.countDocuments();
    const totalLecturers = await Lecturer.countDocuments();
    const totalCourses = await Course.countDocuments();

    // Average attendance by level
    const totalAttendaceRecordsAverage = async () => {
      let averageByLevel = [];
      for (let level = 100; level <= 500; level += 100) {
        const attendanceLevel = await attendance.find({
          level: level.toString(),
        });

        if (attendanceLevel.length === 0) {
          averageByLevel.push({ level, average: 0 });
          continue;
        }

        let total = 0;
        for (let i = 0; i < attendanceLevel.length; i++) {
          total += attendanceLevel[i].attendedclasses;
        }

        const average = total / attendanceLevel.length;
        averageByLevel.push({ level, average });
      }
      return averageByLevel;
    };

    // Total classes held
    const totalClassesHeld = async () => {
      const courses = await Course.find({});
      let totalClasses = 0;
      for (const course of courses) {
        totalClasses += course.numberOfclassesheld?.length || 0;
      }
      return totalClasses;
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
          totalClasses += course.numberOfclassesheld?.length || 0;
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
    res
      .status(500)
      .json({
        status: "failed",
        message: "Server error",
        error: error.message,
      });
  }
};

export default adminDashboardController;
