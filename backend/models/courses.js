import mongoose from "mongoose";

let courserSchema = new mongoose.Schema({
  courseTitle: { type: String, required: true },
  courseCode: { type: String, required: true },
  department: { type: String, required: true },
  creditunits: { type: Number, required: true },
  level: { type: String, required: true },
  semester: { type: String, required: true },
  lecturerId: { type: String, require: true },
  numberOfClassesHeld: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

let Course = new mongoose.model("Course", courserSchema);
export default Course;
