import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
            authorization: "Bearer " + getCookie("token"),
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete course");
      return response.json();
    },

    onSuccess: () => {
      toast.success("Course deleted successfully!");
      queryClient.invalidateQueries(["courses"]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete course");
    },
  });

  return { deleteCourse, isLoading };
};
