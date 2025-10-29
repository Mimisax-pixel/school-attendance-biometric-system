import mongoose, { model, Model, Schema } from "mongoose";

let lecturerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    courses_assigned: [String]
})

let lecturer = new model('lecturer',lecturerSchema)


export default lecturer