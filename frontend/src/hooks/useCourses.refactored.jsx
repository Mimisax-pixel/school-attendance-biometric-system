/**
 * Refactored useCourses Hook
 * Demonstrates separation of concerns:
 * - API logic is in courseService (apiService.js)
 * - Hook only handles React Query state
 */

import { useQuery } from "@tanstack/react-query";
import { courseService } from "../services/apiService";

export function useCourses(options = {}) {
  const {
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheTime = 10 * 60 * 1000, // 10 minutes
  } = options;

  const {
    data: courses,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: courseService.getAllCourses,
    enabled,
    staleTime,
    gcTime: cacheTime, // renamed from cacheTime in React Query v5
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  return {
    courses: courses?.data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
}

export default useCourses;
