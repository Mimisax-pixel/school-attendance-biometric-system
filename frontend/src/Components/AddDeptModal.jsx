import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "./CustomInput";
import { departmentSchema } from "../Schema/departmentSchema";
import { useAddDepartment } from "../hooks/useAddDepartment";

const AddDeptModal = ({ onClose }) => {
  const {
    mutate: addDepartment,
    isLoading,
    isError,
    error,
  } = useAddDepartment();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(departmentSchema),
    defaultValues: { title: "", school: "" },
  });

  useEffect(() => {
    reset({ title: "", school: "" });
  }, [reset]);

  const onSubmit = (data) => {
    addDepartment(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Department</h2>

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
              {error?.message || "Failed to add department."}
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
              {isLoading ? "Adding..." : "Add Department"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeptModal;
