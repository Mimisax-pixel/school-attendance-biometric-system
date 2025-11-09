
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAttendance = async ({ queryKey }) => {
  const [_key, { page = 0, limit = 20 }] = queryKey;
  const response = await axios.get(
    `http://localhost:5000/api/v1/attendance-records?page=${page}&limit=${limit}`,
    { withCredentials: true }
  );
  return response.data;
};

export const useAttendance = (page = 0, limit = 20) => {
  return useQuery({
    queryKey: ["attendance", { page, limit }],
    queryFn: fetchAttendance,
    staleTime: 1000 * 60, // 1 minute
    retry: 1,
  });
};
