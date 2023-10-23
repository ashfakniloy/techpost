import {
  Category,
  Comment,
  CommentLike,
  CommentReply,
  Like,
  Profile,
  Quote,
  User,
  View,
  Admin,
  Post,
} from "@prisma/client";

type Admin = Admin;

type View = View;

type Quote = Quote;

type User = User & {
  profile: Profile;
  likes: Like[];
  comments: Comment[];
  commentsLikes: CommentLike[];
  commentsReplies: CommentReply[];
};

type Profile = Profile & {
  user: User;
};

type Post = Post & {
  category: Category;
  user: User;
  likes: Like[];
  comments: Comment[];
  views: View[];
  commentsReplies: CommentReply[];
};

type PostItem = Omit<
  Post,
  "userId" | "views" | "updatedAt" | "editorsChoice" | "article"
> & {
  user: {
    id: string;
    username: string;
  };
  _count: {
    likes: number;
    comments: number;
    views: number;
  };
};

type Category = Category & {
  quotes: Quote[];
};

type Like = {
  id: string;
  createdAt: Date;
  postId: string;
  userId: string;
  user: {
    id: string;
    username: string;
    profile: {
      imageUrl: string | null;
    } | null;
  };
};

type Comment = Comment & {
  commentsLikes: CommentLike[];
  commentsReplies: CommentReply[];
  user: User & {
    profile: Profile;
  };
};

type CommentLike = CommentLike & {
  comment: Comment;
  user: User;
};

type CommentReply = CommentReply & {
  comment: Comment;
  post: Post;
  user: User;
};
