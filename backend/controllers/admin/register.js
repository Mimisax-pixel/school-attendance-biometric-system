import admin from "../../models/admin.js";
import bcrypt from "bcryptjs";
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "../../utils/response.js";
import { logger } from "../../utils/logger.js";
import { validateData, authSchemas } from "../../validation/schemas.js";

const registerAdmin = async (req, res) => {
  try {
    // Validate request data
    const validation = validateData(req.body, authSchemas.register);
    if (!validation.valid) {
      logger.warn("Admin registration validation failed", {
        errors: validation.errors,
      });
      return validationErrorResponse(
        res,
        validation.errors,
        "Validation failed",
      );
    }

    const { fullname, email, password, securityquestion, securityanswer } =
      req.body;

    // Check if admin with the same email already exists
    const existingAdmin = await admin.findOne({ email });
    if (existingAdmin) {
      logger.warn("Duplicate email during admin registration", { email });
      return errorResponse(res, "Admin with this email already exists", 400);
    }

    // Hash password
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

    logger.info("Admin registered successfully", {
      adminId: newAdmin._id,
      email,
    });

    successResponse(
      res,
      {
        adminId: newAdmin._id,
        email: newAdmin.email,
        fullname: newAdmin.fullname,
      },
      "Admin registered successfully",
      201,
    );
  } catch (error) {
    logger.error("Error during admin registration", error);
    errorResponse(res, "Server error during registration", 500, error);
  }
};

export default registerAdmin;
