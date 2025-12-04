import React, { useMemo, useRef, useState } from "react";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";

const Report = () => {
  const { data, isLoading, isError } = useAdminDashboard();
  const [selectedLevel, setSelectedLevel] = useState(100);
  const [selectedDept, setSelectedDept] = useState("");
  const reportRef = useRef(null);
  const levels = data?.totalCoursesAttendanceAverage?.levelAverages?.map(
    (l) => l.level
  ) || [100, 200, 300, 400, 500];

  const departmentsForLevel = useMemo(() => {
    const levelItem = data?.departmentAttendanceAverage?.find(
      (d) => d.level === selectedLevel
    );
    return levelItem?.departments || [];
  }, [data, selectedLevel]);

  // default selectedDept to first department when list changes
  React.useEffect(() => {
    if (departmentsForLevel.length > 0)
      setSelectedDept(departmentsForLevel[0].department);
    else setSelectedDept("");
  }, [departmentsForLevel]);

  const reportRows = useMemo(() => {
    // If a specific department selected show only that, else all departments for the level
    const rows = departmentsForLevel.map((d) => ({
      department: d.department,
      abbreviation: d.abbreviation,
      average: d.average,
      totalClasses: d.totalClasses,
    }));

    if (selectedDept) return rows.filter((r) => r.department === selectedDept);
    return rows;
  }, [departmentsForLevel, selectedDept]);

  // Show loading / error UIs after all hooks run to preserve hook order
  if (isLoading) return <p className="p-6">Loading report data...</p>;
  if (isError)
    return <p className="p-6 text-red-500">Failed to load report data</p>;

  const printReport = () => {
    if (!reportRef.current) return;
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) return; // popup blocked
    const doc = printWindow.document;
    doc.write("<html><head><title>Attendance Report</title>");
    doc.write("<style>");
    doc.write(
      "body{font-family: Arial, Helvetica, sans-serif; padding:20px;} table{width:100%;border-collapse:collapse;} th,td{border:1px solid #ddd;padding:8px;text-align:left;} th{background:#f3f4f6}"
    );
    doc.write("</style>");
    doc.write("</head><body>");
    doc.write(reportRef.current.innerHTML);
    doc.write("</body></html>");
    doc.close();
    printWindow.focus();
    // Wait for content to load then print
    setTimeout(() => {
      printWindow.print();
      // optionally close after print
      // printWindow.close();
    }, 300);
  };

  return (
    <div className="w-full p-6 mt-20 bg-gray-50 min-h-screen">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Attendance Report</h2>
        <div className="flex gap-2">
          <button
            onClick={printReport}
            className="px-4 py-2 bg-blue-600 text-white rounded shadow"
          >
            Print Report
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-4">
        <div className="flex flex-wrap gap-4 items-center">
          <label className="font-semibold">Level:</label>
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(Number(e.target.value))}
            className="border rounded px-3 py-2"
          >
            {levels.map((lv) => (
              <option key={lv} value={lv}>
                Level {lv}
              </option>
            ))}
          </select>

          <label className="font-semibold">Department:</label>
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="border rounded px-3 py-2"
          >
            <option value="">All Departments</option>
            {departmentsForLevel.map((d) => (
              <option key={d.department} value={d.department}>
                {d.abbreviation} - {d.department}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div ref={reportRef}>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Summary</h3>
          <p>Total Students: {data.totalStudents}</p>
          <p>Total Lecturers: {data.totalLecturers}</p>
          <p>Total Courses: {data.totalCourses}</p>
          <p>Total Classes: {data.totalClassesHeld}</p>
          <p>
            Overall Attendance:{" "}
            {data.totalCoursesAttendanceAverage?.overallAverage}%
          </p>
        </div>

        <div className="bg-white p-4 rounded shadow mt-4">
          <h3 className="font-semibold mb-2">
            Department Attendance (Level {selectedLevel})
          </h3>
          <table>
            <thead>
              <tr>
                <th>Abbrev</th>
                <th>Department</th>
                <th>Average %</th>
                <th>Total Classes</th>
              </tr>
            </thead>
            <tbody>
              {reportRows.map((r) => (
                <tr key={r.department}>
                  <td>{r.abbreviation}</td>
                  <td>{r.department}</td>
                  <td>{r.average}%</td>
                  <td>{r.totalClasses}</td>
                </tr>
              ))}
              {reportRows.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-4">
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
