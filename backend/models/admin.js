import mongoose from "mongoose";

let adminSchema = new mongoose.Schema({
    fullname: String,
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        default: "admin123",
    },
    securityquestion: {
        type: String,
        required: [true, "Security question is required"],
    },
    securityanswer: {
        type: String,
        required: [true, "Security answer is required"],
    },
    createdAt: { type: Date, default: Date.now },
})

export default mongoose.model("Admin", adminSchema);