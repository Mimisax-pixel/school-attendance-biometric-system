import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./CustomInput";
import { courseSchema } from "../Schema/courseSchema";
import useAddCourse from "../hooks/useAddCourse";

const AddCourseModal = ({ onClose }) => {
  const { addCourse, isLoading } = useAddCourse();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseCode: "",
      courseTitle: "",
      department: "",
      creditunits: 0,
      semester: 1,
      level: 100,
    },
  });

  const onSubmit = (data) => {
    addCourse(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Course</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Course Code"
            name="courseCode"
            register={register}
            error={errors.courseCode}
          />
          <CustomInput
            label="Course Title"
            name="courseTitle"
            register={register}
            error={errors.courseTitle}
          />
          <CustomInput
            label="Department / Session"
            type="text"
            name="department"
            register={register}
            error={errors.department}
          />

          <CustomInput
            label="Credit Units"
            type="number"
            name="creditunits"
            register={register}
            error={errors.creditunits}
          />
          <CustomInput
            label="Semester"
            type="number"
            name="semester"
            register={register}
            error={errors.semester}
          />
          <CustomInput
            label="Level"
            type="number"
            name="level"
            register={register}
            error={errors.level}
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
              disabled={isLoading}
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
