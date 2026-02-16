import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { unauthorizedResponse } from "../utils/response.js";
import { logger } from "../utils/logger.js";

const isAuthenticated = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    logger.warn("No token provided", { path: req.path });
    return unauthorizedResponse(res, "No token provided, authorization denied");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    logger.warn("Invalid token", { error: err.message });
    return unauthorizedResponse(res, "Token is not valid");
  }
};

export default isAuthenticated;
