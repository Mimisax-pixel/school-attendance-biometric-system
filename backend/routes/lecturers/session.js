import express from "express";
import isAuthenticated from "../../middleware/authenticate.js";
import isRole from "../../middleware/verifyrole.js";
import { createSession, getSessions } from "../../controllers/lecturer/session.js";

const router = express.Router();

// Create a new session
router.post("/sessions", isAuthenticated, isRole("lecturer"), createSession);
// Get all sessions
router.get("/sessions", isAuthenticated, isRole("lecturer"), getSessions);