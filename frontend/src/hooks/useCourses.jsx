import { useQuery } from "@tanstack/react-query";
import api,{getCookie} from "../api/axiosInstance";



export function useCourses() {
  // let baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1"
  const {data: courses, isLoading, isError, error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await api.get(`/courses`); // admin only
      return res.data.courses; // return array directly
    },
    retry: false, // prevent endless retries on 403
  });
 
  return { courses, isLoading, isError, error };
}


