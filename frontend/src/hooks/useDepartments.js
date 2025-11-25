import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useDepartments() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["departments"],
    queryFn: async () => {
      const res = await api.get(`/department`);
      const payload = res.data;
      // backend may return departments under different keys
      return payload.departments || payload.courses || payload.data || [];
    },
    retry: false,
  });

  return { departments: data || [], isLoading, isError, error };
}

export default useDepartments;
