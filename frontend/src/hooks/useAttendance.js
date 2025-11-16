import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance.js";

const fetchAttendance = async ({ queryKey }) => {
  const [_key, params = {}] = queryKey;
  const { page = 0, limit = 20, q, department, level, studentId } = params;
  const searchParams = new URLSearchParams();
  searchParams.set("page", page);
  searchParams.set("limit", limit);
  if (department) searchParams.set("department", department);
  if (level) searchParams.set("level", level);
  if (studentId) searchParams.set("studentId", studentId);
  if (q) searchParams.set("q", q);

  const response = await api.get(
    `/attendance-records?${searchParams.toString()}`
  );
  return response.data;
};

export const useAttendance = (params = { page: 0, limit: 20 }) => {
  return useQuery({
    queryKey: ["attendance", params],
    queryFn: fetchAttendance,
    staleTime: 1000 * 60,
    retry: 1,
  });
};
