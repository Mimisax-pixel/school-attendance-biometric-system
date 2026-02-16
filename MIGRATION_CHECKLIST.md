# Migration Checklist

Use this checklist to progressively migrate your existing code to use the new utilities and patterns.

## Backend Migration Checklist

### Phase 1: Setup (Required First)

- [ ] Install new dependencies: `npm install`
- [ ] Copy `.env.example` to `.env` and configure
- [ ] Verify server starts: `npm run dev`
- [ ] Verify Swagger docs load: `http://localhost:5000/api-docs`
- [ ] Verify health endpoint works: `http://localhost:5000/health`

### Phase 2: Core Middleware

- [ ] Error handler middleware is active in index.js ✅ (Already done)
- [ ] Request logger middleware is active in index.js ✅ (Already done)
- [ ] 404 handler is in place ✅ (Already done)

### Phase 3: Update Authentication Middleware

- [ ] Update [backend/middleware/authenticate.js](backend/middleware/authenticate.js) to use new response utilities ✅ (Already done)
- [ ] Update [backend/middleware/verifyrole.js](backend/middleware/verifyrole.js) to use new response utilities
  ```javascript
  import { unauthorizedResponse } from "../utils/response.js";
  // Update to use unauthorizedResponse instead of res.status(403).json(...)
  ```

### Phase 4: Update Controllers

#### Admin Controllers

- [ ] [backend/controllers/admin/register.js](backend/controllers/admin/register.js) ✅ (Already done)
- [ ] [backend/controllers/admin/Login.js](backend/controllers/admin/Login.js)
  - Replace response formatting with `successResponse`/`errorResponse`
  - Add input validation
  - Add logging
- [ ] [backend/controllers/admin/adminDashboardController.js](backend/controllers/admin/adminDashboardController.js)
  - Use new response format
  - Add error handling with `asyncHandler`
- [ ] [backend/controllers/admin/courses.js](backend/controllers/admin/courses.js)
  - Update all responses to use utilities
  - Add validation to POST/PUT operations
  - Add logging
- [ ] [backend/controllers/admin/students.controller.js](backend/controllers/admin/students.controller.js)
  - Update responses and validation
- [ ] [backend/controllers/admin/lecturer.controller.js](backend/controllers/admin/lecturer.controller.js)
  - Update responses and validation
- [ ] [backend/controllers/admin/department.js](backend/controllers/admin/department.js)
  - Update responses and validation
- [ ] [backend/controllers/admin/alertsController.js](backend/controllers/admin/alertsController.js)
  - Update responses and validation
- [ ] [backend/controllers/admin/academicSession.js](backend/controllers/admin/academicSession.js)
  - Update responses and validation
- [ ] [backend/controllers/admin/computeAttendance.js](backend/controllers/admin/computeAttendance.js)
  - Update responses and logging

#### Lecturer Controllers

- [ ] [backend/controllers/lecturer/login.js](backend/controllers/lecturer/login.js)
  - Update responses and validation
- [ ] [backend/controllers/lecturer/courses.js](backend/controllers/lecturer/courses.js)
  - Update responses
- [ ] [backend/controllers/lecturer/session.js](backend/controllers/lecturer/session.js)
  - Update responses

#### Student Controllers

- [ ] [backend/controllers/students/register/index.js](backend/controllers/students/register/index.js)
  - Update responses and validation

### Phase 5: Update Routes

#### Admin Routes

- [ ] [backend/routes/admin/register.js](backend/routes/admin/register.js)
  - Add validation middleware to POST routes
- [ ] [backend/routes/admin/courses.js](backend/routes/admin/courses.js)
  - Add validation middleware: `validateRequest(courseSchemas.create)`
- [ ] [backend/routes/admin/departments.js](backend/routes/admin/departments.js)
  - Add validation middleware
- [ ] [backend/routes/admin/lecturers.js](backend/routes/admin/lecturers.js)
  - Add validation middleware
- [ ] [backend/routes/admin/students.js](backend/routes/admin/students.js)
  - Add validation middleware
- [ ] [backend/routes/admin/alerts.js](backend/routes/admin/alerts.js)
  - Add validation middleware
- [ ] [backend/routes/admin/dashboard.js](backend/routes/admin/dashboard.js)
  - Already using apiVersion

#### Lecturer Routes

- [ ] [backend/routes/lecturers/login.js](backend/routes/lecturers/login.js)
  - Add validation middleware
- [ ] [backend/routes/lecturers/courses.js](backend/routes/lecturers/courses.js)
  - Wrap async handlers
- [ ] [backend/routes/lecturers/session.js](backend/routes/lecturers/session.js)
  - Add validation and error handling

#### Student Routes

- [ ] [backend/routes/students/register.js](backend/routes/students/register.js)
  - Add validation middleware
- [ ] [backend/routes/students/login.js](backend/routes/students/login.js)
  - Add validation middleware
- [ ] [backend/routes/students/dashboard.js](backend/routes/students/dashboard.js)
  - Ensure consistent responses

### Phase 6: Add Validation Schemas (as needed)

- [ ] Extend `validation/schemas.js` with any missing schemas
- [ ] Create validation schemas for all POST/PUT endpoints

### Phase 7: Logging

- [ ] Add logging to critical controller functions
- [ ] Log authentication attempts
- [ ] Log attendance operations
- [ ] Log admin actions

### Phase 8: Documentation

- [ ] Add JSDoc comments to route handlers for Swagger
- [ ] Update README.md with API documentation reference
- [ ] Document custom validation schemas

---

## Frontend Migration Checklist

### Phase 1: Setup (Required First)

- [ ] Install new dependencies: `npm install`
- [ ] Verify tests run: `npm test`
- [ ] Check Vitest UI: `npm run test:ui` (should show 0 tests)

### Phase 2: Service Layer Migration

#### Create/Verify Services

- [ ] [frontend/src/services/apiService.js](frontend/src/services/apiService.js) ✅ (Already created)
- [ ] Verify all API endpoints are covered in services
- [ ] Test each service method with mock data

#### Update Component Imports

- [ ] Find all components importing `axiosInstance` directly
  ```bash
  grep -r "import.*axiosInstance" src/
  ```
- [ ] Replace with service imports:
  ```javascript
  // Old: import api from '../api/axiosInstance';
  // New: import { courseService } from '../services/apiService';
  ```

### Phase 3: Hook Refactoring

#### Refactor Existing Hooks

Hooks to migrate (in priority order):

- [ ] [frontend/src/hooks/useAddCourse.js](frontend/src/hooks/useAddCourse.js)
  - Use provided `useAddCourse.refactored.js` as reference
  - Move to use `courseService.createCourse`

- [ ] [frontend/src/hooks/useCourses.jsx](frontend/src/hooks/useCourses.jsx)
  - Use provided `useCourses.refactored.jsx` as reference
  - Move to use `courseService.getAllCourses`

- [ ] [frontend/src/hooks/useDeleteCourse.js](frontend/src/hooks/useDeleteCourse.js)
  - Use provided `useDeleteCourse.refactored.js` as reference

- [ ] [frontend/src/hooks/useAttendance.js](frontend/src/hooks/useAttendance.js)
  - Use provided `useAttendance.refactored.js` as reference

- [ ] [frontend/src/hooks/useDepartments.js](frontend/src/hooks/useDepartments.js)
  - Update to use `departmentService`

- [ ] [frontend/src/hooks/useAddDepartment.js](frontend/src/hooks/useAddDepartment.js)
  - Update to use `departmentService.createDepartment`

- [ ] [frontend/src/hooks/useDeleteDepartment.js](frontend/src/hooks/useDeleteDepartment.js)
  - Update to use `departmentService.deleteDepartment`

- [ ] [frontend/src/hooks/useUpdateDepartment.js](frontend/src/hooks/useUpdateDepartment.js)
  - Update to use `departmentService.updateDepartment`

- [ ] [frontend/src/hooks/useLecturers.js](frontend/src/hooks/useLecturers.js)
  - Update to use `lecturerService`

- [ ] [frontend/src/hooks/useAddLecturer.js](frontend/src/hooks/useAddLecturer.js)
  - Update to use `lecturerService.createLecturer`

- [ ] [frontend/src/hooks/useDeleteLecturer.js](frontend/src/hooks/useDeleteLecturer.js)
  - Update to use `lecturerService.deleteLecturer`

- [ ] [frontend/src/hooks/useEditLecturer.js](frontend/src/hooks/useEditLecturer.js)
  - Update to use `lecturerService.updateLecturer`

- [ ] [frontend/src/hooks/useAdminDashboard.js](frontend/src/hooks/useAdminDashboard.js)
  - Update to use `dashboardService.getAdminDashboard`

### Phase 4: Component Updates

Update components to use refactored hooks and services:

#### Search for Old Patterns

```bash
# Find components using old hook patterns
grep -r "useAddCourse\|useCourses\|useDelete" src/Components/
grep -r "api\.post\|api\.get\|api\.put\|api\.delete" src/Components/
```

#### Update Components

- [ ] Update all component imports
- [ ] Test each component after update
- [ ] Ensure loading states work correctly
- [ ] Verify error handling

### Phase 5: Test Writing

#### Write Unit Tests

- [ ] Create tests for all custom hooks
  - Template: [frontend/src/test/example.test.js](frontend/src/test/example.test.js)
  - Use utilities: [frontend/src/test/utils.js](frontend/src/test/utils.js)

- [ ] Test critical components:
  - Login components
  - Attendance marking components
  - Admin dashboard
  - Course management

Example structure:

```javascript
import { describe, it, expect } from "vitest";
import { renderWithProviders } from "../test/utils.js";

describe("YourComponent", () => {
  it("renders correctly", () => {
    // Test code
  });
});
```

#### Test Services

- [ ] Mock API responses in service tests
- [ ] Test error handling
- [ ] Test data transformation (if any)

### Phase 6: Error Handling

Update error handling across components:

- [ ] Ensure all components display error messages
- [ ] Test error scenarios
- [ ] Add error logging
- [ ] Use consistent error message display

### Phase 7: Documentation

- [ ] Update component README (if exists)
- [ ] Add comments to complex hooks
- [ ] Document service usage in components
- [ ] Update main README with testing instructions

---

## Testing Checklist

### Unit Tests

- [ ] Test each custom hook
- [ ] Test service methods with mocked API
- [ ] Test component rendering
- [ ] Test user interactions

### Integration Tests

- [ ] Test form submissions
- [ ] Test API call flow with mocked responses
- [ ] Test error scenarios
- [ ] Test loading states

### Manual Testing

After migration, manually test:

- [ ] User registration flow
- [ ] Login functionality
- [ ] Course management
- [ ] Department management
- [ ] Attendance recording
- [ ] Dashboard displays

---

## Verification Checklist

### Backend

- [ ] All controllers use response utilities
- [ ] All routes have validation (where applicable)
- [ ] All async operations are wrapped with errorHandler/asyncHandler
- [ ] Critical operations are logged
- [ ] Swagger docs are complete
- [ ] Health check endpoint works
- [ ] No console.log statements (use logger instead)

### Frontend

- [ ] No direct API calls in components (all use services)
- [ ] All hooks use services
- [ ] All tests pass: `npm test`
- [ ] No ESLint errors: `npm run lint`
- [ ] Coverage is > 70% for critical code
- [ ] All environment variables configured

---

## Rollback Plan

If you need to rollback changes:

1. **Keep original files backed up**

   ```bash
   # In each modified file, keep original as .backup
   cp controllerFile.js controllerFile.js.backup
   ```

2. **Use git for version control**

   ```bash
   git commit -m "Migration checkpoint"
   git branch backup-before-migration
   ```

3. **Revert specific changes**

   ```bash
   # Revert individual file
   git checkout originalCommitHash -- filePath

   # Or revert specific commits
   git revert commitHash
   ```

---

## Migration Timeline Estimate

- **Phase 1 (Setup):** 30 minutes
- **Phase 2-3 (Backend Core):** 2-3 hours
- **Phase 4-5 (Update Controllers):** 4-6 hours
- **Phase 6 (Frontend Hooks):** 3-4 hours
- **Phase 7 (Testing):** 2-3 hours
- **Phase 8 (Verification & Fixes):** 2-3 hours

**Total Estimated Time:** 16-22 hours

Start with phases 1-3 (backend setup), then proceed with phases 4-5 in parallel with frontend work.

---

## Tips for Success

1. **Work systematically:** Follow the phases in order
2. **Test frequently:** Run tests after each significant change
3. **Commit often:** Make small, focused commits
4. **Document issues:** Note any blocking issues
5. **Get feedback:** Have team members review critical changes
6. **Keep original patterns:** Don't change more than necessary per commit
7. **Use git branches:** Create feature branches for large changes

Good luck with your migration! 🚀
