import e from "express";
import Classes from "../../models/class.js";
import lecturer from "../../models/lecturer.js";
import Course from "../../models/courses.js";
import { attendance } from "../../models/students.js";
import students from "../../models/students.js"
import mongoose from "mongoose";

export async function createSession(req, res) {
  try {
    let instructor = await lecturer.findById(req.user.id);
    if (!instructor) {
      return res
        .status(404)
        .json({ status: "fail", message: "Lecturer not found" });
      }
      if(!req.body.level || !req.body.department || !req.body.courseTitle || !req.body.courseCode){
        return  res.status(400).json({ status: "failed", message: "All fields are required" });
      }

    let Class = await Classes({
      level: req.body.level,
      department: req.body.department,
      courseTitle: req.body.courseTitle,
      instructorId: req.user.id,
      courseCode: req.body.courseCode,
    });
    await Class.save();
    let course = await Course.findOne({courseCode: req.body.courseCode});
    if(course){
      course.numberOfClassesHeld +=1;
      await course.save();
    }
    return res.status(201).json({
      status: "success",
      message: "Class created successfully",
      data: Class,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
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

export  async function fetchStudentDetails(req,res) {
  try {
    let studentId = req.body.studentId;
    let student = await 
  } catch () {
    
  }
}

export default function checkIn(){

}

