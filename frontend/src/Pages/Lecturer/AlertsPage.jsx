import React, { useState } from "react";
import LecturerSideBar from "../../Components/LecturerSideBar";
import toast from "react-hot-toast";
import {
  Mail,
  MessageCircle,
  Send,
  Users,
  User,
} from "lucide-react";
import { useDepartments } from "../../hooks/useDepartments";
import api from "../../api/axiosInstance";

export default function LecturerAlertsPage() {
  const { departments } = useDepartments();

  // Alert sending form states
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [sendTo, setSendTo] = useState("all"); // "all" or "selected"
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState("email"); // "email" or "whatsapp"
  const [departmentStudents, setDepartmentStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch students when department changes
  const handleDepartmentChange = async (e) => {
    const deptTitle = e.target.value;
    setSelectedDepartment(deptTitle);
    setSelectedStudents([]);

    if (!deptTitle) {
      setDepartmentStudents([]);
      return;
    }

    try {
      // Fetch students for the selected department using the axios instance
      const res = await api.get(`/attendance-records`, {
        params: { department: deptTitle, limit: 1000 },
      });

      if (res && (res.status === 200 || res.status === 201)) {
        const students = res.data.results || [];
        // Map the results to expected fields
        const formattedStudents = students.map((s) => ({
          _id: s._id,
          fullName: s.fullname,
          name: s.fullname,
          email: s.email,
          phone: s.phone,
          matricNumber: s.matricNumber,
        }));
        setDepartmentStudents(formattedStudents);
      } else {
        toast.error("Failed to fetch students");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message || error.message || "Unknown error";
      toast.error("Error fetching students: " + msg);
    }
  };

  const handleStudentToggle = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSendAlert = async (e) => {
    e.preventDefault();

    if (!selectedDepartment) {
      toast.error("Please select a department");
      return;
    }
    if (!alertTitle.trim()) {
      toast.error("Please enter an alert title");
      return;
    }
    if (!alertMessage.trim()) {
      toast.error("Please enter an alert message");
      return;
    }
    if (sendTo === "selected" && selectedStudents.length === 0) {
      toast.error("Please select at least one student");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        department: selectedDepartment,
        title: alertTitle,
        message: alertMessage,
        sendTo: sendTo,
        studentIds: sendTo === "selected" ? selectedStudents : [],
        deliveryMethod: deliveryMethod,
      };

      const res = await api.post(`/send-alert`, payload);

      if (res && (res.status === 200 || res.status === 201)) {
        const result = res.data;
        toast.success(
          `Alert sent successfully to ${result.recipientCount} student(s) via ${deliveryMethod}`
        );
        // Reset form
        setAlertTitle("");
        setAlertMessage("");
        setSendTo("all");
        setSelectedStudents([]);
        setSelectedDepartment("");
        setDepartmentStudents([]);
      } else {
        const msg = res?.data?.message || "Failed to send alert";
        toast.error(msg);
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message || error.message || "Unknown error";
      toast.error("Error sending alert: " + msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      <LecturerSideBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-auto mt-16 md:mt-0 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Send Alerts & Messages
            </h1>
            <p className="text-gray-600 mt-2">
              Send custom alerts to students via email or WhatsApp.
            </p>
          </div>

          {/* Send Alert Form */}
          <form onSubmit={handleSendAlert} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Department Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Department *
                </label>
                <select
                  value={selectedDepartment}
                  onChange={handleDepartmentChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Choose Department --</option>
                  {departments?.map((dept) => (
                    <option key={dept._id} value={dept.title}>
                      {dept.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Method */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Delivery Method *
                </label>
                <select
                  value={deliveryMethod}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="email">📧 Email</option>
                  <option value="whatsapp">💬 WhatsApp</option>
                </select>
              </div>

              {/* Send To */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Send To *
                </label>
                <select
                  value={sendTo}
                  onChange={(e) => setSendTo(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Students in Department</option>
                  <option value="selected">Selected Students</option>
                </select>
              </div>
            </div>

            {/* Alert Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alert Title *
              </label>
              <input
                type="text"
                value={alertTitle}
                onChange={(e) => setAlertTitle(e.target.value)}
                placeholder="e.g., Attendance Reminder, Important Notice"
                maxLength={100}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Alert Message */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Alert Message *
              </label>
              <textarea
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                placeholder="Enter your alert message here..."
                rows={5}
                maxLength={1000}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {alertMessage.length}/1000 characters
              </p>
            </div>

            {/* Student Selection */}
            {selectedDepartment && sendTo === "selected" && (
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">
                  Select Students ({selectedStudents.length} selected)
                </h3>
                {departmentStudents.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    No students found in this department.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
                    {departmentStudents.map((student) => (
                      <label
                        key={student._id}
                        className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition"
                      >
                        <input
                          type="checkbox"
                          checked={selectedStudents.includes(student._id)}
                          onChange={() => handleStudentToggle(student._id)}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {student.fullName || student.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {student.matricNumber || student.email}
                          </p>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Summary Preview */}
            {selectedDepartment && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Alert Preview
                </h4>
                <div className="space-y-2 text-sm text-blue-800">
                  <p>
                    <strong>Recipients:</strong>{" "}
                    {sendTo === "all"
                      ? `All students in ${
                          departments?.find((d) => d.title === selectedDepartment)
                            ?.title || "selected department"
                        }`
                      : `${selectedStudents.length} selected student(s)`}
                  </p>
                  <p>
                    <strong>Method:</strong>{" "}
                    {deliveryMethod === "email" ? "📧 Email" : "💬 WhatsApp"}
                  </p>
                  <p>
                    <strong>Title:</strong> {alertTitle || "(Not set)"}
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={loading || !selectedDepartment}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition ${
                  loading || !selectedDepartment
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                <Send size={18} />
                {loading ? "Sending..." : "Send Alert"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setAlertTitle("");
                  setAlertMessage("");
                  setSendTo("all");
                  setSelectedStudents([]);
                  setSelectedDepartment("");
                  setDepartmentStudents([]);
                }}
                className="px-6 py-3 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition"
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
