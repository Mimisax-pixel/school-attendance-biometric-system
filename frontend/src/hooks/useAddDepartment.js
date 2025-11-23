import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import toast from "react-hot-toast";

export function useAddDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post(`/department`, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Department added");
      queryClient.invalidateQueries(["Department"]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || "Failed to add department");
    },
  });
}

export default useAddDepartment;
