import React, { useState } from "react";

export default function AlertsPage() {
  // Attendance
  const [attendanceTrigger, setAttendanceTrigger] = useState("lowAttendanceStreak");
  const [attendanceThreshold, setAttendanceThreshold] = useState("");
  const [attendanceRecipients, setAttendanceRecipients] = useState("studentOnly");

  // Performance
  const [performanceTrigger, setPerformanceTrigger] = useState("gpaBelow");
  const [performanceThreshold, setPerformanceThreshold] = useState("");
  const [performanceRecipients, setPerformanceRecipients] = useState("studentAndAdvisor");

  // Deadlines
  const [deadlineEvent, setDeadlineEvent] = useState("assignment");
  const [deadlineReminderDays, setDeadlineReminderDays] = useState("");
  const [deadlineRecipients, setDeadlineRecipients] = useState("allStudents");

  const handleSave = (e) => {
    e.preventDefault();
    // Replace with real save logic (API call) as needed
    console.log({
      attendance: { attendanceTrigger, attendanceThreshold, attendanceRecipients },
      performance: { performanceTrigger, performanceThreshold, performanceRecipients },
      deadline: { deadlineEvent, deadlineReminderDays, deadlineRecipients },
    });
    alert("Settings saved (demo)");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* SIDEBAR (desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r">
        <div className="px-6 py-8">
          <div className="text-blue-600 text-2xl font-bold">FUTIA</div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100" href="#">
            {/* Home icon */}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 11.5L12 4l9 7.5v7a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-7z"></path></svg>
            <span>Dashboard</span>
          </a>

          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100" href="#">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 0 0 2-2V8H3v11a2 2 0 0 0 2 2z"></path></svg>
            <span>Attendance</span>
          </a>

          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100" href="#">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M11 12h6M11 16h6M4 7h16M4 11h4"></path></svg>
            <span>Performance</span>
          </a>

          <a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-700" href="#">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5"></path></svg>
            <span>Alerts</span>
          </a>

          <a className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100" href="#">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"></path></svg>
            <span>Settings</span>
          </a>
        </nav>

        <div className="px-6 py-6 text-sm text-gray-400">
          © 2024 FUTIA
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="pb-6">
            <h1 className="text-3xl font-extrabold text-gray-900">Alerts & Notifications</h1>
            <p className="text-gray-500 mt-2">Configure automated alerts for attendance, performance, and deadlines.</p>
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            {/* Attendance Alerts */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Attendance Alerts</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Trigger */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Trigger</label>
                  <select
                    value={attendanceTrigger}
                    onChange={(e) => setAttendanceTrigger(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="lowAttendanceStreak">Low Attendance Streak</option>
                    <option value="belowThreshold">Attendance Below Threshold</option>
                    <option value="multipleAbsences">Multiple Absences</option>
                  </select>
                </div>

                {/* Threshold (%) */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Threshold (%)</label>
                  <input
                    value={attendanceThreshold}
                    onChange={(e) => setAttendanceThreshold(e.target.value)}
                    placeholder="e.g., 80"
                    type="number"
                    min="0"
                    max="100"
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Recipients */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Recipients</label>
                  <select
                    value={attendanceRecipients}
                    onChange={(e) => setAttendanceRecipients(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="studentOnly">Student Only</option>
                    <option value="studentAndAdvisor">Student & Advisor</option>
                    <option value="instructorAndAdmin">Instructor & Admin</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Performance Alerts */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Performance Alerts</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Trigger */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Trigger</label>
                  <select
                    value={performanceTrigger}
                    onChange={(e) => setPerformanceTrigger(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="gpaBelow">GPA Below Threshold</option>
                    <option value="gradeDrop">Consistent Grade Drop</option>
                    <option value="missingAssessments">Missing Assessments</option>
                  </select>
                </div>

                {/* Threshold (GPA) */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Threshold (GPA)</label>
                  <input
                    value={performanceThreshold}
                    onChange={(e) => setPerformanceThreshold(e.target.value)}
                    placeholder="e.g., 2.0"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Recipients */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Recipients</label>
                  <select
                    value={performanceRecipients}
                    onChange={(e) => setPerformanceRecipients(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="studentAndAdvisor">Student & Advisor</option>
                    <option value="studentOnly">Student Only</option>
                    <option value="advisorAndInstructor">Advisor & Instructor</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Deadline Reminders */}
            <section className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Deadline Reminders</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Event */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Event</label>
                  <select
                    value={deadlineEvent}
                    onChange={(e) => setDeadlineEvent(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="assignment">Assignment Submission</option>
                    <option value="exam">Exam</option>
                    <option value="project">Project Deadline</option>
                  </select>
                </div>

                {/* Reminder (days before) */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Reminder (days before)</label>
                  <input
                    value={deadlineReminderDays}
                    onChange={(e) => setDeadlineReminderDays(e.target.value)}
                    placeholder="e.g., 3"
                    type="number"
                    min="0"
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>

                {/* Recipients */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-2">Recipients</label>
                  <select
                    value={deadlineRecipients}
                    onChange={(e) => setDeadlineRecipients(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="allStudents">All Students</option>
                    <option value="enrolledStudents">Enrolled Students</option>
                    <option value="instructors">Cordinators</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Save button aligned to the right */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
