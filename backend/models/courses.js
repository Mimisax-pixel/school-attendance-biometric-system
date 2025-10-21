import mongoose from "mongoose";

let numberOfclassesheld = new mongoose.Schema(({
    time: { type: Date, default: Date.now },
    student_present: { type: Number, default: 0 },
}));
let courserSchema = new mongoose.Schema(({
    courseTitle: { type: String, required: true },
    courseCode: { type: String, required: true },
    department: { type: String, required: true },
    creditunits: { type: Number, required: true },
    level: { type: String, required: true },
    semester: { type: String, required: true },
    lecturerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer' },
    createdAt: { type: Date, default: Date.now },
    numberOfclassesheld: [numberOfclassesheld],
}));

let Course = new mongoose.model("Course", courserSchema);
export default Course;