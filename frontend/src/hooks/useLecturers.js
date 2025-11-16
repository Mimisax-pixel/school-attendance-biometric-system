import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export function useLecturers(search = "") {
  return useQuery({
    queryKey: ["lecturers", search],
    queryFn: async () => {
      // If there is a search query, call the search endpoint
      if (search && search.trim() !== "") {
        const res = await api.get(
          `/lecturers/search?q=${encodeURIComponent(search)}`
        );
        return res.data.data || [];
      }

      // Otherwise, get the full list
      const res = await api.get("/lecturers");
      return res.data.data || [];
    },
  });
}
