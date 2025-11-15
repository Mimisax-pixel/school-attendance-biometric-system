
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { getCookie } from "../api/axiosInstance.js";

let token = getCookie("token");

const fetchAdminDashboard = async () => {
let baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
  const response = await axios.get(
    `${baseUrl}/auth/admin/dashboard`,
    {
      headers: {
      "Authorization": "Bearer " +  token, 
    } } // send JWT cookie for auth
  );
  return response.data;
};

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: fetchAdminDashboard,
    staleTime: 1000 * 60, // 1 minute
    retry: 1, // retry once if fails
  });
};
