import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().min(1, "Category is required"),
  imageUrl: z.string().min(1, "Image is required"),
  imageId: z.string().min(1, "Image is required"),
  quotes: z.array(
    z.object({
      id: z.string().optional(), //for edit category
      quote: z.string().min(1, "Quote required"),
      author: z.string().min(1, "Author required"),
    })
  ),
  // .nullable()
  // .optional(),
});

export type CategoryFormProps = z.infer<typeof categorySchema>;
