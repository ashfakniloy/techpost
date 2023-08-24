import { z } from "zod";

export const usernameSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(
      /^[a-zA-Z0-9_\s]+$/,
      "Invalid username. Letters, numbers, spaces or underscores only"
    )
    .regex(/^[a-zA-Z][a-zA-Z0-9_\s]*$/, "Username must start with a letter"),
  password: z.string().nonempty("Password is required"),
});

export const passwordSchema = z
  .object({
    currentPassword: z.string().nonempty("Current Password is required"),
    newPassword: z
      .string()
      .nonempty("New Password is required")
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d).+$/,
        // "Password must contain at least 1 letter and 1 number"
        "Password requires atleast 1 letter and 1 number."
      ),
    retypePassword: z.string().nonempty("Re-enter your new password"),
  })
  .refine((data) => data.newPassword === data.retypePassword, {
    message: "Retype new password correctly",
    path: ["retypePassword"],
  });

export const emailSchema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is required"),
});

export const deleteAccountSchema = z.object({
  password: z.string().nonempty("Password is required"),
  text: z
    .string()
    .nonempty("This field is required")
    .refine(
      (value) => value === "delete my account",
      "Enter the text correctly"
    ),
});

export type UsernameFormProps = z.infer<typeof usernameSchema>;
export type PasswordFormProps = z.infer<typeof passwordSchema>;
export type EmailFormProps = z.infer<typeof emailSchema>;
export type DeleteAccountFormProps = z.infer<typeof deleteAccountSchema>;
