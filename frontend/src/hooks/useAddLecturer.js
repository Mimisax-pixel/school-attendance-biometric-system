import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useAddLecturer() {
  const queryClient = useQueryClient();

  const {
    mutate: addLecturer,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (lecturerData) => {
      const res = await api.post("/lecturer/register", lecturerData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lecturers"]); // refresh list
    },
  });

  return { addLecturer, isLoading, isError, error };
}
