import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../providers/ApiProvider";

export const useAddCourse = () => {
  const queryClient = useQueryClient();
  let { baseUrl } = useApi();
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
        headers: { "Content-Type": "application/json" },
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
