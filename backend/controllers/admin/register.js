import admin from "../../models/admin.js";
import bcrypt from "bcryptjs";

const registerAdmin = async (req, res) => {
  try {
    console.log(req.body);
    let { fullname, email, password, securityquestion, securityanswer } =
      req.body;
    // Check if admin with the same email already exists
    const existingAdmin = await admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        status: "failed",
        message: "Admin with this email already exists",
      });
    }
    // Hash password then create new admin
    const plainPassword = password || "admin123";
    const hashed = await bcrypt.hash(plainPassword, 10);
    // Create new admin
    const newAdmin = new admin({
      fullname,
      email,
      password: hashed,
      securityquestion,
      securityanswer,
    });
    await newAdmin.save();
    res.status(201).json({
      status: "success",
      message: "Admin registered successfully",
      adminId: newAdmin._id,
    });
  } catch (error) {
    res.status(500).json({
      status: "success",
      message: "Server error",
      error: error.message,
    });
  }
};

export default registerAdmin;
