import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  function getCookie(name) {
    return document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="))
      ?.split("=")[1];
  }



  const { mutate: deleteCourse, isLoading } = useMutation({
    mutationFn: async (courseCode) => {
      const response = await fetch(
        `http://localhost:5000/api/v1/courses/${courseCode}`,
        {
          method: "DELETE",
          headers: {
            "authorization": "Bearer " + getCookie("token"),
          }
        }
      );

      if (!response.ok) throw new Error("Failed to delete course");
      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["courses"]);
    },
  });

  return { deleteCourse, isLoading };
};
