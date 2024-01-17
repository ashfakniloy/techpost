import { z } from "zod";

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(1, "Username is required")
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .regex(
        /^[a-zA-Z0-9_\s]+$/,
        "Invalid username. Letters, numbers, spaces or underscores only"
      )
      .regex(/^[a-zA-Z][a-zA-Z0-9_\s]*$/, "Username must start with a letter"),
    email: z.string().min(1, "Email is required").email("Invalid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d).+$/,
        // "Password must contain at least 1 letter and 1 number"
        "Password requires atleast 1 letter and 1 number."
      ),
    confirm_password: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type SignupFormProps = z.infer<typeof signupSchema>;
