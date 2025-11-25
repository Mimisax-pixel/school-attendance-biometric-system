import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import toast from "react-hot-toast";
import { useDepartments } from "../hooks/useDepartments";

const LecturerModal = ({ lecturer, onClose, onSubmit, isAdding }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    department: "",
  });
  const { departments, isLoading: deptLoading } = useDepartments();
  const [lecturerOptions, setLecturerOptions] = useState([]);

  useEffect(() => {
    if (!deptLoading) setLecturerOptions(departments || []);
  }, [departments, deptLoading]);

  useEffect(() => {
    if (lecturer) {
      setForm({
        fullName: lecturer.name || lecturer.fullName || "",
        email: lecturer.email || "",
        password: "",
        department: lecturer.department || "",
      });
    }
  }, [lecturer]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if editing and password is empty, don't include password key
    const payload = { ...form };
    if (lecturer && !payload.password) delete payload.password;
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">
          {lecturer ? "Edit Lecturer" : "Add Lecturer"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded px-3 py-2"
            // password is required for add, optional for edit
            required={!lecturer}
          />
          <select
            className="w-full rounded-md border border-gray-200/50 px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            name="department"
            value={form.department}
            onChange={handleChange}
          >
            <option value="">--Select--</option>
            {lecturerOptions.map((dept) => (
              <option key={dept._id || dept.title} value={dept.title}>
                {dept.title}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
              disabled={isAdding}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              disabled={isAdding}
            >
              {isAdding
                ? lecturer
                  ? "Saving..."
                  : "Adding..."
                : lecturer
                ? "Save"
                : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LecturerModal;
