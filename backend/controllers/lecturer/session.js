import e from "express";
import Classes from "../../models/class.js";
import lecturer from "../../models/lecturers.js";
import Course from "../../models/courses.js";
import Student, { attendance } from "../../models/students.js";
import students from "../../models/students.js";
import mongoose from "mongoose";

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
    let student = await Student.findOne({ matricNumber: studentId }).select(
      "biometricData fullname matricNumber department level"
    ).lean().exec();
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
    let { studentId, classId } = req.body;
    if (!studentId || !classId) {
      return res
        .status(400)
        .json({ status: "failed", message: "All fields are required" });
    }
    let attendanceRecord = attendance({
      studentId: studentId,
      classId: classId,
    });
    attendanceRecord.save();
    let addNewStudent = await Classes.updateOne(
      { _id: classId },
      { $inc: { numberOfStudentsPresent: 1 } }
    );
    await addNewStudent.save()
    return res
      .status(201)
      .json({
        status: "success",
        message: "Check-in successful",
        data: attendanceRecord,
      });
  } catch (error) {
    res.status(500).json({ status: "failed", message: error.message });
  }
}
