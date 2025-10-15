import mongoose from "mongoose";
import express from "express";
import Student from "../../../models/students.js";

// Student login controller
const loginStudent = async (req, res) => {
  try {
    const { matricNumber, password } = req.body;
    let identifier = matricNumber;
    // Check if the student exists
    const student = await Student.findOne({
      or: [{ matricNumber: identifier }, { email: identifier }],
      phone: identifier,
    });

    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }
    // Check if the password is correct
    const isPasswordValid = await student.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }
    // Generate a token (you can use JWT or any other method)
    const token = student.generateAuthToken();
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default loginStudent;
