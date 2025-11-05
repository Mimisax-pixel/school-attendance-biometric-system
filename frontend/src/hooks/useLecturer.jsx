import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useCourses() {
  const {
    data: courses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await api.get("/lectures"); // admin only
      return res.data.courses; // return array directly
    },
    retry: false, // prevent endless retries on 403
  });

  return { courses, isLoading, isError, error };
}
