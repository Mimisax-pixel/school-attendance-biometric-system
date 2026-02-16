/**
 * Refactored useDeleteCourse Hook
 * Demonstrates separation of concerns and error handling
 */

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { courseService } from "../services/apiService";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: courseService.deleteCourse,
    onSuccess: (data) => {
      toast.success(data.message || "Course deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete course";
      toast.error(errorMessage);
      console.error("Error deleting course:", error);
    },
  });

  return {
    deleteCourse: mutation.mutate,
    deleteCourseAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    isSuccess: mutation.isSuccess,
  };
};

export default useDeleteCourse;
