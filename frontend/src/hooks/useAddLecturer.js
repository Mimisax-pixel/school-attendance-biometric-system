// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "../api/axiosInstance";
// import toast from "react-hot-toast";

// export function useAddLecturer() {
//   const queryClient = useQueryClient();

//   const {
//     mutate: addLecturer,
//     isLoading,
//     isError,
//     error,
//   } = useMutation({
//     mutationFn: async (lecturerData) => {
//       const res = await api.post("/lecturer/register", lecturerData);
//       return res.data;
//     },
//     onSuccess: (data) => {
//       toast.success(data.message || "Lecturer added successfully");
//       queryClient.invalidateQueries(["lecturers"]); // refresh list
//     },
//     onError: (error) => {
//       toast.error(error.response?.data?.error || "Failed to add lecturer");
//     },
//   });

//   return { addLecturer, isLoading, isError, error };
// }



// src/hooks/useAddLecturer.js
// src/hooks/useAddLecturer.js
// src/hooks/useAddLecturer.js
// src/hooks/useAddLecturer.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/axiosInstance";

export const useAddLecturer = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await api.post("/lecturer/register", formData, {
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["lecturers"]);
    },
  });

  return {
    addLecturer: mutation.mutate,
    isAdding: mutation.isLoading,
  };
};

