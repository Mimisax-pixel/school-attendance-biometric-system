import mongoose from "mongoose";
let classSchema = new mongoose.Schema({
  level: {
    type: String,
    unique: true
  },
  department: {
    type: String,
    required: [true, "Department is required"],
  },
  className: {
    type: String,
    required: [true, "Class name is required"],
  },
  courseCode: {
    type: String,
    required: [true, "Expected number of students is required"],
  },
  instructor: { type: String, required: [true, "Instructor name is required"] },
  expectedStudents: {
    type: Number,
    required: [true, "Expected number of students is required"],
  },
  numberOfClassesHeld: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

let Classes = new mongoose.model("Classes", classSchema);

export default Classes;
