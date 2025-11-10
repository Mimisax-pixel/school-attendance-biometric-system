// /hooks/useAdminDashboard.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchAdminDashboard = async () => {
let baseUrl = import.meta.env.VITE_API_BASE_URL;
  const response = await axios.get(
    `${baseUrl}/admin/dashboard`,
    { withCredentials: true } // send JWT cookie for auth
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
