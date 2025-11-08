import React, { useState, useRef } from "react";
import {
  Bell,
  User,
  Fingerprint,
  Settings,
  BookOpen,
  Users,
  BarChart3,
  Menu,
  X,
  BookMarked,
} from "lucide-react";
import axios from "axios";
import AlertMessage from "../../Components/Alerts";

const Void = () => {
  return (
    <span className="inline-block text-gray-200/40 bg-gray-200/40 font-semibold text-sm w-[70px] rounded-3xl  mt-2">
      .
    </span>
  );
};



const Attendance = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [student, setStudent] = useState(null);
  const department = useRef(null);
  const course = useRef(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isVerify,setIsVerify]=useState("");
  const menuItems = [
    { name: "Dashboard", icon: BarChart3 },
    { name: "Courses", icon: BookOpen },
    { name: "Students", icon: Users },
    { name: "Attendance", icon: Fingerprint },
    { name: "Lecturers", icon: User },
    { name: "Reports", icon: BarChart3 },
    { name: "Settings", icon: Settings },
  ];
  const [alert, setAlert] = useState({ type: "", message: "" });

  async function triggerCheckIn() {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/session/checkin",
        {
          studentId: student.studentId,
          classId: session.sessionId,
        },
        {
          withCredentials: true,
        }
      );
      setAlert({
        type: "success",
        message: "Check-in successful",
      });
      setIsVerify("verified");
      console.log("Check-in successful:", response.data);
    } catch (error) {
      console.error("Error during check-in:", error);
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Check-in failed",
      });
    }
}

  function isWebView2() {
    return window.chrome && window.chrome.webview;
  }

  // 🔹 Trigger fingerprint verification
  async function verifyFingerprint() {
    const savedTemplate = student.biometricData; // or fetched from API

    if (isWebView2()) {
      window.chrome.webview.postMessage(`verify_fingerprint:${savedTemplate}`);
    } else {
      // Handle normal browser gracefully
      console.warn("WebView2 not detected — running in browser.");
      setAlert({
        type: "info",
        message: "Finger Print is only available on the biometric app",
      });
      // alert("Fingerprint verification is only available on the biometric app.");
    }
  }

  // 🔹 Listen for messages from VB.NET (WebView2)
  if (isWebView2()) {
    window.chrome.webview.addEventListener("message", (e) => {
      try {
        const data = JSON.parse(e.data);

        if (data.status === "verified") {
          setAlert({
            type: "success",
            message: "✅ Verified successfully!",
          });
          // alert("✅ Verified successfully!");
          triggerCheckIn(); // your logic here
        } else if (data.status === "failed") {
           setAlert({
             type: "error",
             message: "❌ Verification failed!",
           });
          // alert("❌ Verification failed!");
        } else if (data.status) {
          // For other status updates like "Place your finger..."
          document.getElementById("status").innerText = data.status;
        }
      } catch (err) {
        console.error("Invalid message received:", e.data, err);
      }
    });
  } else {
    console.log("WebView2 bridge not active — messages from VB.NET disabled.");
  }

  async function handleSearch() {
    setLoading(true);
    try {
      let regNo = document.getElementById("Rg").value || "";
      const response = await axios.post(
        "http://localhost:5000/api/v1/session/student_details",
        {
          studentId: regNo,
        },
        {
          withCredentials: true,
        }
      );
      setLoading(false);
      setAlert({
        type: "success",
        message: "Student details fetched successfully",
      });
      setStudent(response.data.data);
      console.log("Student details fetched:", response.data);
    } catch (error) {
      console.error("Error fetching student details:", error);
      setAlert({
        type: "error",
        message:
          error.response?.data?.message || "Failed to fetch student details",
      });
      setLoading(false);
     }
  }

  async function handleStartSession() {
    const dept = department.current.value;
    const crs = course.current.value;
    console.log(crs,dept);
    
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/session",
        {
          department: dept,
          courseCode: crs,
        }, {
          withCredentials: true,
        }
      );
      setLoading(false);
      console.log("Session started:", response.data);
      setAlert({
        type: "success",
        message: "Attendance session started successfully",
      });
      setSession(response.data.data);
    } catch (error) {
      console.error("Error starting session:", error);
      setAlert({
        type: "error",
        message: error.response?.data?.message || "Failed to start session",
      });
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* --- Mobile Top Bar --- */}
      <header className="flex border items-center justify-between px-4 py-3  border-gray-200/50 md:hidden">
        <div className="flex items-center gap-3">
          <button
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <div className="text-blue-700 font-bold text-lg">FUTIA Analytics</div>
        </div>

        <div className="flex items-center gap-3">
          <Bell className="w-5 h-5 text-gray-500" />
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-8 h-8 rounded-full border"
          />
        </div>
      </header>

      <div className="flex justify-start w-full overflow-x-hidden">
        {/* --- Sidebar --- */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white border-r border-gray-200/50 transition-transform duration-300 ease-in-out shrink-0 grow-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:static`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200/50 md:border-none">
            <div className="text-blue-700 text-2xl font-bold">
              FUTIA Analytics
            </div>
            <button
              className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <nav className="mt-3 px-2 pb-6">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200
                ${
                  item.name === "Attendance" ? "bg-blue-50 text-blue-700" : ""
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm md:text-base">{item.name}</span>
              </a>
            ))}
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* --- Main Content --- */}
        <main className=" min-h-screen  w-full  bg-gray-50">
          <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-6 sm:py-8">
            {/* Desktop Header */}
            <div className="hidden md:flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Biometric Attendance
              </h1>
              <div className="flex items-center gap-4">
                <Bell className="w-5 h-5 text-gray-500" />
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
              </div>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              {/* LEFT COLUMN */}
              <div className="space-y-5 w-full">
                {session === null && (
                  <section className="bg-white border border-gray-200/40 rounded-xl p-5 sm:p-6 w-full shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                      Start new Class Attendance Session
                    </h2>

                    <div className="space-y-3">
                      <label className="block text-sm text-gray-600">
                        Department
                      </label>
                      <select
                        className="w-full rounded-md border border-gray-200/50 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        ref={department}
                        onChange={(e) => {
                          console.log(e.target.value);
                          // department.current.value = e.target.value
                        }}
                      >
                        <option value="">Select Department</option>
                        <option value="Computer Science">
                          Computer Science
                        </option>
                        <option value="Electrical Engineering">
                          Electrical Engineering
                        </option>
                        <option value="Mechanical Engineering">
                          Mechanical Engineering
                        </option>
                        <option value="Mass Communication">
                          Mass Communication
                        </option>
                        <option value="Cybersecurity">Cybersecurity</option>
                      </select>

                      <label className="block text-sm text-gray-600">
                        Course
                      </label>
                      <select
                        className="w-full rounded-md border border-gray-200/50 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        ref={course}
                        onChange={(e) => {
                          console.log(e.target.value);
                          // course.current.value = e.target.value;
                        }}
                      >
                        <option>Select Course</option>
                        <option value="CSC 401">CSC 401</option>
                        <option value=">CSC 402">CSC 402</option>
                        <option value="MAC1102">MAC1102</option>
                        <option value="cyb111">cyb111</option>
                      </select>

                      <button
                        className="w-full mt-2 bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 active:scale-98 transition-transform text-sm"
                        onClick={handleStartSession}
                      >
                        {loading ? "loading..." : "Start Attendance Session →"}
                      </button>
                    </div>
                  </section>
                )}
                {session !== null && (
                  <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 w-full shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                      Attendance Session Started
                    </h2>
                    <p className="text-sm text-gray-700">
                      An attendance session has been started for the course{" "}
                      <strong>{/*session.courseTitle || "*/}</strong> (
                      {/*session.courseCode || ""*/}). Students can now check in
                      using the biometric scanner.
                    </p>
                    <label
                      className="block text-sm text-gray-600 mt-4 font-bold"
                      htmlFor="rg"
                    >
                      Enter student REG NO.
                    </label>
                    <input
                      type="text"
                      id="Rg"
                      className="w-full bg-gray-200/40 p-5 mt-2 rounded-md"
                      placeholder="e.g 00/SCIT/CYB/000"
                    />
                    <button
                      className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 active:scale-98 transition-transform text-sm mt-4"
                      onClick={handleSearch}
                    >
                      {loading ? "loading..." : "Search"}
                    </button>
                  </section>
                )}

                {/* Session Details */}
                <section className="bg-white border border-gray-200/40 rounded-xl p-5 sm:p-6 w-full shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Session Details
                  </h3>
                  <ul className="text-sm text-gray-700 space-y-2">
                    <li>
                      <strong>Course:</strong>{" "}
                      {session ? session.courseTitle : ""}
                    </li>
                    <li>
                      <strong>Code:</strong> {session ? session.courseCode : ""}
                    </li>
                    <li>
                      <strong>Lecturer:</strong>{" "}
                      {session ? session.instructorName : ""}
                    </li>
                    <li>
                      <strong>Time:</strong>{" "}
                      {session
                        ? new Date(session.createdAt).toLocaleString()
                        : ""}
                    </li>
                  </ul>
                </section>
              </div>

              {/* RIGHT COLUMN */}
              <div className="bg-white border border-gray-200/40 rounded-xl p-6 sm:p-8 flex flex-col items-center w-full shadow-sm">
                <Fingerprint className="w-14 h-14 sm:w-16 sm:h-16 text-blue-600 mb-3" />
                <h3 className="text-lg font-semibold mb-1">Ready to Scan</h3>
                <p
                  className="text-center text-sm sm:text-base text-gray-500 mb-5 px-2"
                  id="status"
                >
                  Place your finger on the biometric scanner to record your
                  attendance for MAC1201.
                </p>

                {/* Verified / Failed */}
                <div className="w-full space-y-3">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-gray-200/60 rounded-lg p-3 bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {student ? student.fullname : <Void />}
                        </p>
                        <p className="text-xs text-gray-500">
                          {student ? student.department : <Void />}
                        </p>
                      </div>
                    </div>
                    <span className="inline-block text-gray-200/40 bg-gray-200/40 font-semibold text-sm w-[70px] rounded-3xl">
                      .
                    </span>
                  </div>

                  <div className="hidden flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-green-200/60 rounded-lg p-3 bg-green-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          Roland Bassey
                        </p>
                        <p className="text-xs text-gray-500">CST/18/001</p>
                      </div>
                    </div>
                    <span className="text-green-600 font-semibold text-sm">
                      ✔ Verified
                    </span>
                  </div>

                  <div className="hidden flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-red-200/60 rounded-lg p-3 bg-red-50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          Juliet Irore
                        </p>
                        <p className="text-xs text-gray-500">Not recognized</p>
                      </div>
                    </div>
                    <span className="text-red-600 font-semibold text-sm">
                      ✖ Failed
                    </span>
                  </div>
                </div>
                {/*verify button*/}
                {student !== null && (
                  <button
                    className="text-xs sm:text-sm underline text-white bg-blue-600 "
                    onClick={verifyFingerprint}
                  >
                    Check-in
                  </button>
                )}
                {/* Action */}
                <div className="w-full mt-4 text-center">
                  <button className="text-xs sm:text-sm underline text-blue-600">
                    View full attendance log
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <AlertMessage type={alert.type} message={alert.message} />
    </div>
  );
};

export default Attendance
