import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./CustomInput";
import { courseSchema } from "../Schema/courseSchema";
import { useAddCourse } from "../hooks/useAddCourse";
import axios from "axios";
import { set } from "zod";

const AddCourseModal = ({ onClose }) => {
  const [isLoading,setIsLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState({
    courseCode: "",
    courseTitle: "",
    department: "",
    creditunits: "",
    semester: "",
    level: "",
  });


  async function handleAddcourse() {
    setIsLoading(true);
    let baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
    try {
      const response = await axios.post(`${baseUrl}/course`, inputValue, {
        withCredentials: true,
      });

      alert(`${inputValue.courseTitle} added successfully`);
      onClose();
      setIsLoading(false);
    } catch (error) {

      alert("Failed to add course. Please try again.");
      setIsLoading(false)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
  });

  const onSubmit = (data) => {
    handleAddcourse();

  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Course</h2>

        <form className="space-y-4">
          <CustomInput
            label="Course Code"
            name="courseCode"
            register={register}
            error={errors.courseCode}
            onChange={(e) =>
              setInputValue({ ...inputValue, courseCode: e.target.value })
            }
          />
          <CustomInput
            label="Course Title"
            name="courseTitle"
            register={register}
            error={errors.courseTitle}
            onChange={(e) =>
              setInputValue({ ...inputValue, courseTitle: e.target.value })
            }
          />
          <CustomInput
            label="Department / Session"
            type="text"
            name="department"
            register={register}
            error={errors.department}
            onChange={(e) =>
              setInputValue({ ...inputValue, department: e.target.value })
            }
          />

          <CustomInput
            label="Credit Units"
            type="number"
            name="creditunits"
            register={register}
            error={errors.creditunits}
            onChange={(e) =>
              setInputValue({ ...inputValue, creditunits: e.target.value })
            }
          />
          <CustomInput
            label="Semester"
            type="number"
            name="semester"
            register={register}
            error={errors.semester}
            onChange={(e) =>
              setInputValue({ ...inputValue, semester: e.target.value })
            }
          />
          <CustomInput
            label="Level"
            type="number"
            name="level"
            register={register}
            error={errors.level}
            onChange={(e) =>
              setInputValue({ ...inputValue, level: e.target.value })
            }
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? "Adding..." : "Add Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourseModal;
