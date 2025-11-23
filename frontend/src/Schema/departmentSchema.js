import { z } from "zod";

export const departmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  school: z.string().optional(),
});

export default departmentSchema;
