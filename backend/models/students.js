import mongoose, { mongo } from "mongoose";

let attendanceSchema = new mongoose.Schema({
  courseTitle: String,
  courseCode: {
    type: String,
    unique: true,
    required: [true, "Course code is required"],
  },
  timestamp: { type: Date, default: Date.now },
  status: String, // e.g., "present", "absent", "late"
  attendedclasses: Number,
});

let gradesSchema = new mongoose.Schema({
  courseCode: String,
  courseTitle: String,
  grade: String,
  semester: String,
  year: String,
});

let studentSchema = new mongoose.Schema({
  fullname: String,
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    default: "password123",
  },
  phone: {
    type: String,
    unique: true,
    required: [true, "Phone number is required"],
  },
  department: {
    type: String,
    required: [true, "Department is required"],
  },
  level: {
    type: String,
    required: [true, "Level is required"],
  },
  matricNumber: {
    type: String,
    unique: true,
    required: [true, "Matric number is required"],
  },
  courses: {
    type: [String],
  },
  programmes: {
    type: [String],
  },
  biometricData: {
    type: String,
    required: [true, "Biometric data is required"],
    unique: true,
  },
    attendance: [attendanceSchema],
    grades: [gradesSchema],
  createdAt: { type: Date, default: Date.now },
});

let Student = new mongoose.model("Student", studentSchema);
export default Student;
