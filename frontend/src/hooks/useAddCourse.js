import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export const useAddCourse = () => {
  const queryClient = useQueryClient();

  const {
    mutate: addCourse,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (newCourse) => {
      const res = await api.post(`/course`, newCourse);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Course added successfully!");
      queryClient.invalidateQueries(["courses"]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || err.message || "Failed to add course"
      );
    },
  });

  return { addCourse, isLoading, isError, error };
};

export default useAddCourse;
