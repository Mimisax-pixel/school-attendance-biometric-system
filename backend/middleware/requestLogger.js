/**
 * Request Logging Middleware
 * Logs all incoming requests with timing information
 */

import { logger } from "../utils/logger.js";

export const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  const originalSend = res.send;

  // Override res.send to capture response info
  res.send = function (data) {
    const duration = Date.now() - startTime;
    logger.request(req.method, req.originalUrl, res.statusCode, duration);
    originalSend.call(this, data);
  };

  next();
};
