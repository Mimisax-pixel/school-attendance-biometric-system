import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteCourse,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (courseId) => {
      const res = await api.delete(`/courses/${courseId}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Course deleted successfully!");
      queryClient.invalidateQueries(["courses"]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || err.message || "Failed to delete course"
      );
    },
  });

  return { deleteCourse, isLoading, isError, error };
};

export default useDeleteCourse;
