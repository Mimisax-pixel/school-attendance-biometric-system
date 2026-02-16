# Quick Reference Guide

## New Files Created

### Backend Utilities

- `backend/utils/response.js` - Standardized response helper functions
- `backend/utils/logger.js` - Structured logging utility
- `backend/middleware/errorHandler.js` - Centralized error handling
- `backend/middleware/requestLogger.js` - Request logging middleware
- `backend/middleware/validateRequest.js` - Input validation middleware
- `backend/validation/schemas.js` - Validation schemas for all endpoints
- `backend/config/swagger.js` - Swagger/OpenAPI configuration

### Frontend Services & Testing

- `frontend/src/services/apiService.js` - Centralized API service layer
- `frontend/src/test/setup.js` - Vitest setup and global mocks
- `frontend/src/test/utils.js` - Testing utilities and helpers
- `frontend/src/test/example.test.js` - Example test templates

### Frontend Refactored Hooks (Examples)

- `frontend/src/hooks/useAddCourse.refactored.js`
- `frontend/src/hooks/useCourses.refactored.jsx`
- `frontend/src/hooks/useDeleteCourse.refactored.js`
- `frontend/src/hooks/useAttendance.refactored.js`

### Documentation

- `IMPLEMENTATION_IMPROVEMENTS.md` - Detailed implementation overview
- `SETUP_GUIDE.md` - Getting started and common tasks
- `MIGRATION_CHECKLIST.md` - Checklist for progressive migration
- `QUICK_REFERENCE.md` - This file

---

## Updated Files

**Backend:**

- `backend/package.json` - Added new dependencies
- `backend/index.js` - Integrated middleware and Swagger
- `backend/.env.example` - Enhanced environment variables
- `backend/middleware/authenticate.js` - Updated to use new response utilities
- `backend/controllers/admin/register.js` - Updated to use new utilities

**Frontend:**

- `frontend/package.json` - Added testing dependencies and scripts
- `frontend/vite.config.js` - Added Vitest configuration

---

## Response Format Reference

### Success Response

```javascript
{
  success: true,
  status: "success",
  message: "Operation successful",
  data: { /* your data */ },
  timestamp: "2024-02-16T10:30:00Z"
}
```

### Error Response

```javascript
{
  success: false,
  status: "error",
  message: "Error message",
  timestamp: "2024-02-16T10:30:00Z"
}
```

### Validation Error Response

```javascript
{
  success: false,
  status: "validation_error",
  message: "Validation failed",
  errors: [
    {
      field: "email",
      message: "email must be a valid email"
    }
  ],
  timestamp: "2024-02-16T10:30:00Z"
}
```

---

## Common Commands

### Backend Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Check API documentation
curl http://localhost:5000/api-docs

# Health check
curl http://localhost:5000/health
```

### Frontend Commands

```bash
# Start development
npm run dev

# Run tests
npm test

# Watch mode for tests
npm test -- --watch

# Test UI
npm run test:ui

# Coverage report
npm run test:coverage

# Build for production
npm run build

# Check linting
npm run lint
```

---

## API Service Usage Examples

### Courses

```javascript
import { courseService } from "../services/apiService.js";

// Get all courses
const courses = await courseService.getAllCourses();

// Create course
const newCourse = await courseService.createCourse({
  courseCode: "CS101",
  courseName: "Intro to CS",
  unit: 3,
  semester: "First",
});

// Update course
await courseService.updateCourse(courseId, updateData);

// Delete course
await courseService.deleteCourse(courseId);
```

### Departments

```javascript
import { departmentService } from "../services/apiService.js";

// Get all departments
const depts = await departmentService.getAllDepartments();

// Create department
const newDept = await departmentService.createDepartment({
  department_name: "Computer Science",
});
```

### Attendance

```javascript
import { attendanceService } from "../services/apiService.js";

// Start session
await attendanceService.startSession(courseId, startTime);

// Record attendance
await attendanceService.recordAttendance(studentId, sessionId, biometricData);

// Get session attendance
const records = await attendanceService.getSessionAttendance(sessionId);

// End session
await attendanceService.endSession(sessionId);
```

### Authentication

```javascript
import { authService } from "../services/apiService.js";

// Admin registration
await authService.registerAdmin(adminData);

// Login
const response = await authService.loginAdmin(email, password);

// Student login
const response = await authService.loginStudent(email, password);

// Logout
await authService.logout();
```

---

## Hook Usage Examples

### Reading Data

```javascript
import { useCourses } from "../hooks/useCourses.refactored.jsx";

function CourseList() {
  const { courses, isLoading, error } = useCourses();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {courses.map((course) => (
        <li key={course._id}>{course.courseName}</li>
      ))}
    </ul>
  );
}
```

### Mutating Data

```javascript
import { useAddCourse } from "../hooks/useAddCourse.refactored.js";

function AddCourseForm() {
  const { addCourse, isLoading, error } = useAddCourse();

  const handleSubmit = (formData) => {
    addCourse(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={isLoading}>
        {isLoading ? "Adding..." : "Add Course"}
      </button>
      {error && <p className="error">{error.message}</p>}
    </form>
  );
}
```

### Complex Operations

```javascript
import { useRecordAttendance } from '../hooks/useAttendance.refactored.js';

function AttendanceMarker() {
  const { recordAttendance, isLoading } = useRecordAttendance();

  const handleMark = async (studentId, sessionId, biometricData) => {
    recordAttendance({ studentId, sessionId, biometricData });
  };

  return (
    <button onClick={() => handleMark(...)} disabled={isLoading}>
      Mark Attendance
    </button>
  );
}
```

---

## Logging Examples

```javascript
import { logger } from "../utils/logger.js";

// Info - general information
logger.info("User logged in", { userId: "123", email: "user@email.com" });

// Warning - something unexpected but not critical
logger.warn("Failed login attempt", { email: "user@email.com", attempts: 3 });

// Error - something went wrong
logger.error("Database connection failed", error);

// Debug - detailed information for development
logger.debug("Processing request", { path: "/courses", duration: 45 });

// Request logging (automatic)
logger.request("GET", "/api/v1/courses", 200, 125);
```

---

## Validation Examples

### Register Admin

```javascript
import { validateRequest } from "../middleware/validateRequest.js";
import { authSchemas } from "../validation/schemas.js";

router.post(
  "/admin/register",
  validateRequest(authSchemas.register),
  registerAdmin,
);
```

### Create Course

```javascript
router.post("/course", validateRequest(courseSchemas.create), createCourse);
```

---

## Environment Variables Quick Reference

```env
# Essential
DB_CONNECTION_STRING=mongodb://...
JWT_SECRET=your-secret-key
PORT=5000
FRONTEND_URL=http://localhost:5173

# Optional
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
LOG_LEVEL=info
SESSION_TIMEOUT=3600000
```

---

## File Structure Overview

```
📦 school-attendance-biometric-system
├── 📄 IMPLEMENTATION_IMPROVEMENTS.md  ← Detailed overview
├── 📄 SETUP_GUIDE.md                 ← Getting started
├── 📄 MIGRATION_CHECKLIST.md         ← Migration guide
├── 📄 QUICK_REFERENCE.md             ← This file
│
├── backend/
│   ├── 📁 utils/
│   │   ├── response.js              ✨ NEW - Response helpers
│   │   └── logger.js                ✨ NEW - Logging utility
│   ├── 📁 middleware/
│   │   ├── errorHandler.js          ✨ NEW - Error handling
│   │   ├── requestLogger.js         ✨ NEW - Request logging
│   │   ├── validateRequest.js       ✨ NEW - Input validation
│   │   ├── authenticate.js          ⭐ UPDATED
│   │   └── verifyrole.js
│   ├── 📁 validation/
│   │   └── schemas.js               ✨ NEW - Validation schemas
│   ├── 📁 config/
│   │   └── swagger.js               ✨ NEW - Swagger config
│   ├── .env.example                 ⭐ UPDATED
│   ├── package.json                 ⭐ UPDATED
│   └── index.js                     ⭐ UPDATED
│
└── frontend/
    ├── 📁 src/
    │   ├── 📁 services/
    │   │   └── apiService.js         ✨ NEW - API services
    │   ├── 📁 hooks/
    │   │   ├── useAddCourse.refactored.js        ✨ NEW
    │   │   ├── useCourses.refactored.jsx         ✨ NEW
    │   │   ├── useDeleteCourse.refactored.js     ✨ NEW
    │   │   ├── useAttendance.refactored.js       ✨ NEW
    │   │   └── ...existing hooks
    │   └── 📁 test/
    │       ├── setup.js              ✨ NEW - Test setup
    │       ├── utils.js              ✨ NEW - Test utilities
    │       └── example.test.js       ✨ NEW - Example tests
    ├── package.json                  ⭐ UPDATED
    └── vite.config.js                ⭐ UPDATED

Legend: ✨ NEW | ⭐ UPDATED
```

---

## Troubleshooting Quick Tips

| Issue                     | Solution                                                        |
| ------------------------- | --------------------------------------------------------------- |
| Port 5000 already in use  | Change PORT in .env                                             |
| MongoDB connection failed | Check DB_CONNECTION_STRING, ensure MongoDB is running           |
| CORS errors               | Verify FRONTEND_URL in backend .env matches actual frontend URL |
| Swagger docs not loading  | Ensure swagger-jsdoc and swagger-ui-express are installed       |
| Tests not running         | Reinstall devDependencies: `npm install`                        |
| API calls failing         | Check backend is running, verify CORS settings                  |
| Hot reload not working    | Restart dev server: `npm run dev`                               |

---

## Performance Tips

1. **Use staleTime in queries** - Prevents unnecessary refetches
2. **Invalidate selectively** - Only invalidate affected queries
3. **Mock API in tests** - Don't make real API calls in tests
4. **Log selectively** - Filter debug logs in production
5. **Cache responses** - Use React Query's caching

---

## Security Notes

1. **Store JWT_SECRET safely** - Never commit to version control
2. **Use HTTPS in production** - Update FRONTEND_URL and CORS settings
3. **Validate all inputs** - Always use validation middleware
4. **Sanitize data** - Before displaying user input
5. **Handle errors securely** - Don't expose sensitive info in errors

---

## Getting Help

1. Check **IMPLEMENTATION_IMPROVEMENTS.md** for detailed docs
2. Review example implementations in `.refactored.js` files
3. Check test examples in `src/test/`
4. Visit Swagger docs: `/api-docs`
5. Review git commits for implementation details

---

## Next Steps

1. ✅ Read IMPLEMENTATION_IMPROVEMENTS.md
2. ✅ Follow SETUP_GUIDE.md to get started
3. ✅ Use MIGRATION_CHECKLIST.md for progressive updates
4. ✅ Implement changes phase by phase
5. ✅ Run tests regularly: `npm test`
6. ✅ Deploy with confidence!

Happy coding! 🚀
