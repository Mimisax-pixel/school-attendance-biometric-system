import mongoose from "mongoose";
import Lecturer from "../../models/lecturers.js";
import isAuthenticated from "../../middleware/authenticate.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const registerLecturer = async (req, res) => {
  try {
    const { email, password, fullName, department } = req.body;

    // Validate required fields
    if (!email || !password || !fullName || !department) {
      return res.status(400).json({
        status: "failed",
        error:
          "Missing required fields: email, password, fullName, and department are required",
      });
    }

    // Check if lecturer already exists
    const existingLecturer = await Lecturer.findOne({ contact: email }).lean();

    if (existingLecturer) {
      return res.status(409).json({
        status: "failed",
        error: "Lecturer already exists with this email",
      });
    }

    // Create and save new lecturer
    const lecturer = new Lecturer({
      contact: email,
      password: password,
      name: fullName,
      department: department,
    });

    await lecturer.save();

    // Return success response with lecturer data
    return res.status(201).json({
      status: "success",
      message: "Lecturer registered successfully",
    });
  } catch (error) {
    console.error("Error registering lecturer:");
    return res.status(500).json({
      status: "failed",
      error: "Failed to register lecturer",
    });
  }
};



export { registerLecturer};
