import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getCookie } from "../api/axiosInstance";


export const useAddCourse = () => {
  const queryClient = useQueryClient();
  let { baseUrl } = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";
 
  let token = getCookie("token");


  const {
    mutate: addCourse,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (newCourse) => {
      const response = await fetch(`${baseUrl}/course`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer  + ${token}`,
        },
        body: JSON.stringify(newCourse),
      });

      if (!response.ok) throw new Error("Failed to add course");
      return response.json();
    },

    // onSuccess: () => {
    //   queryClient.invalidateQueries(["courses"]);
    // },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["courses"]);
      return data;
    },
  });

  return { addCourse, isLoading, isError, error };
};
