import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./CustomInput";
import { departmentSchema } from "../Schema/departmentSchema";
import { useUpdateDepartment } from "../hooks/useUpdateDepartment";

const EditDeptModal = ({ department, onClose }) => {
  const {
    mutate: updateDepartment,
    isLoading,
    isError,
    error,
  } = useUpdateDepartment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      title: "",
      school: "",
    },
  });

  useEffect(() => {
    if (department) {
      reset({
        title: department.title || "",
        school: department.school || "",
      });
    }
  }, [department, reset]);

  const onSubmit = (data) => {
    if (!department) return;
    updateDepartment({ id: department._id, data });
    onClose();
  };

  if (!department) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Department</h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Title"
            name="title"
            register={register}
            error={errors.title}
          />

          <CustomInput
            label="School"
            name="school"
            register={register}
            error={errors.school}
          />

          {isError && (
            <p className="text-red-500 text-sm mt-2">
              {error?.message || "Failed to update department."}
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

export default EditDeptModal;
