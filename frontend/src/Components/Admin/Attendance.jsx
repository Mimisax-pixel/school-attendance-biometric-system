import React from 'react'
import {
  Bell,
  User,
  Fingerprint,
  Settings,
  BookOpen,
  Users,
  BarChart3,
} from 'lucide-react'

const Attendance = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r">
        <div className="p-6 text-blue-700 text-2xl font-bold">
          FUTIA Analytics
        </div>
        <nav className="mt-6 space-y-2">
          {[
            { name: 'Dashboard', icon: BarChart3 },
            { name: 'Courses', icon: BookOpen },
            { name: 'Students', icon: Users },
            { name: 'Attendance', icon: Fingerprint },
            { name: 'Lecturers', icon: User },
            { name: 'Reports', icon: BarChart3 },
            { name: 'Settings', icon: Settings },
          ].map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-6 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-700 ${
                item.name === 'Attendance' ? 'bg-blue-50 text-blue-700' : ''
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Biometric Attendance
          </h1>
          <div className="flex items-center space-x-6">
            <Bell className="w-5 h-5 text-gray-500 cursor-pointer" />
            <img
              src="https://i.pravatar.cc/40"
              alt="Profile"
              className="w-8 h-8 rounded-full border"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* LEFT PANEL */}
          <div className="space-y-6">
            {/* SELECT CLASS */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Select Class</h2>

              <div className="mb-4">
                <label className="block text-sm mb-1 text-gray-600">
                  Department
                </label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option>Select Department</option>
                  <option>Computer Science</option>
                  <option>Electrical Engineering</option>
                  <option>Mechanical Engineering</option>
                  <option>Mass Communication</option>
                  <option>Cybersecurity</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm mb-1 text-gray-600">
                  Course
                </label>
                <select className="w-full border rounded-md px-3 py-2">
                  <option>Select Course</option>
                  <option>CSC 401</option>
                  <option>CSC 402</option>
                  <option>MAC1102</option>
                </select>
              </div>

              <button className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition">
                Start Attendance Session →
              </button>
            </div>

            {/* SESSION DETAILS */}
            <div className="bg-white border rounded-lg p-6">
              <h2 className="font-semibold text-gray-800 mb-4">
                Session Details
              </h2>
              <ul className="text-sm space-y-2 text-gray-700">
                <li>
                  <strong>Course:</strong> Mass Communication
                </li>
                <li>
                  <strong>Code:</strong> MAC3101
                </li>
                <li>
                  <strong>Lecturer:</strong> Dr. Wisdom Bassey
                </li>
                <li>
                  <strong>Time:</strong> 10:00 AM - 12:00 PM
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-white border rounded-lg p-10 text-center">
            <Fingerprint className="w-16 h-16 mx-auto text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Ready to Scan</h2>
            <p className="text-gray-500 mb-8">
              Place your finger on the biometric scanner to record your
              attendance for MAC1201.
            </p>

            {/* VERIFIED STUDENT */}
            <div className="flex items-center justify-between border rounded-lg p-4 mb-3 bg-green-50 border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Roland Bassey</p>
                  <p className="text-sm text-gray-500">CST/18/001</p>
                </div>
              </div>
              <span className="text-green-600 font-semibold">✔ Verified</span>
            </div>

            {/* FAILED STUDENT */}
            <div className="flex items-center justify-between border rounded-lg p-4 bg-red-50 border-red-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gray-200" />
                <div className="text-left">
                  <p className="font-semibold text-gray-800">Juliet Irore</p>
                  <p className="text-sm text-gray-500">Not recognized</p>
                </div>
              </div>
              <span className="text-red-600 font-semibold">✖ Failed</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Attendance
