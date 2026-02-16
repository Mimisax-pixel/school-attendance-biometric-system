/**
 * Centralized Error Handling Middleware
 * Catches and standardizes all errors across the application
 */

import { logger } from "../utils/logger.js";
import { errorResponse } from "../utils/response.js";

export const errorHandler = (err, req, res, next) => {
  // Log the error
  logger.error("Unhandled error", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });

  // If headers already sent, pass to default error handler
  if (res.headersSent) {
    return next(err);
  }

  // Handle specific error types
  if (err.name === "ValidationError") {
    // Mongoose validation error
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      status: "validation_error",
      message: "Validation failed",
      errors,
      timestamp: new Date().toISOString(),
    });
  }

  if (err.name === "CastError") {
    // MongoDB Cast error
    return errorResponse(res, "Invalid ID format", 400);
  }

  if (err.name === "MongoServerError" && err.code === 11000) {
    // Duplicate key error
    const field = Object.keys(err.keyValue)[0];
    return errorResponse(res, `${field} already exists`, 400);
  }

  if (err.name === "JsonWebTokenError") {
    // JWT error
    return errorResponse(res, "Invalid token", 401);
  }

  if (err.name === "TokenExpiredError") {
    // JWT expired
    return errorResponse(res, "Token expired", 401);
  }

  // Handle CORS errors
  if (err.message === "Not allowed by CORS") {
    return errorResponse(res, "CORS policy violation", 403);
  }

  // Generic error response
  const statusCode = err.statusCode || 500;
  const message = err.message || "An unexpected error occurred";

  return errorResponse(res, message, statusCode, err);
};

/**
 * Async error wrapper for route handlers
 * Wraps async functions to catch errors and pass to error handler
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
