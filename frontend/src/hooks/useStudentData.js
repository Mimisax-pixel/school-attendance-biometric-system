/**
 * Custom Hook for Student Data
 * Fetches student grades, attendance, courses, and performance
 */

import { useQuery } from "@tanstack/react-query";
import { studentDataService } from "../services/apiService";

/**
 * Hook to fetch student's grades
 */
export const useStudentGrades = (options = {}) => {
  const { enabled = true } = options;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["studentGrades"],
    queryFn: studentDataService.getStudentGrades,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    grades: data?.data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
};

/**
 * Hook to fetch student's attendance records
 */
export const useStudentAttendance = (options = {}) => {
  const { enabled = true } = options;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["studentAttendance"],
    queryFn: studentDataService.getStudentAttendance,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    attendance: data?.data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
};

/**
 * Hook to fetch student's registered courses
 */
export const useStudentCourses = (options = {}) => {
  const { enabled = true } = options;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["studentCourses"],
    queryFn: studentDataService.getStudentRegisteredCourses,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    courses: data?.data || [],
    isLoading,
    isError,
    error,
    refetch,
  };
};

/**
 * Hook to fetch student's academic performance (GPA)
 */
export const useStudentPerformance = (options = {}) => {
  const { enabled = true } = options;

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["studentPerformance"],
    queryFn: studentDataService.getStudentPerformance,
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    performance: data?.data || { gpa: 0, totalCourses: 0 },
    isLoading,
    isError,
    error,
    refetch,
  };
};

export default {
  useStudentGrades,
  useStudentAttendance,
  useStudentCourses,
  useStudentPerformance,
};
