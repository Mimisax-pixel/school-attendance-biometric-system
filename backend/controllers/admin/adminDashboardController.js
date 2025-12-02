import Student from "../../models/students.js";
import Course from "../../models/courses.js";
import Lecturer from "../../models/lecturers.js";
import Classes from "../../models/class.js";

const adminDashboardController = async (req, res) => {
  try {
    // Count totals
    const totalStudents = await Student.countDocuments();
    const totalLecturers = await Lecturer.countDocuments();
    const totalCourses = await Course.countDocuments();

    // NOTE: student-based precomputed attendance averages were removed
    // in favor of the Classes.attendanceRatio-based computation below.

    // Total classes held (count of class sessions stored in `Classes` collection)
    const totalClassesHeld = async () => {
      return await Classes.countDocuments();
    };

    // Average attendance ratio by level (uses Classes.attendanceRatio)
    const totalCoursesAttendanceAverage = async () => {
      const levels = [100, 200, 300, 400, 500];
      const levelAverages = [];

      for (const level of levels) {
        const classesByLevel = await Classes.find({ level: level.toString() })
          .select("attendanceRatio")
          .lean();

        const count = classesByLevel.length;
        if (count === 0) {
          levelAverages.push({ level, average: 0, totalClasses: 0 });
          continue;
        }

        let sumRatio = 0;
        for (const cls of classesByLevel) {
          sumRatio +=
            typeof cls.attendanceRatio === "number" ? cls.attendanceRatio : 0;
        }

        const avg = Math.round((sumRatio / count) * 100) / 100;
        levelAverages.push({ level, average: avg, totalClasses: count });
      }

      // overall average across all classes
      const allClasses = await Classes.find().select("attendanceRatio").lean();
      const totalClasses = allClasses.length;
      const totalSum = allClasses.reduce(
        (s, c) =>
          s + (typeof c.attendanceRatio === "number" ? c.attendanceRatio : 0),
        0
      );
      const overallAverage =
        totalClasses > 0
          ? Math.round((totalSum / totalClasses) * 100) / 100
          : 0;

      return { levelAverages, overallAverage, totalClasses };
    };

    // Average attendance ratio by department per level (uses Classes.attendanceRatio)
    const departmentAttendanceAverage = async () => {
      const levels = [100, 200, 300, 400, 500];
      const levelDepartmentMap = {};

      // Get all classes with level, department, and attendanceRatio
      const allClasses = await Classes.find()
        .select("level department attendanceRatio")
        .lean();

      // Helper function to generate abbreviation from department name
      const getAbbreviation = (dept) => {
        return dept
          .split(/\s+/)
          .map((word) => word[0].toUpperCase())
          .join("");
      };

      // Group by level and then by department
      for (const cls of allClasses) {
        const level = cls.level;
        const dept = cls.department;

        if (!levelDepartmentMap[level]) {
          levelDepartmentMap[level] = {};
        }

        if (!levelDepartmentMap[level][dept]) {
          levelDepartmentMap[level][dept] = { sumRatio: 0, count: 0 };
        }

        levelDepartmentMap[level][dept].sumRatio +=
          typeof cls.attendanceRatio === "number" ? cls.attendanceRatio : 0;
        levelDepartmentMap[level][dept].count += 1;
      }

      // Calculate averages for each level and department
      const departmentByLevelAverages = levels.map((level) => {
        const levelStr = level.toString();
        const departmentMap = levelDepartmentMap[levelStr] || {};

        const departmentAverages = Object.entries(departmentMap)
          .map(([dept, { sumRatio, count }]) => ({
            department: dept,
            abbreviation: getAbbreviation(dept),
            average: count > 0 ? Math.round((sumRatio / count) * 100) / 100 : 0,
            totalClasses: count,
          }))
          .sort((a, b) => a.department.localeCompare(b.department));

        return {
          level,
          departments: departmentAverages,
        };
      });

      return departmentByLevelAverages;
    };

    // Await all results (use classes-based attendance averages)
    const [classesHeld, coursesAttendance, departmentAttendance] =
      await Promise.all([
        totalClassesHeld(),
        totalCoursesAttendanceAverage(),
        departmentAttendanceAverage(),
      ]);

    console.log(
      totalStudents,
      totalLecturers,
      totalCourses,
      classesHeld,
      coursesAttendance,
      departmentAttendance
    );

    // ✅ Send only plain JSON data
    res.json({
      status: "success",
      totalStudents,
      totalLecturers,
      totalCourses,
      totalClassesHeld: classesHeld,
      totalCoursesAttendanceAverage: coursesAttendance,
      departmentAttendanceAverage: departmentAttendance,
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
