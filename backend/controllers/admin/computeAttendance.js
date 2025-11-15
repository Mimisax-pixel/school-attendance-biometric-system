import { computeAttendanceRates } from "../../jobs/computeAttendanceRates.js";

/**
 * Admin endpoint to manually trigger attendance rate computation
 * POST /api/v1/admin/compute-attendance-rates
 */
export const computeAttendanceRatesEndpoint = async (req, res) => {
  try {
    console.log("[Admin] Manual attendance rate computation triggered");
    await computeAttendanceRates();
    return res.json({
      status: "success",
      message: "Attendance rates computed and stored successfully",
    });
  } catch (error) {
    console.error("[Admin] Error during computation:", error.message);
    return res.status(500).json({
      status: "failed",
      message: "Error computing attendance rates",
      error: error.message,
    });
  }
};
