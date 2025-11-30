import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./CustomInput";
import { courseSchema } from "../Schema/courseSchema";
import useAddCourse from "../hooks/useAddCourse";
import { useDepartments } from "../hooks/useDepartments.js";

const AddCourseModal = ({ onClose }) => {
  const { addCourse, isLoading } = useAddCourse();
  const { departments, isLoading: deptLoading } = useDepartments();

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
      semester: "",
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
          <select
            className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none pl-3 mt-1"
            name="department"
            {...register("department")}
            // onChange={(e) =>
            //   setFormData({ ...formData, department: e.target.value })
            // }
            aria-placeholder="select department"
          >
            {departments.map((dept) => (
              <option key={dept._id || dept.title} value={dept.title}>
                {dept.title}
              </option>
            ))}
          </select>

          <CustomInput
            label="Credit Units"
            type="number"
            name="creditunits"
            register={register}
            error={errors.creditunits}
          />
          <select
            className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none pl-3 mt-1"
            name="semester"
            {...register("semester")}

            // onChange={(e) =>
            //   setFormData({ ...formData, department: e.target.value })
            // }
          >
            <option value="first">First semester</option>
            <option value="second">Second semester</option>
          </select>

          <select
            className="w-full bg-slate-100 h-[40px] rounded border-2 border-gray-300 focus:border-blue-500 focus:outline-none pl-3 mt-1"
            name="level"
            {...register("level", { valueAsNumber: true })}

            // onChange={(e) =>
            //   setFormData({ ...formData, department: e.target.value })
            // }
          >
            <option value={100}>100</option>
            <option value={200}>200</option>
            <option value={300}>300</option>
            <option value={400}>400</option>
            <option value={500}>500</option>
          </select>

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
