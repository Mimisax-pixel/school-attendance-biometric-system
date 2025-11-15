import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "../api/axiosInstance.js";



let baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
let token = getCookie("token");
const fetchAttendance = async ({ queryKey }) => {
  const [_key, { page = 0, limit = 20 }] = queryKey;
  const response = await axios.get(
    `${baseUrl}/attendance-records?page=${page}&limit=${limit}`,
    {
      headers: {
      "Authorization": "Bearer " +  token,
    }}
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
