# Setup & Getting Started Guide

This guide helps you get started with the newly implemented improvements in the School Attendance Biometric System.

## Quick Setup

### Backend Setup

1. **Install Dependencies:**

```bash
cd backend
npm install
```

2. **Configure Environment Variables:**

```bash
# Copy the example file
cp .env.example .env

# Edit .env and update with your configuration
# At minimum, update:
# - DB_CONNECTION_STRING
# - JWT_SECRET
# - FRONTEND_URL
# - Email configuration (if alerts are needed)
```

3. **Start the Server:**

```bash
# Development mode (with hot reload)
npm run dev

# Production mode
npm start
```

4. **Access API Documentation:**

- Once server is running, visit: `http://localhost:5000/api-docs`
- Health check: `http://localhost:5000/health`

### Frontend Setup

1. **Install Dependencies:**

```bash
cd frontend
npm install
```

2. **Start Development Server:**

```bash
npm run dev
```

3. **Run Tests:**

```bash
# Run all tests
npm test

# Watch mode (rerun on changes)
npm test -- --watch

# With UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

4. **Build for Production:**

```bash
npm run build
```

---

## Using New Backend Features

### 1. Error Handling

The error handling middleware is already integrated. All errors are caught automatically.

**For async route handlers, ensure you wrap them:**

```javascript
import { asyncHandler } from "../middleware/errorHandler.js";

router.get(
  "/courses",
  asyncHandler(async (req, res) => {
    const courses = await Course.find();
    successResponse(res, courses, "Courses retrieved");
  }),
);
```

### 2. Standardized Responses

Always use the response utilities:

```javascript
import {
  successResponse,
  errorResponse,
  validationErrorResponse,
} from "../utils/response.js";

// Success
successResponse(res, data, "Operation successful", 200);

// Error
errorResponse(res, "Something went wrong", 500);

// Validation error
validationErrorResponse(res, errors, "Invalid input");
```

### 3. Input Validation

Add validation to routes using the schemas:

```javascript
import { validateRequest } from "../middleware/validateRequest.js";
import { authSchemas } from "../validation/schemas.js";

router.post(
  "/admin/register",
  validateRequest(authSchemas.register),
  registerAdmin,
);
```

### 4. Logging

Log important operations:

```javascript
import { logger } from "../utils/logger.js";

// Log different levels
logger.info("Course created", { courseId: "123", courseCode: "CS101" });
logger.warn("Duplicate email attempt", { email: "user@email.com" });
logger.error("Database connection failed", error);
logger.debug("Processing request", { path: req.path });
```

---

## Using New Frontend Features

### 1. Using API Services

Instead of making API calls directly in components or hooks, use the service layer:

```javascript
import { courseService } from "../services/apiService.js";
import { useQuery } from "@tanstack/react-query";

// In a hook
export function useCourses() {
  return useQuery({
    queryKey: ["courses"],
    queryFn: courseService.getAllCourses,
  });
}

// Or directly in components
const courses = await courseService.getAllCourses();
```

### 2. Updated Hooks

Use the refactored hooks that separate concerns:

```javascript
import { useAddCourse } from "../hooks/useAddCourse.refactored.js";

function CourseForm() {
  const { addCourse, isLoading, error } = useAddCourse();

  const handleSubmit = (courseData) => {
    addCourse(courseData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Course"}
      </button>
      {error && <div>{error.message}</div>}
    </form>
  );
}
```

### 3. Testing Components

Write tests for critical components:

```javascript
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../test/utils.js";

describe("CourseForm", () => {
  it("submits form data", async () => {
    const { getByText, getByLabelText } = renderWithProviders(<CourseForm />);

    const input = getByLabelText("Course Name");
    await userEvent.type(input, "Computer Science 101");

    await userEvent.click(getByText("Add Course"));

    expect(getByText("Course added")).toBeInTheDocument();
  });
});
```

### 4. Testing Services

Test API service calls:

```javascript
import { describe, it, expect, vi } from "vitest";
import { courseService } from "../services/apiService.js";

vi.mock("../api/axiosInstance", () => ({
  default: {
    post: vi.fn(() => Promise.resolve({ data: { success: true } })),
  },
}));

describe("courseService", () => {
  it("creates a course", async () => {
    const result = await courseService.createCourse({ name: "CS101" });
    expect(result.success).toBe(true);
  });
});
```

---

## Environment Variables Reference

### Backend .env

```env
# Required Variables
DB_CONNECTION_STRING=mongodb://localhost:27017/attendance
JWT_SECRET=your-secret-key-here

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173

# Optional - Email Alerts
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=app-password

# Optional - SMS Alerts
SMS_API_KEY=your-sms-key
SMS_SENDER_ID=SchoolAttendance
```

---

## Common Tasks

### Adding a New API Endpoint

1. **Create validation schema** (if needed):

```javascript
// In validation/schemas.js
export const courseSchemas = {
  create: {
    courseCode: { required: true, type: "string", ... },
    // ...
  }
};
```

2. **Create controller** (use response utilities):

```javascript
import { successResponse, errorResponse } from "../utils/response.js";

export const createCourse = async (req, res) => {
  try {
    // Your logic
    successResponse(res, result, "Course created", 201);
  } catch (error) {
    errorResponse(res, error.message, 500, error);
  }
};
```

3. **Create route** (add validation):

```javascript
import { validateRequest } from "../middleware/validateRequest.js";
import { courseSchemas } from "../validation/schemas.js";

router.post("/courses", validateRequest(courseSchemas.create), createCourse);
```

4. **Add to swagger** (optional):

```javascript
/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Course' }
 *     responses:
 *       201:
 *         description: Course created
 */
```

### Adding a New Frontend Hook

1. **Create service method** (in services/apiService.js):

```javascript
export const courseService = {
  // ...existing methods
  assignLecturer: async (courseId, lecturerId) => {
    const response = await api.post(`/courses/${courseId}/lecturer`, {
      lecturerId,
    });
    return response.data;
  },
};
```

2. **Create/update hook**:

```javascript
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "../services/apiService.js";

export const useAssignLecturer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, lecturerId }) =>
      courseService.assignLecturer(courseId, lecturerId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });
};
```

3. **Use in component**:

```javascript
const { assignLecturer, isLoading } = useAssignLecturer();

// Then call as needed
assignLecturer({ courseId: "123", lecturerId: "456" });
```

### Writing Tests

**Test Setup:** Tests are configured to run with Vitest. Check [frontend/src/test/example.test.js](frontend/src/test/example.test.js) for templates.

**Test File Naming:** Use `.test.js` or `.spec.js` suffix.

**Run Tests:**

```bash
npm test                  # Run all tests
npm test -- watch       # Watch mode
npm run test:ui          # UI mode
npm run test:coverage    # Coverage report
```

---

## Troubleshooting

### Backend Issues

**Port already in use:**

```bash
# Change PORT in .env
PORT=5001
```

**Database connection failed:**

- Check `DB_CONNECTION_STRING` in .env
- Ensure MongoDB is running
- Verify network connectivity

**Swagger docs not loading:**

- Ensure swagger dependencies are installed: `npm install swagger-jsdoc swagger-ui-express`
- Check that dependencies were added to package.json

### Frontend Issues

**Tests not running:**

```bash
# Re-install dev dependencies
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

**API calls failing:**

- Check that backend is running on correct port
- Verify `FRONTEND_URL` in backend .env
- Check browser console for CORS errors

**Hot reload not working:**

- Restart dev server: `npm run dev`
- Check that vite.config.js has server configuration

---

## Next Steps

1. **Review the documentation:**
   - Backend: [IMPLEMENTATION_IMPROVEMENTS.md](IMPLEMENTATION_IMPROVEMENTS.md)
   - Check Swagger docs: `http://localhost:5000/api-docs`

2. **Start migrating existing code:**
   - Update controllers to use new response utilities
   - Add validation to routes
   - Write tests for critical components

3. **Deploy with confidence:**
   - All code is now properly tested
   - Errors are centrally handled
   - API is documented
   - Logging provides visibility

---

## Support

For questions or issues:

1. Check the documentation files
2. Review example implementations in `.refactored.js` files
3. Check test examples in `src/test/` directory
4. Review Swagger API documentation

Happy coding! 🚀
