import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useCourses() {
  const {
    data: lecturer,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["lecturer"],
    queryFn: async () => {
      const res = await api.get("/lecturer/register"); // admin only
      return res.data.courses; // return array directly
    },
    retry: false, // prevent endless retries on 403
  });

  return { lecturer, isLoading, isError, error };
}
