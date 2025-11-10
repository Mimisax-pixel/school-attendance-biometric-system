import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useApi } from "../providers/ApiProvider";

let { baseUrl } = useApi();

export function useCourse(courseCode) {
  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["course", courseCode], // unique per code
    queryFn: async () => {
      const res = await api.get(`${baseUrl}/courses/${courseCode}`, {
        withCredentials: true, // ensure token cookie is sent
      });

      // The API returns an array inside "courses", so pick the first one
      return res.data.courses?.[0];
    },
    enabled: !!courseCode, // run only if courseCode is provided
    retry: false, // avoid infinite retry on 403
  });

  return { course, isLoading, isError, error };
}
