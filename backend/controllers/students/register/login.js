import mongoose from "mongoose";
import Student from "../../../models/students.js";
import jwt from "jsonwebtoken";

export default async function loginStudent(req, res) {
  try {
    const { matricNumber, password } = req.body;
    let identifier = matricNumber;
    // Allow login with email or phone as well
    if (!identifier) {
      if (!identifier || !password) {
        return res
          .status(400),
          status: "failed",
          .json({ message: "matricnumber and password are required" });
      }
    }
    // Find student by email, phone, or matric number
    const student = await Student.findOne({
      $or: [
        { email: identifier },
        { phone: identifier },
        { matricNumber: identifier },
      ],
    });

    if (!student) {
      return res.status(404).json({
        status: "failed",
        message: "Student not found",
      });
    }
    // Check password
    if (student.password !== password) {
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid password" });
    }
    // Successful login
    let token = jwt.sign(
      { id: student._id, role: "student" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
    });
    res.status(200).json({
      status: "success",
      message: "Login successful",
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
      },
      role: "student",
    });
  } catch (error) {
    console.error("Error during student login:", error);
    res.status(500).json({ message: "Server error" });
  }
}
