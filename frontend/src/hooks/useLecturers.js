// /src/hooks/useLecturers.js
import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useLecturers(search = "") {
  return useQuery({
    queryKey: ["lecturers", search],
    queryFn: async () => {
      if (search && search.trim() !== "") {
        const res = await api.get(
          `/lecturers/search?q=${encodeURIComponent(search)}`
        );
        return res.data.data || [];
      }
      const res = await api.get("/lecturers");
      // backend returns { status, results, data }
      return res.data.data || [];
    },
  });
}
