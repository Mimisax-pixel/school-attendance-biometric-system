import mongoose from "mongoose";
import Lecturer from "../../models/lecturers.js";
import isAuthenticated from "../../middleware/authenticate.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";

const registerLecturer = async (req, res) => {
  try {
    const { email, password, fullName, department } = req.body;
    console.log(req.body);
    

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

    // Hash password and save new lecturer
    const hashed = await bcrypt.hash(password, 10);
    const lecturer = new Lecturer({
      contact: email,
      password: hashed,
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

export { registerLecturer };

// Additional admin lecturer management controllers
export async function getLecturers(req, res) {
  try {
    const lecturers = await Lecturer.find().select("-password").lean();
    return res
      .status(200)
      .json({ status: "success", results: lecturers.length, data: lecturers });
  } catch (error) {
    console.error("Error fetching lecturers", error);
    return res
      .status(500)
      .json({ status: "failed", error: "Failed to fetch lecturers" });
  }
}

export async function searchLecturers(req, res) {
  try {
    const { q } = req.query;
    if (!q)
      return res
        .status(400)
        .json({ status: "failed", error: "Query parameter q is required" });
    const regex = new RegExp(q, "i");
    const lecturers = await Lecturer.find({
      $or: [{ name: regex }, { contact: regex }, { department: regex }],
    })
      .select("-password")
      .lean();
    return res
      .status(200)
      .json({ status: "success", results: lecturers.length, data: lecturers });
  } catch (error) {
    console.error("Error searching lecturers", error);
    return res
      .status(500)
      .json({ status: "failed", error: "Failed to search lecturers" });
  }
}

export async function updateLecturer(req, res) {
  try {
    const { id } = req.params;
    const payload = {};
    const { name, department, contact, password, courses_assigned } = req.body;
    if (name) payload.name = name;
    if (department) payload.department = department;
    if (contact) payload.contact = contact;
    if (typeof courses_assigned !== "undefined")
      payload.courses_assigned = courses_assigned;
    if (password) payload.password = await bcrypt.hash(password, 10);

    const updated = await Lecturer.findByIdAndUpdate(id, payload, { new: true })
      .select("-password")
      .lean();
    if (!updated)
      return res
        .status(404)
        .json({ status: "failed", error: "Lecturer not found" });
    return res
      .status(200)
      .json({ status: "success", message: "Lecturer updated", data: updated });
  } catch (error) {
    console.error("Error updating lecturer", error);
    return res
      .status(500)
      .json({ status: "failed", error: "Failed to update lecturer" });
  }
}

export async function deleteLecturer(req, res) {
  try {
    const { id } = req.params;
    const deleted = await Lecturer.findByIdAndDelete(id).lean();
    if (!deleted)
      return res
        .status(404)
        .json({ status: "failed", error: "Lecturer not found" });
    return res
      .status(200)
      .json({ status: "success", message: "Lecturer deleted" });
  } catch (error) {
    console.error("Error deleting lecturer", error);
    return res
      .status(500)
      .json({ status: "failed", error: "Failed to delete lecturer" });
  }
}
