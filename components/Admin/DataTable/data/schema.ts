import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
// export const taskSchema = z.object({
//   id: z.string(),
//   title: z.string(),
//   status: z.string(),
//   label: z.string(),
//   priority: z.string(),
// });

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  // profile: z.object({
  //   imageUrl: z.string().nullable(),
  //   imageId: z.string().nullable(),
  // }),
  _count: z.object({ posts: z.number() }),
});

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  imageUrl: z.string(),
  imageId: z.string(),
  article: z.string(),
  categoryName: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  user: z.object({ username: z.string() }),
  _count: z.object({
    likes: z.number(),
    comments: z.number(),
    views: z.number(),
  }),
});

export type User = z.infer<typeof userSchema>;
export type Post = z.infer<typeof postSchema>;
