import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import Sidebar from "../../Components/Sidebar";

const AdminHelp = () => {
  const [expandedSection, setExpandedSection] = useState(null);

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
            The <strong>Dashboard</strong> is your main hub for system insights
            and analytics.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Overall Attendance Rate:</strong> Shows the system-wide
              average attendance percentage across all departments and levels.
            </li>
            <li>
              <strong>Level Averages Chart:</strong> Displays attendance rates
              broken down by level (100, 200, 300, 400, 500).
            </li>
            <li>
              <strong>Department Attendance Chart:</strong> Visualizes
              attendance performance by department for each level. Use the level
              selector to switch between levels.
            </li>
            <li>
              <strong>Key Metrics:</strong> View total students, lecturers,
              courses, and classes held in the system.
            </li>
          </ul>
          <p className="text-sm text-blue-600 mt-4">
             <strong>Tip:</strong> Use the level dropdown to compare
            department performance across different academic levels.
          </p>
        </div>
      ),
    },
    {
      id: "students",
      title: "Manage Students",
      icon: "",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            The <strong>Students</strong> section allows you to register, view,
            and manage all student records.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Register New Student:</strong> Click "+ Add New Student"
              to open the registration form. Enter the student's full name,
              matric number, department, level, and email.
            </li>
            <li>
              <strong>Search & Filter:</strong> Use the search bar to find
              students by name, matric number, email, or department.
            </li>
            <li>
              <strong>Edit Student Info:</strong> Click the edit icon next to a
              student record to update their details.
            </li>
            <li>
              <strong>Delete Student:</strong> Click the trash icon to remove a
              student. You'll be asked to confirm before deletion.
            </li>
            <li>
              <strong>Attendance Status:</strong> View a student's attendance
              rate by checking their record details.
            </li>
          </ul>
          <p className="text-sm text-blue-600 mt-4">
             <strong>Tip:</strong> Ensure matric numbers are unique when
            registering students to avoid duplicates.
          </p>
        </div>
      ),
    },
    {
      id: "departments",
      title: "Manage Departments",
      icon: "",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            The <strong>Departments</strong> section enables you to create and
            manage academic departments.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Add Department:</strong> Click "+ Add New Department" to
              create a new department. Provide the department title and
              associated school/faculty name.
            </li>
            <li>
              <strong>Edit Department:</strong> Click the edit icon to update
              department details such as name or school.
            </li>
            <li>
              <strong>Delete Department:</strong> Click the trash icon to remove
              a department. Confirm the action when prompted.
            </li>
            <li>
              <strong>Search Departments:</strong> Use the search bar to find
              departments by name or school.
            </li>
            <li>
              <strong>View Abbreviation:</strong> Department abbreviations are
              auto-generated and used in reports and charts for brevity.
            </li>
          </ul>
          <p className="text-sm text-blue-600 mt-4">
             <strong>Tip:</strong> Keep department names consistent across the
            system for better data organization and reporting.
          </p>
        </div>
      ),
    },
    {
      id: "courses",
      title: "Manage Courses",
      icon: "",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            The <strong>Course Management</strong> section allows you to create,
            edit, and manage all academic courses.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Add Course:</strong> Click "+ Add New Course" to create a
              course. Provide the course code, title, unit/credit, and assign it
              to a department and level.
            </li>
            <li>
              <strong>Edit Course:</strong> Click the edit icon to modify course
              details.
            </li>
            <li>
              <strong>Delete Course:</strong> Click the trash icon to remove a
              course from the system.
            </li>
            <li>
              <strong>Search Courses:</strong> Use the search functionality to
              find courses by code or title.
            </li>
            <li>
              <strong>Department & Level Assignment:</strong> Ensure each course
              is properly assigned to the correct department and academic level.
            </li>
          </ul>
          <p className="text-sm text-blue-600 mt-4">
            <strong>Tip:</strong> Use standardized course codes (e.g.,
            GNS101) for easy identification and tracking.
          </p>
        </div>
      ),
    },
    {
      id: "lecturers",
      title: "Manage Lecturers",
      icon: "",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            The <strong>Lecturers</strong> section lets you register, view, and
            manage lecturer accounts.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Register Lecturer:</strong> Click "+ Register Lecturer" to
              add a new lecturer. Provide their full name, email, staff ID, and
              assigned department.
            </li>
            <li>
              <strong>Edit Lecturer Details:</strong> Update lecturer
              information such as department assignment or contact details.
            </li>
            <li>
              <strong>Delete Lecturer:</strong> Remove a lecturer account from
              the system with confirmation.
            </li>
            <li>
              <strong>Department Assignment:</strong> Assign lecturers to
              departments to manage course assignments and attendance sessions.
            </li>
            <li>
              <strong>Search Lecturers:</strong> Find lecturers by name, email,
              or staff ID.
            </li>
          </ul>
          <p className="text-sm text-blue-600 mt-4">
            <strong>Tip:</strong> Ensure each lecturer is assigned to the
            correct department before they can manage attendance sessions.
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
            analytics and printable reports.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Generate Report:</strong> Select a level from the dropdown
              to view attendance data for that academic level.
            </li>
            <li>
              <strong>Filter by Department:</strong> Optionally select a
              specific department to focus on its attendance metrics.
            </li>
            <li>
              <strong>View Summary:</strong> See key metrics including total
              students, lecturers, courses, and overall attendance percentage.
            </li>
            <li>
              <strong>Attendance Table:</strong> Review attendance percentages
              and class counts for each department and level.
            </li>
            <li>
              <strong>Print Report:</strong> Click "Print Report" to open a
              print-friendly version of the report. Use your browser's print
              function to save as PDF or print to paper.
            </li>
          </ul>
          <p className="text-sm text-blue-600 mt-4">
             <strong>Tip:</strong> Generate reports monthly to track trends
            and identify departments that need intervention for attendance
            improvement.
          </p>
        </div>
      ),
    },
    {
      id: "checkin",
      title: "Student Check-In & Attendance",
      icon: "",
      content: (
        <div className="space-y-3 text-gray-700">
          <p>
            The system uses biometric and manual check-in methods to track
            student attendance in classes.
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>How It Works:</strong> When a lecturer starts a class
              session, students can check in using biometric scanning or manual
              verification.
            </li>
            <li>
              <strong>Attendance Calculation:</strong> The system automatically
              calculates attendance rates for each student based on classes they
              attended in their department and level.
            </li>
            <li>
              <strong>Class Metrics:</strong> Each class session tracks the
              number of students present and calculates an attendance ratio for
              that session.
            </li>
            <li>
              <strong>Real-Time Updates:</strong> Student attendance rates are
              updated immediately after each successful check-in.
            </li>
            <li>
              <strong>Authorization:</strong> Students can only check in for
              classes matching their registered department and level.
            </li>
          </ul>
          <p className="text-sm text-blue-600 mt-4">
             <strong>Tip:</strong> Monitor the "Students" section regularly to
            identify students with low attendance rates and take corrective
            actions.
          </p>
        </div>
      ),
    },
  ];

  const faqs = [
    {
      id: "faq1",
      question: "How do I register a new student?",
      answer:
        "Navigate to the Students section and click '+ Add New Student'. Fill in the student's full name, matric number, department, level, and email, then submit. The system will assign a default password that the student can use to log in initially.",
    },
    {
      id: "faq2",
      question: "Can I edit student information after registration?",
      answer:
        "Yes, you can edit most student details by clicking the edit icon next to their record. However, some fields like matric number may be protected to maintain data integrity. Contact support if you need to modify protected fields.",
    },
    {
      id: "faq3",
      question: "What happens when I delete a department?",
      answer:
        "Deleting a department removes it from the system. However, the system may prevent deletion if courses or students are still assigned to it. You may need to reassign or delete those records first.",
    },
    {
      id: "faq4",
      question: "How are attendance rates calculated?",
      answer:
        "A student's attendance rate is calculated as the percentage of classes they attended divided by the total number of classes held in their department and level. The system updates this in real-time after each check-in.",
    },
    {
      id: "faq5",
      question: "Can I generate reports for a specific time period?",
      answer:
        "The current report feature shows overall attendance by level and department. For more granular reporting by date range, consider exporting data and using external analytics tools, or request this feature from the development team.",
    },
    {
      id: "faq6",
      question:
        "What should I do if a student's attendance data looks incorrect?",
      answer:
        "First, verify that the student's department and level are correct. Then check if attendance sessions were properly recorded in the system. Contact support or the respective lecturer to investigate and correct any discrepancies.",
    },
    {
      id: "faq7",
      question:
        "How do I ensure lecturers are properly assigned to departments?",
      answer:
        "In the Lecturers section, assign each lecturer to their respective department during registration or editing. Lecturers can only manage sessions for courses within their assigned department.",
    },
    {
      id: "faq8",
      question: "Can multiple admins manage the system simultaneously?",
      answer:
        "Yes, the system supports multiple admin users. Each admin has full access to manage students, courses, departments, and lecturers. Ensure each admin has a unique login credential.",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-6 md:p-8 pt-20 md:pt-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <HelpCircle className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Admin Help & Guide
              </h1>
            </div>
            <p className="text-gray-600">
              Complete guide to help you navigate and use the School Attendance
              Biometric System as an administrator.
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
              If you can't find the answer to your question, contact the system
              administrator 
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminHelp;
