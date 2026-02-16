import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
          <h1 className="text-lg md:text-xl font-bold text-blue-700">
            <span className="text-green-700 font-semibold">FUTIA</span> Academic
            Portal
          </h1>

          {/* NAV LINKS */}
          <nav className="flex space-x-6 text-gray-600 font-medium">
            <Link to="/" className="hover:text-blue-700 transition">
              Home
            </Link>
            <Link to="#about" className="hover:text-blue-700 transition">
              About
            </Link>
            <Link to="#features" className="hover:text-blue-700 transition">
              Features
            </Link>
            <Link to="#contact" className="hover:text-blue-700 transition">
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Welcome to FUTIA Academic Portal
          </h2>
          <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
            Empowering education through innovative biometric attendance and
            academic performance tracking.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/student/login"
              className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition shadow-lg"
            >
              Student Login
            </Link>
            <Link
              to="/staff/login"
              className="bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition border border-white"
            >
              Staff Portal
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">🔐</div>
              <h4 className="text-xl font-semibold mb-3">Biometric Security</h4>
              <p className="text-gray-600">
                Advanced biometric attendance tracking ensures accurate and
                secure student attendance records.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">📊</div>
              <h4 className="text-xl font-semibold mb-3">
                Real-time Analytics
              </h4>
              <p className="text-gray-600">
                Monitor attendance patterns and academic performance with
                comprehensive dashboards and reports.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
              <div className="text-4xl mb-4">⚡</div>
              <h4 className="text-xl font-semibold mb-3">
                Instant Notifications
              </h4>
              <p className="text-gray-600">
                Receive immediate alerts about attendance, grades, and important
                academic updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-8">About FUTIA</h3>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-600 mb-4 text-lg">
              FUTIA Academic Portal is a comprehensive solution designed to
              streamline educational management through modern technology. We
              provide secure, reliable, and user-friendly platforms for
              students, lecturers, and administrators.
            </p>
            <p className="text-gray-600 text-lg">
              Our mission is to enhance the educational experience by providing
              real-time insights into academic performance and attendance,
              enabling institutions to make data-driven decisions.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Need Help?</h3>
          <p className="text-gray-600 mb-6">
            For technical support or inquiries, please contact our support team.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8 max-w-2xl mx-auto">
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Email</h4>
              <p className="text-gray-600">support@futia.edu.ng</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Phone</h4>
              <p className="text-gray-600">+234 (0) 123 456 7890</p>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Hours</h4>
              <p className="text-gray-600">Mon - Fri: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-800 text-white text-center py-8 px-4">
        <div className="container mx-auto">
          <p className="mb-2">
            &copy; 2026 FUTIA Academic Portal. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Powered by advanced biometric technology
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
