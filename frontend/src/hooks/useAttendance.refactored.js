/**
 * Refactored useAttendance Hook
 * Demonstrates proper separation of concerns for complex operations
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { attendanceService } from "../services/apiService";

/**
 * Hook to record student attendance
 */
export const useRecordAttendance = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ studentId, sessionId, biometricData }) =>
      attendanceService.recordAttendance(studentId, sessionId, biometricData),
    onSuccess: (data) => {
      toast.success(data.message || "Attendance recorded successfully!");
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to record attendance";
      toast.error(errorMessage);
      console.error("Error recording attendance:", error);
    },
  });

  return {
    recordAttendance: mutation.mutate,
    recordAttendanceAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
};

/**
 * Hook to get session attendance records
 */
export const useSessionAttendance = (sessionId, enabled = true) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["attendance", sessionId],
    queryFn: () => attendanceService.getSessionAttendance(sessionId),
    enabled: enabled && !!sessionId,
    staleTime: 2 * 60 * 1000, // 2 minutes
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
 * Hook to manage attendance sessions
 */
export const useAttendanceSession = () => {
  const queryClient = useQueryClient();

  const startSession = useMutation({
    mutationFn: ({ courseId, startTime }) =>
      attendanceService.startSession(courseId, startTime),
    onSuccess: (data) => {
      toast.success("Session started successfully!");
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to start session";
      toast.error(errorMessage);
    },
  });

  const endSession = useMutation({
    mutationFn: attendanceService.endSession,
    onSuccess: (data) => {
      toast.success("Session ended successfully!");
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to end session";
      toast.error(errorMessage);
    },
  });

  return {
    startSession: startSession.mutate,
    startSessionAsync: startSession.mutateAsync,
    isStarting: startSession.isPending,
    endSession: endSession.mutate,
    endSessionAsync: endSession.mutateAsync,
    isEnding: endSession.isPending,
  };
};

export default useRecordAttendance;
