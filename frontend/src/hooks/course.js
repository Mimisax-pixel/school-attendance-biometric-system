import { useQuery } from "@tanstack/react-query";
import api from "../api/axiosInstance";


export function useCourse(courseCode) {
  const {
    data: course,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["course", courseCode], // unique per code
    queryFn: async () => {
      const res = await api.get(`/courses/${courseCode}`);


      return res.data.courses?.[0];
    },
    enabled: !!courseCode, // run only if courseCode is provided
    retry: false, // avoid infinite retry on 403
  });

  return { course, isLoading, isError, error };
}
