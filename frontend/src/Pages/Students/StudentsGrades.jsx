import React, { useState } from "react";
import {
  BookOpen,
  LayoutDashboard,
  User,
  CheckCircle,
  Menu,
  X,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import {
  useStudentGrades,
  useStudentAttendance,
  useStudentCourses,
  useStudentPerformance,
} from "../../hooks/useStudentData";
import toast from "react-hot-toast";

const Grades = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [studentName, setStudentName] = useState("Student");

  // Fetch student data
  const {
    grades,
    isLoading: gradesLoading,
    isError: gradesError,
    error: gradesErrorMsg,
    refetch: refetchGrades,
  } = useStudentGrades();

  const {
    attendance,
    isLoading: attendanceLoading,
    isError: attendanceError,
    error: attendanceErrorMsg,
    refetch: refetchAttendance,
  } = useStudentAttendance();

  const {
    courses,
    isLoading: coursesLoading,
    isError: coursesError,
    error: coursesErrorMsg,
    refetch: refetchCourses,
  } = useStudentCourses();

  const {
    performance,
    isLoading: performanceLoading,
    isError: performanceError,
    error: performanceErrorMsg,
    refetch: refetchPerformance,
  } = useStudentPerformance();

  const isLoading =
    gradesLoading || attendanceLoading || coursesLoading || performanceLoading;

  // Handle refetch all
  const handleRefreshAll = () => {
    refetchGrades();
    refetchAttendance();
    refetchCourses();
    refetchPerformance();
    toast.success("Data refreshed successfully");
  };

  return (
    <div className="flex min-h-screen bg-gray-50 flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:static z-20 w-64 bg-white border-r border-gray-200 flex flex-col justify-between transform transition-transform duration-300 md:translate-x-0`}
      >
        <div>
          <div className="p-6 border-b border-gray-200 flex items-center justify-between md:justify-start">
            <div className="flex items-center space-x-3">
              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt="Profile"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full"
              />
              <div>
                <h2 className="text-gray-900 font-semibold text-base md:text-lg">
                  {studentName}
                </h2>
                <p className="text-xs md:text-sm text-gray-500">Student</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              className="md:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setIsSidebarOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="mt-4 text-sm md:text-base">
            {[
              { icon: LayoutDashboard, label: "Dashboard" },
              { icon: BookOpen, label: "Courses" },
              { icon: CheckCircle, label: "Attendance" },
              { icon: User, label: "Grades", active: true },
              { icon: User, label: "Profile" },
            ].map(({ icon: Icon, label, active }) => (
              <a
                key={label}
                href="#"
                className={`flex items-center space-x-3 py-3 px-6 ${
                  active
                    ? "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="flex items-center justify-between bg-white p-4 border-b border-gray-200 md:hidden">
        <h1 className="text-lg font-semibold text-gray-800">Grades</h1>
        <button
          className="text-gray-600 hover:text-gray-800"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 mt-14 md:mt-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Academic Performance
          </h1>
          <button
            onClick={handleRefreshAll}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {/* Error Alert */}
        {(gradesError ||
          attendanceError ||
          coursesError ||
          performanceError) && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 mb-1">
                Error Loading Data
              </h3>
              <p className="text-sm text-red-700">
                {gradesErrorMsg?.message ||
                  attendanceErrorMsg?.message ||
                  coursesErrorMsg?.message ||
                  performanceErrorMsg?.message ||
                  "Failed to load some data. Please try again."}
              </p>
            </div>
          </div>
        )}

        {/* GPA Card */}
        <div className="bg-white shadow-sm rounded-xl p-6 text-center mb-8 w-full sm:w-56">
          {performanceLoading ? (
            <div className="h-20 bg-gray-100 rounded animate-pulse" />
          ) : (
            <>
              <p className="text-gray-600 font-medium">Overall GPA</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mt-2">
                {performance.gpa || "N/A"}
              </h2>
              <p className="text-xs text-gray-500 mt-2">
                ({performance.totalCourses || 0} courses)
              </p>
            </>
          )}
        </div>

        {/* Course History */}
        <Section title="Course History">
          {gradesLoading ? (
            <LoadingTable rows={5} cols={5} />
          ) : gradesError ? (
            <ErrorMessage
              message="Failed to load grades"
              onRetry={refetchGrades}
            />
          ) : grades.length === 0 ? (
            <EmptyState message="No grades available yet" />
          ) : (
            <ResponsiveTable
              headers={[
                "Course Code",
                "Course Title",
                "Grade",
                "Semester",
                "Year",
              ]}
              rows={grades.map((grade) => [
                grade.courseCode || "N/A",
                grade.courseTitle || "N/A",
                grade.grade || "N/A",
                grade.semester || "N/A",
                grade.year || "N/A",
              ])}
            />
          )}
        </Section>

        {/* Attendance Records */}
        <Section title="Attendance Records">
          {attendanceLoading ? (
            <LoadingTable rows={5} cols={5} />
          ) : attendanceError ? (
            <ErrorMessage
              message="Failed to load attendance"
              onRetry={refetchAttendance}
            />
          ) : attendance.length === 0 ? (
            <EmptyState message="No attendance records available" />
          ) : (
            <ResponsiveTable
              headers={[
                "Course Code",
                "Course Title",
                "Total Classes",
                "Classes Attended",
                "Attendance Rate",
              ]}
              rows={attendance.map((att) => [
                att.courseCode || "N/A",
                att.courseTitle || "N/A",
                att.totalClasses || 0,
                att.classesAttended || 0,
                att.attendanceRate || "0%",
              ])}
            />
          )}
        </Section>

        {/* Registered Courses */}
        <Section title="Registered Courses">
          {coursesLoading ? (
            <LoadingTable rows={5} cols={4} />
          ) : coursesError ? (
            <ErrorMessage
              message="Failed to load courses"
              onRetry={refetchCourses}
            />
          ) : courses.length === 0 ? (
            <EmptyState message="Not registered in any courses" />
          ) : (
            <ResponsiveTable
              headers={["Course Code", "Course Title", "Credits", "Semester"]}
              rows={courses.map((course) => [
                course.courseCode || "N/A",
                course.courseTitle || "N/A",
                course.creditunits || 0,
                course.semester || "N/A",
              ])}
            />
          )}
        </Section>
      </main>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-10">
    <h2 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
      {title}
    </h2>
    {children}
  </section>
);

const ResponsiveTable = ({ headers, rows }) => (
  <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
    <table className="w-full text-xs sm:text-sm text-left text-gray-700 border-collapse">
      <thead className="bg-gray-100 text-gray-600 uppercase">
        <tr>
          {headers.map((h) => (
            <th key={h} className="py-3 px-4 sm:px-6">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i} className="border-t">
            {r.map((cell, j) => (
              <td key={j} className="py-3 px-4 sm:px-6 whitespace-nowrap">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const LoadingTable = ({ rows = 5, cols = 5 }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 space-y-3">
    {Array(rows)
      .fill(0)
      .map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array(cols)
            .fill(0)
            .map((_, j) => (
              <div
                key={j}
                className="flex-1 h-6 bg-gray-100 rounded animate-pulse"
              />
            ))}
        </div>
      ))}
  </div>
);

const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 text-center">
    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
    <h3 className="font-semibold text-gray-800 mb-2">{message}</h3>
    <button
      onClick={onRetry}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Retry
    </button>
  </div>
);

const EmptyState = ({ message }) => (
  <div className="bg-white rounded-xl shadow-sm p-12 text-center">
    <div className="flex justify-center mb-4">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        <BookOpen className="w-8 h-8 text-gray-400" />
      </div>
    </div>
    <p className="text-gray-600 font-medium">{message}</p>
  </div>
);

export default Grades;
