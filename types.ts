import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must have at least 1 character" }),
  age: z
    .number({ required_error: "Age is required", message: "Age is required" })
    .min(18, { message: "Must be at least 18 to register" }),
  email: z.string().email({ message: "Must be a valid email" }),
  website: z
    .string()
    .url({ message: "Must be a valid URL" })
    .optional()
    .or(z.literal("")),
  date: z
    .date({ required_error: "Date of birth is required" })
    .max(new Date(), { message: "Your date of birth must be in the past." }),
});

export type Form = z.infer<typeof formSchema>;
