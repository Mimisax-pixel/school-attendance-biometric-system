import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance.js";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [loginDetails, setLoginDetails] = useState({});
  const [submit, setSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setLoginDetails((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!loginDetails.email || !loginDetails.password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      setSubmit(true);
      const res = await api.post("/login/admin", loginDetails);

      if (res.data.status === "success") {
        setLoginDetails({});
        toast.success("Login successful, redirecting...");

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 500);
      } else {
        toast.error(res.data.message || "Login failed, please try again");
      }
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to connect to server";
      toast.error(errorMessage);
    } finally {
      setSubmit(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gradient-to-br from-blue-50 to-gray-50">
      {/* NAVBAR */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-6">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-lg md:text-xl font-bold text-blue-700">
              <span className="text-green-700 font-semibold">FUTIA</span>{" "}
              Academic Portal
            </h1>
          </Link>

          <nav className="flex space-x-4 text-gray-600 font-medium">
            <Link to="/" className="hover:text-blue-700 transition">
              Back to Home
            </Link>
          </nav>
        </div>
      </header>

      {/* LOGIN SECTION */}
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Administrator Login
              </h2>
              <p className="text-gray-500">
                Access the administrative dashboard
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={loginDetails.email || ""}
                  onChange={handleInputChange}
                  placeholder="admin@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={loginDetails.password || ""}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submit}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition ${
                  submit
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
                }`}
              >
                {submit ? "Logging in..." : "Login to Admin Dashboard"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="text-sm text-gray-500">or</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Other Login Links */}
              <div className="space-y-2">
                <Link
                  to="/staff/login"
                  className="w-full py-2 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition text-center block"
                >
                  Lecturer Portal
                </Link>
                <Link
                  to="/student/login"
                  className="w-full py-2 px-4 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition text-center block"
                >
                  Student Portal
                </Link>
              </div>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Need help? Contact the IT department for support.
            </p>
          </div>

          {/* Info Card */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">
              Administrator Access
            </h3>
            <p className="text-sm text-blue-700">
              This portal is for system administrators only. Enter your
              credentials to access the administrative dashboard.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4 px-4 text-sm">
        <p>&copy; 2026 FUTIA Academic Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLogin;
