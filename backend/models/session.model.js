import mongoose, { model } from "mongoose";

let academicSessionSchema = new mongoose.Schema({
    academicSession: {
        type: String,
        unique: true,
        required: [true, "Academic session is required"]
    },
    current: Boolean
})

let AcademicSession = new model("AcademicSession", academicSessionSchema)
export default AcademicSession