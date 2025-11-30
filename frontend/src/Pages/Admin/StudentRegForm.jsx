import React, { useEffect, useState } from "react";
import api from "../../api/axiosInstance.js";
import toast from "react-hot-toast";
import { useDepartments } from "../../hooks/useDepartments.js";

const StudentRegForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    matricNumber: "",
    email: "",
    phone: "",
    department: "",
    level: "",
    programme: "",
    course: "",
    password: "",
    semester: "",
    biometricData: "",
  });
  const [status, setStatus] = useState("Ready");
  const [fingerprintImage, setFingerprintImage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { departments, isLoading: deptLoading } = useDepartments();
  const requestFingerprint = (e) => {
    e.preventDefault();
    if (window.chrome?.webview) {
      setStatus("Starting fingerprint capture...");
      window.chrome.webview.postMessage("start_capture");
    } else {
      toast.error("Use BiometricApp");
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (!formData.biometricData) {
      toast.error("Biometric data is required");
      return;
    }
    try {
      const response = await api.post("/register/student", formData, {
        withCredentials: true,
      });
      toast.success("Student registered successfully!");
      setFormData({
        fullname: "",
        matricNumber: "",
        email: "",
        phone: "",
        department: "",
        level: "",
        programme: "",
        course: "",
        semester: "",
        biometricData: "",
        password: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to register student"
      );
    }
  };

  useEffect(() => {
    if (window.chrome?.webview) {
      const listener = (e) => {
        try {
          const data = JSON.parse(e.data);

          if (data.status) setStatus(data.status);
          if (data.message) setStatus(data.message);
          if (data.fingerprint)
            setFingerprintImage(`data:image/png;base64,${data.fingerprint}`);

          if (data.template) {
            setFormData((prev) => ({
              ...prev,
              biometricData: data.template,
            }));
            setStatus("Fingerprint enrollment completed!");
          }
        } catch (err) {}
      };

      window.chrome.webview.addEventListener("message", listener);
      return () => {
        window.chrome.webview.removeEventListener("message", listener);
      };
    }
  }, []);

  return (
    <div className="bg-gray-200 py-5 px-4 sm:px-8 lg:px-16">
      <div className="w-full md:w-9/12 lg:w-7/12 mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="font-semibold text-2xl sm:text-3xl text-center md:text-left">
          Add New Student Data
        </h2>
        <p className="my-3 text-center md:text-left text-gray-600">
          Fill in the details below to add a new student.
        </p>
        <hr className="my-7" />

        <form
          onSubmit={handleFormSubmit}
          className="flex flex-wrap gap-5 justify-between"
        >
          {/* Full Name */}
          <div className="w-full sm:w-[48%]">
            <label htmlFor="fullname" className="font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none p-3 mt-1"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              required
            />
          </div>

          {/* Matric Number */}
          <div className="w-full sm:w-[48%]">
            <label htmlFor="matric" className="font-medium text-gray-700">
              Matric Number
            </label>
            <input
              type="text"
              id="matric"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none p-3 mt-1"
              value={formData.matricNumber}
              onChange={(e) =>
                setFormData({ ...formData, matricNumber: e.target.value })
              }
              required
            />
          </div>

          {/* Email */}
          <div className="w-full sm:w-[48%]">
            <label htmlFor="email" className="font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none p-3 mt-1"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          {/* Phone */}
          <div className="w-full sm:w-[48%]">
            <label htmlFor="phone" className="font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none p-3 mt-1"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
            />
          </div>

          {/* Department */}
          <div className="w-full sm:w-[48%]">
            <label htmlFor="department" className="font-medium text-gray-700">
              Department
            </label>
            <select
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none pl-3 mt-1"
              name="department"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            >
              <option value="">--Select--</option>
              {departments.map((dept) => (
                <option key={dept._id || dept.title} value={dept.title}>
                  {dept.title}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div className="w-full sm:w-[48%]">
            <label htmlFor="level" className="font-medium text-gray-700">
              Level
            </label>
            <select
              type="text"
              id="level"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none pl-3 mt-1"
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
              required
            >
              <option value="100">100</option>
              <option value="200">200</option>
              <option value="300">300</option>
              <option value="400">400</option>
              <option value="500">500</option>
            </select>
          </div>

          {/* password */}
          <div className="w-full sm:w-[48%]">
            <label htmlFor="level" className="font-medium text-gray-700">
              Passowrd
            </label>
            <input
              type="password"
              id="password"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none p-3 mt-1"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <div className="w-full sm:w-[48%]">
            <label htmlFor="level" className="font-medium text-gray-700">
              Confirm Passowrd
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none p-3 mt-1"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Biometric Enrollment Section */}
          <div className="w-full mt-8">
            <h3 className="font-semibold text-2xl mb-4 text-center md:text-left">
              Biometric Enrollment
            </h3>
            <div className="bg-slate-100 rounded p-5 text-center border-2 border-gray-300">
              {fingerprintImage && (
                <img
                  id="fingerprintImage"
                  className="w-[150px] border-2 border-[#ccc] mx-auto mb-3"
                  src={fingerprintImage}
                  alt="Fingerprint"
                />
              )}
              <p className="mb-3 text-gray-700">
                Place your finger on the biometric scanner
              </p>
              <button
                type="button"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                onClick={requestFingerprint}
              >
                Start Enrollment
              </button>
              <p id="status" className="mt-3 text-sm text-gray-600">
                {status}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="w-full flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentRegForm;
