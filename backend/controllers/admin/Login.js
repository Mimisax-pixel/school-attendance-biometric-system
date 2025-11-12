import admin from "../../models/admin.js";
import jwt from "jsonwebtoken";

const loginadmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingAdmin = await admin.findOne({ email });
    if (!existingAdmin) {
      console.log("Admin not found with email:", email);
      return res
        .status(404)
        .json({
          status: "failed",
          message: "Admin not found",
          isauthenticated: false,
        });
    }
    if (existingAdmin.password !== password) {
      console.log("Incorrect password for admin:", email);
      return res.status(401).json({
        status: "failed",
        message: "Incorrect password",
        isauthenticated: false,
      });
    }
    let token = jwt.sign(
      { id: existingAdmin._id, role: "admin" },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: process.env.NODE_ENV === "production" ? true : false,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({
      status: "success",
      message: "Admin logged in successfully",
      isauthenticated: true,
      adminId: existingAdmin._id,
      role: "admin",
    });
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({
      status: "failed",
      message: "Server error",
      isauthenticated: false,
    });
  }
};

export default loginadmin;
