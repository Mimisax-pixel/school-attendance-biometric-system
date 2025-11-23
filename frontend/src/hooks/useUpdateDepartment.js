import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export function useUpdateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await api.patch(`/department/${id}`, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Department updated");
      queryClient.invalidateQueries(["Department"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to update department");
    },
  });
}
