import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance.js";

const fetchAdminDashboard = async () => {
  const response = await api.get(`/auth/admin/dashboard`);
  return response.data;
};

export const useAdminDashboard = () => {
  return useQuery({
    queryKey: ["adminDashboard"],
    queryFn: fetchAdminDashboard,
    staleTime: 1000 * 60,
    retry: 1,
  });
};
