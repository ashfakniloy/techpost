import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().nonempty("Category is required"),
  imageUrl: z.string().nonempty("Image is required"),
  imageId: z.string().nonempty("Image is required"),
  quotes: z.array(
    z.object({
      id: z.string().optional(), //for edit category
      quote: z.string().nonempty("Quote required"),
      author: z.string().nonempty("Author required"),
    })
  ),
  // .nullable()
  // .optional(),
});

export type CategoryFormProps = z.infer<typeof categorySchema>;
