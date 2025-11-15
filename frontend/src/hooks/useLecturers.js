// /src/hooks/useLecturers.js
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useLecturers() {
  return useQuery({
    queryKey: ["lecturers"],
    queryFn: async () => {
      const res = await api.get("/lecturers");
      // backend returns { status, results, data }
      return res.data.data || [];
    },
  });
}
