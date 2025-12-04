import e from "express";
import Classes from "../../models/class.js";
import lecturer from "../../models/lecturers.js";
import Course from "../../models/courses.js";
import Student, { attendance } from "../../models/students.js";
import students from "../../models/students.js";
import mongoose from "mongoose";
import { processCheckIn } from "../../services/checkinService.js";

export async function createSession(req, res) {
  console.log(req.body);
  try {
    let instructor = await lecturer.findById(req.user.id);
    let courseProps = await Course.findOne({
      courseCode: req.body.courseCode,
    }).select("courseTitle level");
    if (!instructor) {
      return res
        .status(404)
        .json({ status: "fail", message: "Lecturer not found" });
    }
    if (!req.body.department || !req.body.courseCode) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }

    let Class = await Classes({
      level: courseProps.level,
      department: req.body.department,
      courseTitle: courseProps.courseTitle,
      instructorId: req.user.id,
      courseCode: req.body.courseCode,
    });
    await Class.save();
    let course = await Course.findOne({ courseCode: req.body.courseCode });
    if (course) {
      course.numberOfClassesHeld += 1;
      await course.save();
    }
    console.log(Class);
    console.log(instructor);
    // let classSession = Class.toObject();
    return res.status(201).json({
      status: "success",
      message: "Class created successfully",
      data: { ...Class._doc, instructorName: instructor.name },
    });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
}

export async function getSessions(req, res) {
  try {
    let classes = await Classes.find({ instructorId: req.user.id });
    return res.status(200).json({
      status: "success",
      results: classes.length,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}

export async function fetchStudentDetails(req, res) {
  try {
    let studentId = req.body.studentId;
    let student = await Student.findOne({ matricNumber: studentId })
      .select("biometricData fullname matricNumber department level")
      .lean()
      .exec();
    if (!student) {
      return res
        .status(404)
        .json({ status: "failed", message: "Student not found" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "student found", data: student });
  } catch (err) {
    res.status(500).json({ status: "failed", message: err.message });
  }
}

export async function checkIn(req, res) {
  try {
    const { studentId, classId } = req.body;

    // Validate required fields
    if (!studentId || !classId) {
      return res.status(400).json({
        status: "failed",
        message: "Student ID and Class ID are required",
      });
    }

    // Use the service to process check-in (handles authorization, attendance ratio, etc.)
    const result = await processCheckIn(studentId, classId);

    if (!result.success) {
      return res.status(400).json({
        status: "failed",
        message: result.message,
      });
    }

    return res.status(201).json({
      status: "success",
      message: result.message,
      data: result.data,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "An unexpected error occurred",
      error: error.message,
    });
  }
}

export async function getSessionAttendanceLog(req, res) {
  try {
    const { classId } = req.params;

    // Validate classId
    if (!classId) {
      return res.status(400).json({
        status: "failed",
        message: "Class ID is required",
      });
    }

    // Verify the class exists and belongs to the current lecturer
    const classSession = await Classes.findById(classId);
    if (!classSession) {
      return res.status(404).json({
        status: "failed",
        message: "Class session not found",
      });
    }

    // Check if the current user is the instructor of this class
    if (classSession.instructorId !== req.user.id) {
      return res.status(403).json({
        status: "failed",
        message: "You do not have permission to view this class attendance log",
      });
    }

    // Fetch all attendance records for this class
    const attendanceRecords = await attendance
      .find({ classId: classId })
      .lean()
      .exec();

    // Populate student details for each attendance record
    const attendanceWithDetails = await Promise.all(
      attendanceRecords.map(async (record) => {
        const student = await Student.findById(record.studentId)
          .select("fullname matricNumber email phone department")
          .lean()
          .exec();
        return {
          ...record,
          studentDetails: student || {},
        };
      })
    );

    return res.status(200).json({
      status: "success",
      message: "Attendance log retrieved successfully",
      data: {
        classSession: {
          _id: classSession._id,
          courseTitle: classSession.courseTitle,
          courseCode: classSession.courseCode,
          department: classSession.department,
          level: classSession.level,
          createdAt: classSession.createdAt,
        },
        attendance: attendanceWithDetails,
        totalPresent: attendanceRecords.length,
      },
    });
  } catch (error) {
    console.error("Get session attendance log error:", error);
    res.status(500).json({
      status: "failed",
      message: error.message || "Failed to fetch attendance log",
    });
  }
}
