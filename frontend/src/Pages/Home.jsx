import React, { useState } from 'react'

const App = () => {
  const [role, setRole] = useState('')

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-lg font-bold text-blue-700">
            <span className="text-green-700 font-semibold">FUTIA</span> Academic
            Portal
          </h1>
          <nav className="space-x-6 text-gray-600 font-medium">
            <a href="#" className="hover:text-blue-700">
              Home
            </a>
            <a href="#" className="hover:text-blue-700">
              About
            </a>
            <a href="#" className="hover:text-blue-700">
              Login Portals
            </a>
            <a href="#" className="hover:text-blue-700">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-blue-600 text-white text-center py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">
          Empowering Education Through Technology
        </h2>
        <p className="mb-6 text-blue-100">
          Streamlining academic performance and attendance monitoring for a
          brighter future at FUTIA.
        </p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>

      {/* LOGIN SECTION */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-2">Login to Your Portal</h3>
          <p className="text-gray-500 mb-10">
            Please select your role to access the portal.
          </p>

          {/* ROLE DROPDOWN */}
          <div className="mb-10">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            >
              <option value="">-- Select Role --</option>
              <option value="admin">Admin</option>
              <option value="lecturer">Lecturer</option>
              <option value="student">Student</option>
            </select>
          </div>

          {/* CONDITIONAL LOGIN FORM WITH ANIMATION */}
          <div
            className={`transition-all duration-500 ease-in-out transform ${
              role
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 -translate-y-5 scale-95 pointer-events-none'
            }`}
          >
            {role && (
              <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
                <div className="text-blue-600 text-4xl mb-3">
                  {role === 'admin' ? '🔐' : '🎓'}
                </div>
                <h4 className="text-lg font-semibold mb-4 capitalize">
                  {role} Login
                </h4>

                <input
                  type="text"
                  placeholder={
                    role === 'admin'
                      ? 'Admin ID'
                      : role === 'lecturer'
                      ? 'Staff ID'
                      : 'Matriculation No.'
                  }
                  className="w-full mb-3 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full mb-4 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="w-full bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition">
                  Sign In
                </button>
                <p className="text-sm text-blue-600 mt-2 cursor-pointer hover:underline">
                  Forgot Password?
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-300 py-10 text-sm">
        <div className="container mx-auto grid md:grid-cols-4 gap-8 px-6">
          <div>
            <h5 className="text-white font-semibold mb-3">FUTIA</h5>
            <p>
              Federal University of Technology, Ikot Abasi. A center of
              excellence in technological education and research.
            </p>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Quick Links</h5>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-white">
                  University Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Admissions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Departments
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  e-Learning
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Resources</h5>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:text-white">
                  Student Handbook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Academic Calendar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Library
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Help Desk
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-semibold mb-3">Contact Us</h5>
            <p>Ikot Abasi, Akwa Ibom State, Nigeria.</p>
            <p>Email: info@futia.edu.ng</p>
            <p>Phone: +234-XXX-XXX-XXXX</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
          © 2025 Federal University of Technology, Ikot Abasi. All Rights
          Reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
