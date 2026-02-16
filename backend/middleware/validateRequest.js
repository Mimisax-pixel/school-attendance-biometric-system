/**
 * Request Validation Middleware
 * Validates incoming request data against predefined schemas
 */

import { validateData } from "../validation/schemas.js";
import { validationErrorResponse } from "../utils/response.js";
import { logger } from "../utils/logger.js";

/**
 * Create validation middleware for a specific schema
 * @param {object} schema - Validation schema
 * @returns {function} - Express middleware
 */
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const validation = validateData(req.body, schema);

    if (!validation.valid) {
      logger.warn("Validation failed", {
        path: req.path,
        errors: validation.errors,
      });
      return validationErrorResponse(res, validation.errors);
    }

    next();
  };
};
