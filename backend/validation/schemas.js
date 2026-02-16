/**
 * Input Validation Schemas
 * Defines validation rules for all API endpoints
 */

export const authSchemas = {
  register: {
    fullname: {
      required: true,
      type: "string",
      minLength: 2,
      maxLength: 100,
    },
    email: {
      required: true,
      type: "email",
      maxLength: 255,
    },
    password: {
      required: true,
      type: "string",
      minLength: 6,
      maxLength: 255,
    },
    securityquestion: {
      required: false,
      type: "string",
      maxLength: 255,
    },
    securityanswer: {
      required: false,
      type: "string",
      maxLength: 255,
    },
  },
  login: {
    email: {
      required: true,
      type: "email",
    },
    password: {
      required: true,
      type: "string",
      minLength: 6,
    },
  },
};

export const courseSchemas = {
  create: {
    courseCode: {
      required: true,
      type: "string",
      minLength: 2,
      maxLength: 50,
    },
    courseName: {
      required: true,
      type: "string",
      minLength: 3,
      maxLength: 255,
    },
    unit: {
      required: true,
      type: "number",
      min: 1,
      max: 10,
    },
    semester: {
      required: true,
      type: "string",
      enum: ["First", "Second"],
    },
    department: {
      required: true,
      type: "string",
    },
  },
  update: {
    courseCode: {
      required: false,
      type: "string",
      minLength: 2,
      maxLength: 50,
    },
    courseName: {
      required: false,
      type: "string",
      minLength: 3,
      maxLength: 255,
    },
    unit: {
      required: false,
      type: "number",
      min: 1,
      max: 10,
    },
    semester: {
      required: false,
      type: "string",
      enum: ["First", "Second"],
    },
  },
};

export const departmentSchemas = {
  create: {
    department_name: {
      required: true,
      type: "string",
      minLength: 2,
      maxLength: 255,
    },
    description: {
      required: false,
      type: "string",
      maxLength: 1000,
    },
  },
};

export const sessionSchemas = {
  create: {
    courseID: {
      required: true,
      type: "string",
    },
    startTime: {
      required: true,
      type: "datetime",
    },
    endTime: {
      required: false,
      type: "datetime",
    },
  },
};

/**
 * Validate request data against schema
 * @param {object} data - Request data
 * @param {object} schema - Validation schema
 * @returns {object} - { valid: boolean, errors?: array }
 */
export const validateData = (data, schema) => {
  const errors = [];

  Object.keys(schema).forEach((field) => {
    const rule = schema[field];
    const value = data[field];

    // Check required fields
    if (
      rule.required &&
      (value === undefined || value === null || value === "")
    ) {
      errors.push({
        field,
        message: `${field} is required`,
      });
      return;
    }

    // Skip validation if field is not provided and not required
    if (!rule.required && !value) {
      return;
    }

    // Type validation
    if (rule.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors.push({
          field,
          message: `${field} must be a valid email`,
        });
      }
    } else if (rule.type === "number") {
      if (isNaN(value)) {
        errors.push({
          field,
          message: `${field} must be a number`,
        });
      } else {
        if (rule.min && Number(value) < rule.min) {
          errors.push({
            field,
            message: `${field} must be at least ${rule.min}`,
          });
        }
        if (rule.max && Number(value) > rule.max) {
          errors.push({
            field,
            message: `${field} must be at most ${rule.max}`,
          });
        }
      }
    } else if (rule.type === "string") {
      if (typeof value !== "string") {
        errors.push({
          field,
          message: `${field} must be a string`,
        });
      } else {
        if (rule.minLength && value.length < rule.minLength) {
          errors.push({
            field,
            message: `${field} must be at least ${rule.minLength} characters`,
          });
        }
        if (rule.maxLength && value.length > rule.maxLength) {
          errors.push({
            field,
            message: `${field} must be at most ${rule.maxLength} characters`,
          });
        }
      }
    }

    // Enum validation
    if (rule.enum && !rule.enum.includes(value)) {
      errors.push({
        field,
        message: `${field} must be one of: ${rule.enum.join(", ")}`,
      });
    }
  });

  return {
    valid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
};
