import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

function getCookie(name) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

api.defaults.headers.common["Authorization"] = "Bearer " + getCookie("token");

export function useEditCourse() {
  const queryClient = useQueryClient();
  let baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

  const {
    mutate: updateCourse,
    data,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (payload) => {
      const res = await api.patch(`${baseUrl}/courses/edit`, payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });

  return { updateCourse, data, isLoading, isError, error };
}
