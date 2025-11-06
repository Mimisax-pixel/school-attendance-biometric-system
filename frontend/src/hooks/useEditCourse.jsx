import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance"; 

export function useEditCourse() {
  const queryClient = useQueryClient();

const {
  mutate: updateCourse,
  data,
  isLoading,
  isError,
  error,
} = useMutation({
  mutationFn: async ({ id, ...data }) => {
    const res = await api.patch(`/courses/edit ${id}`, data);
    return res.data;
  },
  onSuccess: () => {
    queryClient.invalidateQueries(["courses"]);
  },
});

  return { updateCourse, data, isLoading, isError, error };
}
