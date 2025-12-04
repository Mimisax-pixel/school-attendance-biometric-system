import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import LecturerSideBar from "../../Components/LecturerSideBar";

const LecturerHelp = () => {
  const [expandedSection, setExpandedSection] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const guides = [
    {
      id: "dashboard",
      title: "Dashboard Overview",
      icon: "",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            The <strong>Dashboard</strong> is your primary interface for viewing
            attendance analytics and class performance.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Overall Attendance Rate:</strong> See your overall class
              attendance percentage and department performance metrics.
            </li>
            <li>
              <strong>Level-Based Analytics:</strong> View attendance data
              segmented by academic levels (100, 200, 300, 400, 500).
            </li>
            <li>
              <strong>Department Performance:</strong> Analyze attendance trends
              by department within your assigned teaching areas.
            </li>
            <li>
              <strong>Key Metrics:</strong> Quick overview of total students,
              classes held, and attendance statistics.
            </li>
            <li>
              <strong>Level Selector:</strong> Use the dropdown or selector to
              switch between different academic levels and view relevant data.
            </li>
          </ul>
          <p className="text-sm text-blue-600 mt-4">
             <strong>Tip:</strong> Regularly check your dashboard to monitor
            student attendance trends and identify students who may need
            intervention.
          </p>
        </div>
      ),
    },
    {
      id: "courses",
      title: "Manage Your Courses",
      icon: "",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            The <strong>Courses</strong> section displays all courses assigned
            to you and allows you to manage course details.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>View Assigned Courses:</strong> See all courses you are
              assigned to teach, including course code, title, level, and
              department.
            </li>
            <li>
              <strong>Edit Course Details:</strong> Update course information
              such as course description or notes (if editable).
            </li>
            <li>
              <strong>Search Courses:</strong> Use the search function to
              quickly find a specific course by code or title.
            </li>
            <li>
              <strong>Class Sessions:</strong> From the courses view, you can
              manage class sessions and initiate attendance check-in.
            </li>
            <li>
              <strong>Course Information:</strong> Access detailed information
              about each course including assigned students and session history.
            </li>
          </ul>
          <p className="text-sm text-blue-600 mt-4">
             <strong>Tip:</strong> Keep your course list organized by
            regularly reviewing and updating course information as the semester
            progresses.
          </p>
        </div>
      ),
    },
    {
      id: "attendance",
      title: "Conduct Student Attendance",
      icon: "",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            The <strong>Attendance</strong> section is where you initiate
            biometric check-in sessions for your classes.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Start a Class Session:</strong> Select a course and click
              to start a new attendance session. The system will generate a
              session code or QR code.
            </li>
            <li>
              <strong>Biometric Check-In:</strong> Students can check in using
              the provided method (biometric scanner, mobile app scan, or manual
              entry).
            </li>
            <li>
              <strong>Real-Time Tracking:</strong> Monitor student check-ins in
              real-time as they occur during the session.
            </li>
            <li>
              <strong>End Session:</strong> Close the attendance session once
              the class is over. The system will record all check-ins and update
              student attendance records.
            </li>
            <li>
              <strong>Session History:</strong> View past attendance sessions,
              including attendance counts and individual check-in records.
            </li>
            <li>
              <strong>Attendance Report:</strong> Generate reports for specific
              sessions to document attendance for records.
            </li>
          </ul>
          <p className="text-sm text-blue-600 mt-4">
             <strong>Tip:</strong> Start sessions on time and ensure all
            students are present before closing to capture accurate attendance.
          </p>
        </div>
      ),
    },
    {
      id: "reports",
      title: "View Attendance Reports",
      icon: "",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            The <strong>Reports</strong> section provides detailed attendance
            analytics filtered by level and department.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Generate Report:</strong> Select an academic level from
              the dropdown to view attendance data for that level.
            </li>
            <li>
              <strong>Filter by Department:</strong> Optionally select a
              specific department to focus on its attendance metrics.
            </li>
            <li>
              <strong>Summary Information:</strong> View key statistics
              including total students, courses held, and overall attendance
              percentage.
            </li>
            <li>
              <strong>Department Attendance Table:</strong> Review attendance
              percentages and class counts for each department.
            </li>
            <li>
              <strong>Print Report:</strong> Click "Print Report" to generate a
              print-friendly version. Use your browser's print function to save
              as PDF or print.
            </li>
            <li>
              <strong>Export Data:</strong> Copy report data for further
              analysis or record-keeping.
            </li>
          </ul>
          <p className="text-sm text-blue-600 mt-4">
             <strong>Tip:</strong> Generate reports weekly to identify
            attendance trends and communicate with students who have low
            attendance rates.
          </p>
        </div>
      ),
    },
    {
      id: "student-authorization",
      title: "Student Authorization & Check-In Rules",
      icon: "",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            The system enforces strict authorization rules to ensure data
            integrity and prevent unauthorized attendance marking.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Department & Level Match:</strong> Students can only check
              in for classes that match their registered department and academic
              level.
            </li>
            <li>
              <strong>Duplicate Prevention:</strong> The system automatically
              prevents a student from checking in twice for the same class
              session.
            </li>
            <li>
              <strong>Automatic Rate Updates:</strong> Each successful check-in
              immediately updates the student's attendance rate for their
              department and level.
            </li>
            <li>
              <strong>Session Authorization:</strong> Only lecturers assigned to
              a course can start attendance sessions for that course.
            </li>
            <li>
              <strong>Error Handling:</strong> The system will provide clear
              error messages if a check-in fails due to authorization issues.
            </li>
          </ul>
          <p className="text-sm text-blue-600 mt-4">
            <strong>Tip:</strong> If a student is unable to check in due to
            authorization errors, verify their department and level are
            correctly registered in the system.
          </p>
        </div>
      ),
    },
  ];

  const faqs = [
    {
      id: "faq1",
      question: "How do I start an attendance session for my class?",
      answer:
        "Navigate to the Attendance section, select the course you're teaching, and click 'Start Session'. The system will display a session code or QR code that students can use to check in. Once the class is over, close the session to finalize attendance records.",
    },
    {
      id: "faq2",
      question: "What should I do if a student cannot check in?",
      answer:
        "First, verify that the student's department and level match the class requirements. If the student is registered in a different department or level, they cannot check in to this class. Contact the administration to update the student's record if necessary. Also ensure the attendance session is still active.",
    },
    {
      id: "faq3",
      question: "Can I modify a student's attendance record after a session?",
      answer:
        "Direct modification of student records through the lecturer interface is typically not available. If an error occurred during check-in, contact the system administrator with details of the session and student, and they can manually correct the record.",
    },
    {
      id: "faq4",
      question: "How is student attendance rate calculated?",
      answer:
        "A student's attendance rate is calculated as the number of classes they attended divided by the total number of classes held in their department and level, multiplied by 100. The rate is updated in real-time after each check-in.",
    },
    {
      id: "faq5",
      question:
        "How do I generate a report for a specific level or department?",
      answer:
        "Go to the Reports section and select the desired academic level from the dropdown. You can then optionally filter by a specific department. Click the level selector to switch between levels. Use the Print Report button to generate a printable version.",
    },
    {
      id: "faq6",
      question:
        "Can I access reports for all departments or only my assigned department?",
      answer:
        "As a lecturer, you can view reports for all levels and departments in the system. This allows you to understand overall attendance patterns. However, your attendance session management is limited to courses assigned to you.",
    },
    {
      id: "faq7",
      question: "What happens if I close an attendance session by mistake?",
      answer:
        "Once a session is closed, all check-ins are finalized and attendance records are updated. Typically, you cannot reopen a closed session. Contact the system administrator if you need to reopen a session or modify recorded data.",
    },
    {
      id: "faq8",
      question: "How can I ensure accurate attendance data?",
      answer:
        "Always start sessions on time, ensure the biometric/check-in system is working properly, and close sessions only after confirming all students present have checked in. Regularly review the attendance data in your dashboard and reports to identify any anomalies.",
    },
    {
      id: "faq9",
      question: "Can I view attendance data for students in other departments?",
      answer:
        "Yes, you can view overall attendance reports by level and department. However, for detailed student-level attendance data, you have access to students in your courses. For other departments, refer to the administrative reports or contact the administration.",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <LecturerSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Lecturer Help & Guide
              </h1>
            </div>
            <p className="text-gray-600">
              Complete guide to help you navigate and use the School Attendance
              Biometric System as a lecturer.
            </p>
          </div>

          {/* Guides Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Features & How to Use
            </h2>
            <div className="space-y-3">
              {guides.map((guide) => (
                <div
                  key={guide.id}
                  className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(guide.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-2xl">{guide.icon}</span>
                      <h3 className="text-lg font-semibold text-gray-800 text-left">
                        {guide.title}
                      </h3>
                    </div>
                    {expandedSection === guide.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  {expandedSection === guide.id && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      {guide.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleSection(faq.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition"
                  >
                    <h3 className="text-base font-semibold text-gray-800 text-left">
                      {faq.question}
                    </h3>
                    {expandedSection === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    )}
                  </button>
                  {expandedSection === faq.id && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Contact Support */}
          <section className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-2">
              Need More Help?
            </h3>
            <p className="text-blue-800">
              If you can't find the answer to your question, contact your
              department head .
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LecturerHelp;
