import mongoose from "mongoose";
import AcademicSession from "../models/session.model.js";

export default async function getCurrentSession() { 
    try {
        const session = await AcademicSession.findOne({ current: true }).lean();
        if (!session) {
            throw new Error("No current academic session found");
        }
        return session.academicSession;
    } catch (error) {
        console.error("Error fetching current academic session:", error);
        throw error;
    }
}

