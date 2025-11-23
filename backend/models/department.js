import mongoose from "mongoose";

let departmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    require: [true, "Department title is required"],
  },
  school: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Department", departmentSchema);