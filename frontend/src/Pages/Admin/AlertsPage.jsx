import React, { useState } from 'react'

export default function AlertsPage() {

  const [attendanceTrigger, setAttendanceTrigger] = useState('lowAttendanceStreak')
  const [attendanceThreshold, setAttendanceThreshold] = useState('')
  const [attendanceRecipients, setAttendanceRecipients] = useState('studentOnly')


  const [performanceTrigger, setPerformanceTrigger] = useState('gpaBelow')
  const [performanceThreshold, setPerformanceThreshold] = useState('')
  const [performanceRecipients, setPerformanceRecipients] = useState('studentAndAdvisor')


  const [deadlineEvent, setDeadlineEvent] = useState('assignment')
  const [deadlineReminderDays, setDeadlineReminderDays] = useState('')
  const [deadlineRecipients, setDeadlineRecipients] = useState('allStudents')


  const [menuOpen, setMenuOpen] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    alert('Settings saved (demo)')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row relative">
      {/* MOBILE HEADER */}
      <header className="md:hidden flex justify-between items-center px-6 py-4 bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="text-blue-600 text-2xl font-bold">FUTIA</div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <svg className="w-7 h-7 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static z-40 top-0 left-0 h-full w-64 bg-white border-r shadow-md md:shadow-none 
        transform transition-transform duration-500 ease-in-out
        ${menuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="px-6 py-8">
          <div className="text-blue-600 text-2xl font-bold">FUTIA</div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {[
            { name: 'Dashboard', icon: 'M3 11.5L12 4l9 7.5v7a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-7z' },
            { name: 'Attendance', icon: 'M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 0 0 2-2V8H3v11a2 2 0 0 0 2 2z' },
            { name: 'Performance', icon: 'M11 12h6M11 16h6M4 7h16M4 11h4' },
            {
              name: 'Alerts',
              icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0 1 18 14.158V11a6 6 0 1 0-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5',
              active: true,
            },
            { name: 'Settings', icon: 'M12 8v4l3 3' },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                item.active ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={item.icon}
                ></path>
              </svg>
              <span>{item.name}</span>
            </a>
          ))}
        </nav>

        <div className="px-6 py-6 text-sm text-gray-400 border-t">Â© 2025 FUTIA</div>
      </aside>

      {/* BLUR OVERLAY (for mobile menu) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto mt-4 md:mt-0 z-0 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 md:py-10 relative z-20">
          <div className="pb-6">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              Alerts & Notifications
            </h1>
            <p className="text-gray-500 mt-2 text-sm md:text-base">
              Configure automated alerts for attendance, performance, and deadlines.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-8">
            {[
              {
                title: 'Attendance Alerts',
                trigger: [attendanceTrigger, setAttendanceTrigger],
                threshold: [attendanceThreshold, setAttendanceThreshold],
                recipient: [attendanceRecipients, setAttendanceRecipients],
                triggerOptions: [
                  ['lowAttendanceStreak', 'Low Attendance Streak'],
                  ['belowThreshold', 'Attendance Below Threshold'],
                  ['multipleAbsences', 'Multiple Absences'],
                ],
                thresholdLabel: 'Threshold (%)',
                recipientOptions: [
                  ['studentOnly', 'Student Only'],
                  ['studentAndAdvisor', 'Student & Advisor'],
                  ['instructorAndAdmin', 'Instructor & Admin'],
                ],
              },
              {
                title: 'Performance Alerts',
                trigger: [performanceTrigger, setPerformanceTrigger],
                threshold: [performanceThreshold, setPerformanceThreshold],
                recipient: [performanceRecipients, setPerformanceRecipients],
                triggerOptions: [
                  ['gpaBelow', 'GPA Below Threshold'],
                  ['gradeDrop', 'Consistent Grade Drop'],
                  ['missingAssessments', 'Missing Assessments'],
                ],
                thresholdLabel: 'Threshold (GPA)',
                recipientOptions: [
                  ['studentAndAdvisor', 'Student & Advisor'],
                  ['studentOnly', 'Student Only'],
                  ['advisorAndInstructor', 'Advisor & Instructor'],
                ],
              },
              {
                title: 'Deadline Reminders',
                trigger: [deadlineEvent, setDeadlineEvent],
                threshold: [deadlineReminderDays, setDeadlineReminderDays],
                recipient: [deadlineRecipients, setDeadlineRecipients],
                triggerOptions: [
                  ['assignment', 'Assignment Submission'],
                  ['exam', 'Exam'],
                  ['project', 'Project Deadline'],
                ],
                thresholdLabel: 'Reminder (days before)',
                recipientOptions: [
                  ['allStudents', 'All Students'],
                  ['enrolledStudents', 'Enrolled Students'],
                  ['instructors', 'Coordinators'],
                ],
              },
            ].map((s, i) => (
              <section key={i} className="bg-white rounded-lg shadow-sm p-6 sm:p-8 relative z-30">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
                  {s.title}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Trigger */}
                  <div className="relative z-40">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Trigger</label>
                    <select
                      value={s.trigger[0]}
                      onChange={(e) => s.trigger[1](e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 z-50 relative"
                    >
                      {s.triggerOptions.map(([val, label]) => (
                        <option key={val} value={val}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Threshold */}
                  <div className="relative z-40">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                      {s.thresholdLabel}
                    </label>
                    <input
                      value={s.threshold[0]}
                      onChange={(e) => s.threshold[1](e.target.value)}
                      placeholder="e.g., 80"
                      type="number"
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                  </div>

                  {/* Recipients */}
                  <div className="relative z-40">
                    <label className="block text-sm font-medium text-gray-600 mb-2">Recipients</label>
                    <select
                      value={s.recipient[0]}
                      onChange={(e) => s.recipient[1](e.target.value)}
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {s.recipientOptions.map(([val, label]) => (
                        <option key={val} value={val}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>
            ))}

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition w-full sm:w-auto"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
