import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const App = () => {
  const [role, setRole] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
          <h1 className="text-lg md:text-xl font-bold text-blue-700">
            <span className="text-green-700 font-semibold">FUTIA</span> Academic
            Portal
          </h1>

          {/* Hamburger Icon */}
          <button
            className="md:hidden text-blue-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>

          {/* NAV LINKS */}
          <nav
            className={`${
              menuOpen ? 'block' : 'hidden'
            } absolute md:static top-full left-0 w-full md:w-auto bg-white md:flex md:space-x-6 text-gray-600 font-medium shadow-md md:shadow-none`}
          >
            <Link
              to="#"
              className="block px-6 py-3 md:py-0 hover:text-blue-700 transition"
            >
              Home
            </Link>
            <Link
              to="#"
              className="block px-6 py-3 md:py-0 hover:text-blue-700 transition"
            >
              About
            </Link>
            <Link
              to="/adminDashboard"
              className="block px-6 py-3 md:py-0 hover:text-blue-700 transition"
            >
              Login Portals
            </Link>
            <Link
              to="#"
              className="block px-6 py-3 md:py-0 hover:text-blue-700 transition"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-blue-600 text-white text-center py-16 px-4 md:px-0">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
          Empowering Education Through Technology
        </h2>
        <p className="mb-6 text-blue-100 max-w-xl mx-auto text-sm sm:text-base">
          Streamlining academic performance and attendance monitoring for a
          brighter future at FUTIA.
        </p>
        <button className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-md hover:bg-gray-100 transition">
          Get Started
        </button>
      </section>

      {/* LOGIN SECTION */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto text-center">
          <h3 className="text-2xl font-semibold mb-2">Login to Your Portal</h3>
          <p className="text-gray-500 mb-10">
            Please select your role to access the portal.
          </p>

          {/* ROLE DROPDOWN */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
              {/* Dropdown button */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex justify-between items-center w-full border border-gray-300 bg-white rounded-md px-4 py-3 text-base text-gray-700 font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {/* ✅ Always show text */}
                <span>
                  {role
                    ? role.charAt(0).toUpperCase() + role.slice(1)
                    : '-- Select Role --'}
                </span>

                <svg
                  className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                    dropdownOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 animate-fadeIn">
                  {['admin', 'lecturer', 'student'].map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r)
                        setDropdownOpen(false)
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
              <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto w-full">
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
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-6">
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

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-xs sm:text-sm">
          © 2025 Federal University of Technology, Ikot Abasi. All Rights
          Reserved.
        </div>
      </footer>
    </div>
  )
}

export default App
