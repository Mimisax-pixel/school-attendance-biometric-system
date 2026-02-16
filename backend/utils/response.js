/**
 * Standardized API Response Utility
 * Ensures consistent response format across all endpoints
 */

export const successResponse = (
  res,
  data,
  message = "Success",
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    status: "success",
    message,
    data,
    timestamp: new Date().toISOString(),
  });
};

export const errorResponse = (
  res,
  message = "An error occurred",
  statusCode = 500,
  error = null,
) => {
  return res.status(statusCode).json({
    success: false,
    status: "error",
    message,
    ...(process.env.NODE_ENV === "development" && error && { error }),
    timestamp: new Date().toISOString(),
  });
};

export const validationErrorResponse = (
  res,
  errors,
  message = "Validation failed",
) => {
  return res.status(400).json({
    success: false,
    status: "validation_error",
    message,
    errors,
    timestamp: new Date().toISOString(),
  });
};

export const unauthorizedResponse = (res, message = "Unauthorized access") => {
  return errorResponse(res, message, 401);
};

export const forbiddenResponse = (res, message = "Forbidden access") => {
  return errorResponse(res, message, 403);
};

export const notFoundResponse = (res, message = "Resource not found") => {
  return errorResponse(res, message, 404);
};
