import mongoose, { model, Model, Schema } from "mongoose";

let lecturerSchema = new Schema({
    name: String,
    department: String,
    contact: String,
    courses_assigned: [String]
})

let lecturer = new model('lecturer',lecturerSchema)


export default lecturer