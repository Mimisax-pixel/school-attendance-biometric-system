/**
 * Refactored useAddCourse Hook
 * Demonstrates separation of concerns:
 * - API logic is in courseService (apiService.js)
 * - Hook only handles state and React Query
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { courseService } from "../services/apiService";

export const useAddCourse = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: courseService.createCourse,
    onSuccess: (data) => {
      toast.success(data.message || "Course added successfully!");
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add course";
      toast.error(errorMessage);
      console.error("Error adding course:", error);
    },
  });

  return {
    addCourse: mutation.mutate,
    addCourseAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export default useAddCourse;
