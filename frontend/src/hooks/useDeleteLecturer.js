// /src/hooks/useDeleteLecturer.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useDeleteLecturer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (lecturerId) => {
      const res = await api.delete(`/lecturer/${lecturerId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lecturers"]);
    },
  });
}
