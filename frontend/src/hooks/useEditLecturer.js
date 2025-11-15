import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useEditLecturer() {
  const queryClient = useQueryClient();

  const {
    mutate: editLecturer,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await api.patch(`/lecturer/edit/${id}`, updatedData); // assuming PATCH endpoint exists
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lecturers"]);
    },
  });

  return { editLecturer, isLoading, isError, error };
}
