import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export function useEditCourse() {
  const queryClient = useQueryClient();

  const {
    mutate: updateCourse,
    data,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (payload) => {
      const res = await api.patch(`/courses/edit`, payload);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Course updated successfully!");
      queryClient.invalidateQueries(["courses"]);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update course");
    },
  });

  return { updateCourse, data, isLoading, isError, error };
}
