import { useQuery } from "@tanstack/react-query";
import api, { getCookie } from "../api/axiosInstance";

export function useDepartment() {
  const {
    data: departments,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["Department"],
    queryFn: async () => {
      const res = await api.get(`/department`); // admin only
      return res.data.courses; // return array directly
    },
    retry: false, // prevent endless retries on 403
  });

  return { departments, isLoading, isError, error };
}
