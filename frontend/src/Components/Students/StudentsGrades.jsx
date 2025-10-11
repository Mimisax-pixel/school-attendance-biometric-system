import React from 'react'
import { BookOpen, LayoutDashboard, User, CheckCircle } from 'lucide-react'

const Grades = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between">
        <div>
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src="https://randomuser.me/api/portraits/women/45.jpg"
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <h2 className="text-gray-900 font-semibold text-lg">Sarah</h2>
                <p className="text-sm text-gray-500">Student</p>
              </div>
            </div>
          </div>

          <nav className="mt-4">
            <a
              href="#"
              className="flex items-center space-x-3 py-3 px-6 text-gray-600 hover:bg-gray-100"
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 py-3 px-6 text-gray-600 hover:bg-gray-100"
            >
              <BookOpen className="w-5 h-5" />
              <span>Courses</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 py-3 px-6 text-gray-600 hover:bg-gray-100"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Attendance</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 py-3 px-6 bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600"
            >
              <User className="w-5 h-5" />
              <span>Grades</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 py-3 px-6 text-gray-600 hover:bg-gray-100"
            >
              <User className="w-5 h-5" />
              <span>Profile</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Academic Performance
        </h1>

        {/* GPA Card */}
        <div className="bg-white shadow-sm rounded-xl p-6 w-56 text-center mb-8">
          <p className="text-gray-600 font-medium">Overall GPA</p>
          <h2 className="text-4xl font-bold text-gray-800 mt-2">3.8</h2>
        </div>

        {/* Course History */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Course History
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="w-full text-sm text-left text-gray-700 border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="py-3 px-6">Course Code</th>
                  <th className="py-3 px-6">Course Title</th>
                  <th className="py-3 px-6">Credits</th>
                  <th className="py-3 px-6">Grade</th>
                  <th className="py-3 px-6">Semester</th>
                </tr>
              </thead>
              <tbody>
                {[
                  [
                    'CSC101',
                    'Introduction to Programming',
                    3,
                    'A',
                    'Fall 2023',
                  ],
                  ['MAT101', 'Calculus I', 4, 'B', 'Fall 2023'],
                  ['ENG101', 'English Composition', 3, 'A', 'Fall 2023'],
                  ['PHY101', 'Physics I', 4, 'C', 'Spring 2024'],
                  ['CSC201', 'Data Structures', 3, 'A', 'Spring 2024'],
                ].map(([code, title, credits, grade, sem]) => (
                  <tr key={code} className="border-t">
                    <td className="py-3 px-6">{code}</td>
                    <td className="py-3 px-6">{title}</td>
                    <td className="py-3 px-6">{credits}</td>
                    <td className="py-3 px-6 font-medium">{grade}</td>
                    <td className="py-3 px-6">{sem}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Attendance Records */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Attendance Records
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="w-full text-sm text-left text-gray-700 border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="py-3 px-6">Course Code</th>
                  <th className="py-3 px-6">Course Title</th>
                  <th className="py-3 px-6">Total Classes</th>
                  <th className="py-3 px-6">Classes Attended</th>
                  <th className="py-3 px-6">Attendance Rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['CSC101', 'Introduction to Programming', 30, 28, '93%'],
                  ['MAT101', 'Calculus I', 40, 35, '88%'],
                  ['ENG101', 'English Composition', 30, 29, '97%'],
                  ['PHY101', 'Physics I', 40, 32, '80%'],
                  ['CSC201', 'Data Structures', 30, 27, '90%'],
                ].map(([code, title, total, attended, rate]) => (
                  <tr key={code} className="border-t">
                    <td className="py-3 px-6">{code}</td>
                    <td className="py-3 px-6">{title}</td>
                    <td className="py-3 px-6">{total}</td>
                    <td className="py-3 px-6">{attended}</td>
                    <td className="py-3 px-6">{rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Registered Courses */}
        <section>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Registered Courses
          </h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm">
            <table className="w-full text-sm text-left text-gray-700 border-collapse">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="py-3 px-6">Course Code</th>
                  <th className="py-3 px-6">Course Title</th>
                  <th className="py-3 px-6">Credits</th>
                  <th className="py-3 px-6">Instructor</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['CSC202', 'Algorithms', 3, 'Dr. Smith'],
                  ['MAT201', 'Calculus II', 4, 'Dr. Johnson'],
                  ['ENG201', 'Technical Writing', 3, 'Prof. Williams'],
                  ['PHY201', 'Physics II', 4, 'Dr. Brown'],
                  ['CSC301', 'Operating Systems', 3, 'Dr. Davis'],
                ].map(([code, title, credits, instructor]) => (
                  <tr key={code} className="border-t">
                    <td className="py-3 px-6">{code}</td>
                    <td className="py-3 px-6">{title}</td>
                    <td className="py-3 px-6">{credits}</td>
                    <td className="py-3 px-6">{instructor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Grades
