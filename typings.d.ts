// import { StaticImageData } from "next/image";

// import { Comment, Profile, User } from "@prisma/client";

// type Post = {
//   title: string;
//   category: string;
//   description: string;
//   // image: string;
//   image: StaticImageData;
//   user: string;
//   date: string;
// };

type CategoryProps = {
  id: string;
  name: string;
  _count: {
    posts: number;
  };
};

type SearchParams = {
  searchParams: {
    page: string;
    limit: string;
    sort: string;
    search: string;
  };
};

type UserProps = {
  id: string;
  username: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  posts: PostProps[];
  profile: ProfileProps;
  likes: LikeProps[];
};

type ProfileProps = {
  id: string;
  bio?: string;
  facebook?: string;
  twitter?: string;
  imageUrl?: string;
  imageId?: string;
  createdAt: Date;
  updatedAt?: Date;
  //   user: {
  //     username: string;
  // };
  userId: string;
};

type PostProps = {
  id: string;
  title: string;
  category: string;
  article: string;
  imageUrl: string;
  imageId: string;
  createdAt: string;
  updatedAt?: string;
  user: UserProps;
  // likes: LikeProps[];
  _count?: {
    comments?: number;
    likes?: number;
    views?: number;
  };
};

type LikeProps = {
  id: string;
  createdAt: string;
  post: PostProps;
  postId: string;
  user: UserProps;
  userId: string;
};

type FormProps = {
  title: string;
  category: string;
  article: string;
  imageUrl: string;
  imageId: string;
};

// type CommentProps = Comment & {
//   user: User & {
//     profile: Profile;
//   };
// };
