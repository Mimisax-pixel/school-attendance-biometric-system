import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance.js";

const fetchAttendance = async ({ queryKey }) => {
  const [_key, { page = 0, limit = 20 }] = queryKey;
  const response = await api.get(
    `/attendance-records?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const useAttendance = (page = 0, limit = 20) => {
  return useQuery({
    queryKey: ["attendance", { page, limit }],
    queryFn: fetchAttendance,
    staleTime: 1000 * 60,
    retry: 1,
  });
};
