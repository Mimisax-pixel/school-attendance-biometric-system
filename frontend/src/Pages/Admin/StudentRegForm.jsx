import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentRegForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    matric: "",
    email: "",
    phone: "",
    department: "",
    level: "",
    programme: "",
    course: "",
    semester: "",
    fingerprintTemplate: "",
  });
  const [status, setStatus] = useState("Ready");
  const [fingerprintImage, setFingerprintImage] = useState("");

  const requestFingerprint = (e) => {
    e.preventDefault();
    if (window.chrome?.webview) {
      setStatus("Starting fingerprint capture...");
      window.chrome.webview.postMessage("start_capture");
    } else {
      alert("Not running inside WebView2");
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/register/student",
        formData
      );
      console.log("Server response:", response.data);
      alert("Student registered successfully!");
    } catch (error) {
      console.error("Error registering student:", error);
      alert("Failed to register student.");
    }
  }


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
              fingerprintTemplate: data.template,
            }));
            setStatus("✅ Fingerprint enrollment completed!");
          }
        } catch (err) {
          console.error("Message parsing error:", err);
        }
      };

      window.chrome.webview.addEventListener("message", listener);
      return () => {
        window.chrome.webview.removeEventListener("message", listener);
      };
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form data:", formData);
    alert("Student registered with fingerprint!");
  };

  return (
    <div className="bg-gray-200 py-5">
      <div className="md:w-6/12 m-auto bg-white p-5">
        <h2 className="font-semibold text-3xl">Add new Student Data</h2>
        <p className="my-3">Fill in the details below to add a new student.</p>
        <hr className="my-7" />
        <form
          onSubmit={handleSubmit}
          className="flex flex-wrap gap-5 justify-around"
        >
          <div className="w-5/12 shrink-0 grow-0">
            <label htmlFor="fullName">Full Name</label> <br />
            <input
              type="text"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-0 box-border p-3"
              id="fullname"
            />
          </div>
          <div className="w-5/12 shrink-0 grow-0">
            <label htmlFor="matric">Matric number</label> <br />
            <input
              type="text"
              id="matric"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-0 box-border p-3"
            />
          </div>
          <div className="w-5/12 shrink-0 grow-0">
            <label htmlFor="email">Email </label> <br />
            <input
              type="text"
              id="email"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-0 box-border p-3"
            />
          </div>
          <div className="w-5/12 shrink-0 grow-0">
            <label htmlFor="phone">Phone Nnumber</label> <br />
            <input
              type="text"
              id="phone"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-0 box-border p-3"
            />
          </div>
          <div className="w-5/12 shrink-0 grow-0">
            <label htmlFor="department">Department</label> <br />
            <input
              type="text"
              id="department"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-0 box-border p-3"
            />
          </div>
          <div className="w-5/12 shrink-0 grow-0">
            <label htmlFor="level">Level</label>
            <input
              type="text"
              id="level"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-0 box-border p-3"
            />
          </div>
          <div className="w-11/12 shrink-0 grow-0">
            <label htmlFor="level">Select programme</label>
            <input
              type="text"
              id="selectProgramme"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-0 box-border p-3"
            />
          </div>
          <div className="w-11/12 shrink-0 grow-0">
            <label htmlFor="level">Course registered</label>
            <input
              type="text"
              id="course"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-0 box-border p-3"
            />
          </div>
          <div className="w-11/12 shrink-0 grow-0">
            <label htmlFor="level">Semester</label>
            <input
              type="text"
              id="semester"
              className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-0 box-border p-3"
            />
          </div>

          {/* form inputs same as before */}
          <div className="w-11/12">
            <h3>Biometric Enrollment</h3>
            <div className="bg-slate-100 rounded p-3 text-center border-2 border-gray-300">
              <img
                id="fingerprintImage"
                className="w-[150px] border-2 border-[#ccc] m-auto"
                src={fingerprintImage}
                alt=""
              />
              <p className="mb-3">Place your finger on the biometric scanner</p>
              <button
                type="button"
                className="bg-blue-600 text-white px-3 py-2 rounded mb-2"
                onClick={requestFingerprint}
              >
                Start Enrollment
              </button>
              <p id="status">{status}</p>
            </div>
          </div>

          <div className="w-11/12 flex justify-end">
            <button
              className="bg-blue-600 text-white px-3 py-2 rounded"
              onClick={handleFormSubmit}
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

// import React from "react";
// import { useCallback, useEffect } from "react";

// const StudentRegForm = () => {
//   // send a JSON command to VB.NET
//   function requestFingerprint(e) {
//     e.preventDefault(); // Prevent page reload / restart

//     if (window.chrome?.webview) {
//       // Send message to the VB.NET app to start capture
//       window.chrome.webview.postMessage("start_capture");
//     } else {
//       alert("Not running inside WebView2 (desktop app).");
//     }
//   }

//   // 🔹 Listen for messages from VB.NET
//   useEffect(() => {
//     if (window.chrome?.webview) {
//       // Add message listener
//       const listener = (e) => {
//         try {
//           const data = JSON.parse(e.data); // data sent from VB.NET as JSON
//           const status = document.getElementById("status");
//           const img = document.getElementById("fingerprintImage");

//           // Update status message
//           if (data.message) {
//             status.innerText = data.message;
//           }

//           // Show captured image (if any)
//           if (data.fingerprint) {
//             img.src = `data:image/png;base64,${data.fingerprint}`;
//           }

//           // Final result after 4 captures
//           if (data.status === "completed" && data.template) {
//             console.log("Final Fingerprint Template:", data.template);
//             alert("✅ Fingerprint enrollment completed!");
//             alert(`Template (Base64): ${data.template}`);
//           }
//         } catch (err) {
//           console.error("Message parsing error:", err);
//         }
//       };

//       window.chrome.webview.addEventListener("message", listener);

//       // Cleanup listener on unmount
//       return () => {
//         window.chrome.webview.removeEventListener("message", listener);
//       };
//     }
//   }, []);

//   return (
//     <>
//       <div className="bg-gray-200 py-5">
//         <div className="md:w-6/12 m-auto bg-white p-5">
//           <h2 className="font-semibold text-3xl">Add new Student Data</h2>
//           <p className="my-3">
//             fill in the details below to add a new student to the system
//           </p>
//           <hr className="my-7" />
//           <form action="" className="flex flex-wrap gap-5 justify-around">
//             <div className="w-11/12 shrink-0 grow-0">
//               <label htmlFor="level">
//                 <h3>Biometric Enrollment</h3>
//                 <p>capture student biometric data for attendance </p>
//               </label>
//               <div className="w-full bg-slate-100 h-auto rounded border-2 border-gray-300 focus:border-0 box-border p-3 flex justify-center items-center text-center">
//                 <div>
//                   <img
//                     id="fingerprintImage"
//                     className="w-[150px] border-2 border-[#ccc] m-auto"
//                   />
//                   <p className="mb-3">
//                     Place your finger on the biometric scanner to begin
//                     errollment
//                   </p>
//                   <button
//                     className="bg-blue-600 text-white px-3 py-2 rounded mb-2"
//                     onClick={requestFingerprint}
//                     type="button"
//                   >
//                     Start Enrollment
//                   </button>
//                   <p id="status" className="mb-2">
//                     Status: Ready
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="w-11/12 shrink-0 grow-0">
//               <div className="w-full flex justify-end">
//                 <button className="bg-blue-600 text-white px-3 py-2 rounded">
//                   Add Student
//                 </button>
//               </div>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// // Imports DPFP
// // Imports DPFP.Capture
// // Imports DPFP.Processing
// // Imports DPFP.Verification

// export default StudentRegForm;
