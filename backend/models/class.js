import mongoose from "mongoose";
let classSchema = new mongoose.Schema({
  level: {
    type: String,
    required: [true, "Level is required"],
  },
  department: {
    type: String,
    required: [true, "Department is required"],
  },
  courseTitle: {
    type: String,
    required: [true, "Class name is required"],
  },
  courseCode: {
    type: String,
    required: [true, "course code is required"],
  },
  instructorId: { type: String, required: [true, "Instructor name is required"] },
  numberOfStudentPresent: {
    type: Number,
    required: [true, "Expected number of students is required"],
    default: 0,
  },
  createdAt: { type: Date, default: Date.now },
});

let Classes = new mongoose.model("Classes", classSchema);

export default Classes;
