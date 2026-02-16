/**
 * Swagger/OpenAPI Configuration
 * API Documentation and specification
 */

export const swaggerConfig = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Attendance Biometric System API",
      version: "1.0.0",
      description:
        "API documentation for the School Attendance Biometric System. This system manages student attendance using biometric data.",
      contact: {
        name: "API Support",
        email: "support@schoolattendance.com",
      },
      license: {
        name: "ISC",
      },
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development server",
      },
      {
        url: "https://api.schoolattendance.com/api/v1",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "JWT Authorization header",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
          description: "Cookie-based authentication",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            status: {
              type: "string",
              example: "error",
            },
            message: {
              type: "string",
              example: "An error occurred",
            },
            timestamp: {
              type: "string",
              format: "date-time",
              example: "2024-02-16T10:30:00Z",
            },
          },
          required: ["success", "status", "message", "timestamp"],
        },
        ValidationError: {
          type: "object",
          properties: {
            success: {
              type: "boolean",
              example: false,
            },
            status: {
              type: "string",
              example: "validation_error",
            },
            message: {
              type: "string",
              example: "Validation failed",
            },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                    example: "email",
                  },
                  message: {
                    type: "string",
                    example: "email must be a valid email",
                  },
                },
              },
            },
            timestamp: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Admin: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            fullname: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "admin@school.com",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
          },
          required: ["_id", "fullname", "email"],
        },
        Course: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            courseCode: {
              type: "string",
              example: "CS101",
            },
            courseName: {
              type: "string",
              example: "Introduction to Computer Science",
            },
            unit: {
              type: "number",
              example: 3,
            },
            semester: {
              type: "string",
              example: "First",
              enum: ["First", "Second"],
            },
            department: {
              type: "string",
              example: "Computer Science",
            },
          },
          required: ["courseCode", "courseName", "unit", "semester"],
        },
        Department: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "507f1f77bcf86cd799439011",
            },
            department_name: {
              type: "string",
              example: "Computer Science",
            },
            description: {
              type: "string",
              example: "Department of computer science",
            },
          },
          required: ["department_name"],
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/**/*.js", "./controllers/**/*.js"],
};

export default swaggerConfig;
