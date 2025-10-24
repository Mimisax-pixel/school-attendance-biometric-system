import React from 'react'

const StudentsAttendance = () => {
  return (
    <div className="min-h-screen w-9/12 bg-gray-100 font-sans">
      {/* <header className="bg-white shadow flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-blue-600 rounded"></div>
          <span className="font-bold text-lg">EduTrack</span>
        </div>
        <nav className="flex space-x-6 text-sm text-gray-600">
          <a href="/adminDashboard" className="hover:text-black">
            Dashboard
          </a>
          <a href="#" className="text-blue-600 font-medium">
            Attendance
          </a>
          <a href="/administrativeLog" className="hover:text-black">
            Performance
          </a>
          <a href="" className="hover:text-black">
            Reports
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600">
            <i className="far fa-bell"></i>
          </button>
          <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        </div>
      </header> */}

      <main className="p-8">
        <h1 className="text-2xl font-semibold mb-6">Biometric Attendance</h1>
        <div className="bg-white p-4 rounded-lg shadow mb-6 flex space-x-4">
          <input
            className="flex-1 border rounded px-3 py-2 text-sm"
            placeholder="Search by student name or ID..."
          />
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Date Ranges</option>
          </select>
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Courses</option>
          </select>
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Students</option>
          </select>
          <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm">
            Export Report
          </button>
        </div>

        <table className="w-full bg-white rounded-lg shadow text-sm">
          <thead>
            <tr className="text-left text-gray-600 border-b">
              <th className="p-4">STUDENT NAME</th>
              <th className="p-4">STUDENT ID</th>
              <th className="p-4">COURSE</th>
              <th className="p-4">ATTENDANCE RATE</th>
              <th className="p-4">LAST CHECK-IN</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Sophia Clark",
                id: "2021001",
                course: "Computer Science",
                rate: "85%",
                date: "2024-03-15 08:00",
              },
              {
                name: "Ethan Miller",
                id: "2021002",
                course: "Electrical Engineering",
                rate: "92%",
                date: "2024-03-15 08:45",
              },
              {
                name: "Olivia Davis",
                id: "2021003",
                course: "Mechanical Engineering",
                rate: "78%",
                date: "2024-03-15 09:15",
              },
              {
                name: "Liam Wilson",
                id: "2021004",
                course: "Civil Engineering",
                rate: "90%",
                date: "2024-03-15 08:30",
              },
              {
                name: "Ava Martinez",
                id: "2021005",
                course: "Chemical Engineering",
                rate: "88%",
                date: "2024-03-15 09:05",
              },
              {
                name: "Noah Anderson",
                id: "2021006",
                course: "Biomedical Engineering",
                rate: "82%",
                date: "2024-03-15 08:50",
              },
              {
                name: "Isabella Thomas",
                id: "2021007",
                course: "Aerospace Engineering",
                rate: "95%",
                date: "2024-03-15 08:20",
              },
            ].map((s, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="p-4">{s.name}</td>
                <td className="p-4">{s.id}</td>
                <td className="p-4">{s.course}</td>
                <td className="p-4 flex items-center space-x-2">
                  <div className="w-24 h-2 bg-gray-200 rounded">
                    <div
                      className="h-2 bg-blue-600 rounded"
                      style={{ width: s.rate }}
                    ></div>
                  </div>
                  <span>{s.rate}</span>
                </td>
                <td className="p-4">{s.date}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between text-xs text-gray-500 mt-4">
          <span>Showing 1 to 7 of 25 entries</span>
          <div className="space-x-2">
            <button className="px-2 py-1 border rounded">Previous</button>
            <button className="px-2 py-1 border rounded">Next</button>
          </div>
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-8">
        <div className="space-x-4 mb-2">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
        <p>© 2024 EduTrack. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default StudentsAttendance
