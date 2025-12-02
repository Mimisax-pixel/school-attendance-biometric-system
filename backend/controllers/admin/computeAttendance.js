// jobs/computeAttendanceRates removed. Keep endpoint but return informational message.
export const computeAttendanceRatesEndpoint = async (req, res) => {
  return res.json({
    status: "unavailable",
    message:
      "Background attendance job has been removed. Student rates are updated incrementally on check-in.",
  });
};
