import AcademicSession from "../../models/session.model.js";

const createAcademicSession = async (req, res) => {
  const { academicSession } = req.body;

  try {
    // If setting current to true, unset previous current session
    await AcademicSession.updateMany({ current: true }, { current: false });

    const newSession = new AcademicSession({ academicSession, current: true });
    await newSession.save();
    res.status(201).json({
      status: "success",
      message: "Academic session created successfully",
      data: newSession,
    });
  } catch (error) {
    console.error("Error creating academic session:", error);
    res.status(500).json({
      status: "failed",
      error: "Failed to create academic session",
    });
  }
};

export { createAcademicSession };
