import z from "zod";

export const courseSchema = z.object({
  courseCode: z.string().min(1, "Course code is required"),
  courseTitle: z.string().min(1, "Course title is required"),
  department: z.string().min(1, "Department is required"),
  creditunits: z
    .number({ invalid_type_error: "Credit units must be a number" })
    .int("Credit units must be an integer")
    .positive("Credit units must be positive"),
});
