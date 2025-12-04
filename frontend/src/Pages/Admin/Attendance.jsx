import React, { useState, useRef, useEffect } from "react";
import { Bell, Fingerprint, Menu } from "lucide-react";
import api from "../../api/axiosInstance.js";
import toast from "react-hot-toast";
import { useDepartments } from "../../hooks/useDepartments";
import ContinueSession from "../../Components/ContinueSession.jsx";
import LecturerSideBar from "../../Components/LecturerSideBar.jsx";
import AttendanceLogModal from "../../Components/AttendanceLogModal.jsx";

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
  const [isVerify, setIsVerify] = useState("");
  const [showContinueSession, setShowContinueSession] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);

  let [courseOptions, setCourseOptions] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get("/lecturer/courses", {});
        setCourseOptions(response.data.courses);
        toast.success("Courses loaded successfully");
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load courses");
      }
    };
    fetchCourses();
  }, []);

  const { departments, isLoading: deptsLoading } = useDepartments();

  async function triggerCheckIn() {
    try {
      console.log(student._id, session.sessionId);
      const response = await api.post("/session/checkin", {
        studentId: student._id,
        classId: session._id || session.sessionId,
      });
      setIsVerify("verified");
      toast.success("Check-in successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Check-in failed");
    }
  }

  function isWebView2() {
    return window.chrome && window.chrome.webview;
  }

  async function verifyFingerprint() {
    const savedTemplate = student.biometricData;

    if (isWebView2()) {
      window.chrome.webview.postMessage(`verify_fingerprint:${savedTemplate}`);
    } else {
      toast("Finger Print is only available on the biometric app");
    }
  }

  if (isWebView2()) {
    window.chrome.webview.addEventListener("message", (e) => {
      try {
        const data = JSON.parse(e.data);

        if (data.status === "verified") {
          toast.success("✅ Verified successfully!");
          triggerCheckIn();
        } else if (data.status === "failed") {
          toast.error("❌ Verification failed!");
        } else if (data.status) {
          document.getElementById("status").innerText = data.status;
        }
      } catch (err) {}
    });
  } else {
  }

  async function handleSearch() {
    setLoading(true);
    try {
      let regNo = document.getElementById("Rg").value || "";
      const response = await api.post("/session/student_details", {
        studentId: regNo,
      });
      setLoading(false);
      toast.success("Student details fetched successfully");
      console.log(response.data.data);
      setStudent(response.data.data);
      console.log(session);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch student details"
      );
      setLoading(false);
    }
  }

  async function handleStartSession() {
    const dept = department.current.value;
    const crs = course.current.value;

    setLoading(true);
    try {
      const response = await api.post("/session", {
        department: dept,
        courseCode: crs,
      });
      setLoading(false);

      setSession({ ...response.data.data });
      console.log(session);
      console.log(response.data.data);
      console.log(session);

      toast.success("Attendance session started successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to start session");
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
        <LecturerSideBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Overlay for mobile */}
        {/* {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )} */}

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
                {session === null && !showContinueSession && (
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
                        onChange={(e) => {}}
                      >
                        <option value="">Select Department</option>
                        {departments.map((d) => (
                          <option key={d._id || d.title} value={d.title}>
                            {d.title}
                          </option>
                        ))}
                      </select>

                      <label className="block text-sm text-gray-600">
                        Course
                      </label>
                      <select
                        className="w-full rounded-md border border-gray-200/50 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        ref={course}
                        onChange={(e) => {}}
                      >
                        {courseOptions.length === 0 && (
                          <option value="">No courses available</option>
                        )}
                        {courseOptions.map((crs) => (
                          <option key={crs.courseCode} value={crs.courseCode}>
                            {crs.courseTitle} ({crs.courseCode})
                          </option>
                        ))}
                      </select>

                      <button
                        className="w-full mt-2 bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 active:scale-98 transition-transform text-sm"
                        onClick={handleStartSession}
                      >
                        {loading ? "loading..." : "Start Attendance Session "}
                      </button>
                      <button
                        className="w-full text-blue-700 font-medium py-1 rounded-md hover:bg-blue-100 active:scale-98 transition-transform text-sm underline"
                        onClick={() => setShowContinueSession(true)}
                      >
                        Continue Previous Session
                      </button>
                    </div>
                  </section>
                )}
                {showContinueSession && session === null && (
                  <ContinueSession
                    onSessionSelected={(selectedSession) => {
                      setSession(selectedSession);
                      setShowContinueSession(false);
                    }}
                    onBack={() => setShowContinueSession(false)}
                  />
                )}
                {session !== null && (
                  <section className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 w-full shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">
                      Attendance Session Started
                    </h2>
                    <p className="text-sm text-gray-700">
                      An attendance session has been started for the course{" "}
                      <strong>{session?.courseTitle || ""}</strong> (
                      {session?.courseCode || ""}). Students can now check in
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
                      {session ? session.courseTitle || "N/A" : "N/A"}
                    </li>
                    <li>
                      <strong>Code:</strong>{" "}
                      {session ? session.courseCode || "N/A" : "N/A"}
                    </li>
                    <li>
                      <strong>Department:</strong>{" "}
                      {session ? session.department || "N/A" : "N/A"}
                    </li>
                    <li>
                      <strong>Time:</strong>{" "}
                      {session
                        ? new Date(session.createdAt).toLocaleString()
                        : "N/A"}
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
                      Verified
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
                      Failed
                    </span>
                  </div>
                </div>
                {/*verify button*/}
                {student !== null && (
                  <button
                    className="text-xs sm:text-sm p-4 rounded-xl font-bold text-white bg-blue-600 "
                    onClick={verifyFingerprint}
                    // onClick={triggerCheckIn}
                  >
                    Check-in
                  </button>
                )}
                {/* Action */}
                <div className="w-full mt-4 text-center">
                  {session !== null && (
                    <button
                      onClick={() => setShowAttendanceModal(true)}
                      className="text-xs sm:text-sm underline text-blue-600 hover:text-blue-800 transition"
                    >
                      View full attendance log
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Attendance Log Modal */}
      {showAttendanceModal && session && (
        <AttendanceLogModal
          sessionId={session._id}
          sessionData={session}
          onClose={() => setShowAttendanceModal(false)}
        />
      )}
    </div>
  );
};

export default Attendance;
