import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export const useDeleteDepartment = () => {
  const queryClient = useQueryClient();

  const {
    mutate: deleteDepartment,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/department/${id}`);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Department deleted successfully!");
      queryClient.invalidateQueries(["department"]);
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || err.message || "Failed to delete Department"
      );
    },
  });

  return { deleteDepartment, isLoading, isError, error };
};

export default useDeleteDepartment;
