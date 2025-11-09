import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./CustomInput";
import { courseSchema } from "../Schema/courseSchema";
import { useEditCourse } from "../hooks/useEditCourse"; // import your hook

const EditCourseModal = ({ course, onClose }) => {
  console.log(course);
  // 1. Use your mutation hook
  const { updateCourse, isLoading, isError, error } = useEditCourse();

  // 2. Initialize form
  const {
    register,
    handleSubmit,
    reset,
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

  // 3. Update form values when course changes
  useEffect(() => {
    if (course) {
      reset({
        courseCode: course.courseCode,
        courseTitle: course.courseTitle,
        department: course.department, 
        creditunits: course.creditunits, 
        semester: Number(course.semester) || 1,
        level: Number(course.level) || 100,
      });
    }
  }, [course, reset]);

  // 4. Handle form submission
  const onSubmit = (data) => {
    if (!course) return;

    updateCourse({
      ...data,
    });

    onClose(); // close modal after saving
  };

  if (!course) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Course</h2>

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

          {isError && (
            <p className="text-red-500 text-sm mt-2">
              {error?.message || "Failed to update course."}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCourseModal;
