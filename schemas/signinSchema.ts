import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is required"),
});

export type SigninFormProps = z.infer<typeof signinSchema>;
