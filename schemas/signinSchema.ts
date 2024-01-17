import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(1, "Password is required"),
});

export type SigninFormProps = z.infer<typeof signinSchema>;
