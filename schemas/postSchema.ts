import { z } from "zod";
import { removeHtmlTags } from "@/utils/removeHtmlTags";

export const postSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(5, "Title must be at least 5 characters")
    .max(150, "Title must be at most 150 characters"),
  categoryName: z.string().nonempty("Category is required"),
  imageUrl: z.string().nonempty("Image is required"),
  imageId: z.string().nonempty("Image is required"),
  article: z
    .string()
    .nonempty("Article is required")
    .refine(
      (value) => removeHtmlTags(value).length >= 300,
      "Article is too short"
    ),
});

export type PostFormProps = z.infer<typeof postSchema>;
