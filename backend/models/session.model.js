import mongoose, { model } from "mongoose";

let academicSessionSchema = new mongoose.Schema({
    academicSession: {
        type: String
    },
    current: Boolean
})

let AcademicSession = new model("AcademicSession", academicSessionSchema)
export default AcademicSession