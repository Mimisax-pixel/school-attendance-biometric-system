import mongoose from "mongoose";
let classSchema = new mongoose.Schema({
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
});

let Classes = new mongoose.model("Classes", classSchema);

export default Classes;
