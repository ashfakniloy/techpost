import { z } from "zod";

const facebookRegex = /^https:\/\/(www\.)?facebook.com\/[a-zA-Z0-9(\.\?)?]/;
const twitterRegex = /^https:\/\/(www\.)?twitter.com\/[a-zA-Z0-9_]+\/?$/;
const linkedinRegex =
  /^https:\/\/(www\.)?linkedin.com\/(?:in|company)\/[a-zA-Z0-9\-]+\/?$/;

export const profileSchema = z.object({
  imageUrl: z.string().optional(),
  imageId: z.string().optional(),
  bio: z
    .string()
    .min(5, "Bio must be at least 5 characters")
    .max(500, "Bio must be at most 500 characters")
    .or(z.literal("")),
  facebook: z
    .string()
    .regex(facebookRegex, "Enter a valid facebook url link")
    .or(z.literal("")),
  twitter: z
    .string()
    .regex(twitterRegex, "Enter a valid twitter url link")
    .or(z.literal("")),
  linkedin: z
    .string()
    .regex(linkedinRegex, "Enter a valid linkedin url link")
    .or(z.literal("")),
});

export type ProfileFormProps = z.infer<typeof profileSchema>;
