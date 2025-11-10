// /hooks/useAdminDashboard.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useApi } from "../providers/ApiProvider";

const fetchAdminDashboard = async () => {
  let { baseUrl } = useApi();
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
