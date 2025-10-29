import mongoose from "mongoose";
import express from "express";
import Student from "../../../models/students.js";

const router = express.Router();
// Register a new student

const registerStudent = async (req, res) => {
  try {
    const {
      fullname,
      email,
      phone,
      department,
      level,
      matricNumber,
      biometricData,
    } = req.body;
    console.log(req.body);
    const password = req.body.password || "password123";
    const biometric = biometricData || "biometric_placeholder";
    // Validate required fields
    if (
      !email ||
      !phone ||
      !password ||
      !department ||
      !level ||
      !matricNumber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check for existing student
    const existingStudent = await Student.findOne({
      $or: [{ email }, { phone }, { matricNumber }, { biometricData }],
    });
    if (existingStudent) {
      console.log("Existing student found:", existingStudent);
      return res.status(400).json({
        message:
          "Student with provided email, phone, matric number, or biometric data already exists",
      });
    }
    // Create new student
    const newStudent = new Student({
      fullname,
      email,
      password,
      phone,
      department,
      level,
      matricNumber,
      biometricData: biometric + email,
    });
    await newStudent.save();
    console.log("student registered successfully");

    res.status(201).json({
      message: "Student registered successfully",
      student: {
        id: newStudent._id,
        name: newStudent.fullname,
        email: newStudent.email,
      },
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default registerStudent;
