/**
 * API Service Layer
 * Separates API calls from React components and hooks
 * Promotes reusability and testability
 */

import axios from "axios";
import api from "../api/axiosInstance";

// Authentication Services
export const authService = {
  registerAdmin: async (adminData) => {
    const response = await api.post("/admin/register", adminData);
    return response.data;
  },

  loginAdmin: async (email, password) => {
    const response = await api.post("/admin/login", { email, password });
    return response.data;
  },

  registerStudent: async (studentData) => {
    const response = await api.post("/student/register", studentData);
    return response.data;
  },

  loginStudent: async (email, password) => {
    const response = await api.post("/student/login", { email, password });
    return response.data;
  },

  loginLecturer: async (email, password) => {
    const response = await api.post("/lecturer/login", { email, password });
    return response.data;
  },

  logout: async () => {
    const response = await api.post("/logout");
    return response.data;
  },
};

// Course Services
export const courseService = {
  getAllCourses: async () => {
    const response = await api.get("/courses/all");
    return response.data;
  },

  getCourseById: async (courseId) => {
    const response = await api.get(`/courses/${courseId}`);
    return response.data;
  },

  createCourse: async (courseData) => {
    const response = await api.post("/courses/create", courseData);
    return response.data;
  },

  updateCourse: async (courseId, courseData) => {
    const response = await api.put(`/courses/${courseId}`, courseData);
    return response.data;
  },

  deleteCourse: async (courseId) => {
    const response = await api.delete(`/courses/${courseId}`);
    return response.data;
  },

  getCoursesByDepartment: async (departmentId) => {
    const response = await api.get(`/courses/department/${departmentId}`);
    return response.data;
  },
};

// Department Services
export const departmentService = {
  getAllDepartments: async () => {
    const response = await api.get("/departments/all");
    return response.data;
  },

  getDepartmentById: async (departmentId) => {
    const response = await api.get(`/departments/${departmentId}`);
    return response.data;
  },

  createDepartment: async (deptData) => {
    const response = await api.post("/departments/create", deptData);
    return response.data;
  },

  updateDepartment: async (departmentId, deptData) => {
    const response = await api.put(`/departments/${departmentId}`, deptData);
    return response.data;
  },

  deleteDepartment: async (departmentId) => {
    const response = await api.delete(`/departments/${departmentId}`);
    return response.data;
  },
};

// Attendance Services
export const attendanceService = {
  startSession: async (courseId, startTime) => {
    const response = await api.post("/attendance/start-session", {
      courseId,
      startTime,
    });
    return response.data;
  },

  recordAttendance: async (studentId, sessionId, biometricData) => {
    const response = await api.post("/attendance/record", {
      studentId,
      sessionId,
      biometricData,
    });
    return response.data;
  },

  getSessionAttendance: async (sessionId) => {
    const response = await api.get(`/attendance/session/${sessionId}`);
    return response.data;
  },

  getStudentAttendance: async (studentId, courseId) => {
    const response = await api.get(
      `/attendance/student/${studentId}/${courseId}`,
    );
    return response.data;
  },

  endSession: async (sessionId) => {
    const response = await api.post(`/attendance/end-session/${sessionId}`);
    return response.data;
  },
};

// Dashboard Services
export const dashboardService = {
  getAdminDashboard: async () => {
    const response = await api.get("/dashboard/admin");
    return response.data;
  },

  getStudentDashboard: async () => {
    const response = await api.get("/dashboard/student");
    return response.data;
  },

  getLecturerDashboard: async () => {
    const response = await api.get("/dashboard/lecturer");
    return response.data;
  },
};

// Alerts Services
export const alertService = {
  getAllAlerts: async () => {
    const response = await api.get("/alerts");
    return response.data;
  },

  getAlertById: async (alertId) => {
    const response = await api.get(`/alerts/${alertId}`);
    return response.data;
  },

  createAlert: async (alertData) => {
    const response = await api.post("/alerts/create", alertData);
    return response.data;
  },

  updateAlert: async (alertId, alertData) => {
    const response = await api.put(`/alerts/${alertId}`, alertData);
    return response.data;
  },

  deleteAlert: async (alertId) => {
    const response = await api.delete(`/alerts/${alertId}`);
    return response.data;
  },

  sendAlert: async (alertId) => {
    const response = await api.post(`/alerts/${alertId}/send`);
    return response.data;
  },
};

// Lecturer Services
export const lecturerService = {
  getAllLecturers: async () => {
    const response = await api.get("/lecturers");
    return response.data;
  },

  getLecturerById: async (lecturerId) => {
    const response = await api.get(`/lecturers/${lecturerId}`);
    return response.data;
  },

  getLecturerCourses: async (lecturerId) => {
    const response = await api.get(`/lecturers/${lecturerId}/courses`);
    return response.data;
  },

  createLecturer: async (lecturerData) => {
    const response = await api.post("/lecturers/create", lecturerData);
    return response.data;
  },

  updateLecturer: async (lecturerId, lecturerData) => {
    const response = await api.put(`/lecturers/${lecturerId}`, lecturerData);
    return response.data;
  },

  deleteLecturer: async (lecturerId) => {
    const response = await api.delete(`/lecturers/${lecturerId}`);
    return response.data;
  },
};

// Student Services
export const studentService = {
  getAllStudents: async () => {
    const response = await api.get("/students");
    return response.data;
  },

  getStudentById: async (studentId) => {
    const response = await api.get(`/students/${studentId}`);
    return response.data;
  },

  getStudentCourses: async (studentId) => {
    const response = await api.get(`/students/${studentId}/courses`);
    return response.data;
  },

  createStudent: async (studentData) => {
    const response = await api.post("/students/create", studentData);
    return response.data;
  },

  updateStudent: async (studentId, studentData) => {
    const response = await api.put(`/students/${studentId}`, studentData);
    return response.data;
  },

  deleteStudent: async (studentId) => {
    const response = await api.delete(`/students/${studentId}`);
    return response.data;
  },
};

// Student Data Services (for student dashboard)
export const studentDataService = {
  getStudentGrades: async () => {
    const response = await api.get("/student/grades");
    return response.data;
  },

  getStudentAttendance: async () => {
    const response = await api.get("/student/attendance");
    return response.data;
  },

  getStudentRegisteredCourses: async () => {
    const response = await api.get("/student/courses");
    return response.data;
  },

  getStudentPerformance: async () => {
    const response = await api.get("/student/performance");
    return response.data;
  },
};
