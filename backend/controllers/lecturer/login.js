import Lecturer from "../../models/lecturers.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const loginLecturer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        status: "failed",
        error: "Please provide both email and password",
      });
    }

    // Find lecturer by email
    const lecturer = await Lecturer.findOne({ contact: email });

    if (!lecturer) {
      return res.status(401).json({
        status: "failed",
        error: "Invalid login credentials",
      });
    }

    // Compare passwords
    try {
      const match = await bcrypt.compare(password, lecturer.password);

      if (!match) {
        return res.status(401).json({
          status: "failed",
          error: "Invalid login credentials",
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        {
          id: lecturer._id,
          role: "lecturer",
          email: lecturer.contact,
          name: lecturer.name,
          department: lecturer.department,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );

      // Set JWT token in HTTP-only cookie
      const isProduction = process.env.NODE_ENV === "production";
      res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        path: "/",
        maxAge: 24 * 3600 * 1000,
      });

      // Return success without sending token in body
      return res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        user: {
          id: lecturer._id,
          email: lecturer.contact,
          name: lecturer.name,
          department: lecturer.department,
        },
        role: "lecturer",
      });
    } catch (error) {
      console.error("Password comparison error:", error);
      return res.status(500).json({
        status: "failed",
        error: "Error during login process",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: "failed",
      error: "Failed to process login request",
    });
  }
};

export default loginLecturer;
