import mongoose, { mongo } from "mongoose";

let attendanceSchema = new mongoose.Schema({
  courseId: String,
  courseCode: String,
  courseTitle: String,
  studentId: String,
  level: String,
  department: String,
  timestamp: { type: Date, default: Date.now },
});

let gradesSchema = new mongoose.Schema({
  courseCode: String,
  courseTitle: String,
  grade: String,
  semester: String,
  year: String,
  studentid: String,
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
    // unique: true,
    required: [true, "Biometric data is required"],
  },
  rateOfClassesAttended: Number,
  createdAt: { type: Date, default: Date.now },
});
export let attendance = new mongoose.model("Attendance", attendanceSchema);
export let grades = new mongoose.model("Grades", gradesSchema);
let Student = new mongoose.model("Student", studentSchema);
export default Student;

