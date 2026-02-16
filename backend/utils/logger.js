/**
 * Structured Logger using Console with timestamps
 * In production, consider using Winston or Pino
 */

const LOG_LEVELS = {
  ERROR: "ERROR",
  WARN: "WARN",
  INFO: "INFO",
  DEBUG: "DEBUG",
};

const getTimestamp = () => {
  return new Date().toISOString();
};

const formatLog = (level, message, data = null) => {
  const timestamp = getTimestamp();
  const logEntry = {
    timestamp,
    level,
    message,
    ...(data && { data }),
  };
  return logEntry;
};

export const logger = {
  error: (message, error) => {
    const logEntry = formatLog(LOG_LEVELS.ERROR, message, error);
    console.error(
      `[${logEntry.timestamp}] ${LOG_LEVELS.ERROR}: ${message}`,
      error,
    );
    return logEntry;
  },

  warn: (message, data) => {
    const logEntry = formatLog(LOG_LEVELS.WARN, message, data);
    console.warn(
      `[${logEntry.timestamp}] ${LOG_LEVELS.WARN}: ${message}`,
      data,
    );
    return logEntry;
  },

  info: (message, data) => {
    const logEntry = formatLog(LOG_LEVELS.INFO, message, data);
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[${logEntry.timestamp}] ${LOG_LEVELS.INFO}: ${message}`,
        data || "",
      );
    }
    return logEntry;
  },

  debug: (message, data) => {
    if (process.env.NODE_ENV === "development") {
      const logEntry = formatLog(LOG_LEVELS.DEBUG, message, data);
      console.debug(
        `[${logEntry.timestamp}] ${LOG_LEVELS.DEBUG}: ${message}`,
        data || "",
      );
      return logEntry;
    }
  },

  request: (method, path, statusCode, duration) => {
    const logEntry = {
      timestamp: getTimestamp(),
      type: "REQUEST",
      method,
      path,
      statusCode,
      duration: `${duration}ms`,
    };
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `[${logEntry.timestamp}] ${method} ${path} - ${statusCode} (${duration}ms)`,
      );
    }
    return logEntry;
  },
};

export default logger;
