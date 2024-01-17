import { z } from "zod";
import { removeHtmlTags } from "@/utils/removeHtmlTags";

export const postSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be at most 150 characters")
    .refine((value) => value.trim().length > 0, "Title can't be empty")
    .refine(
      (value) => value.trim().length >= 5,
      "Title must be at least 5 characters"
    ),
  categoryName: z.string().min(1, "Category is required"),
  imageUrl: z.string().min(1, "Image is required"),
  imageId: z.string().min(1, "Image is required"),
  article: z
    .string()
    .min(1, "Article is required")
    .refine(
      (value) => removeHtmlTags(value).length >= 300,
      "Article is too short"
    ),
});

export type PostFormProps = z.infer<typeof postSchema>;
