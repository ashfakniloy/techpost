import { getSinglePost } from "@/prisma/find/getSinglePost";
import React from "react";
import SinglePost from "./SinglePost";
import PostLikes from "./PostLikes";
import PostComments from "./PostComments";
import { getSinglePostAdmin } from "@/prisma/find/admin/getSinglePostAdmin";
import PostInfo from "./PostInfo";

type PostPageProps = {
  params: {
    category: string;
    postId: string;
  };
  searchParams: {
    showLikes: string;
    showReplies: string;
  };
};

async function AdminSinglePostPage({
  params: { postId },
  searchParams: { showLikes, showReplies },
}: PostPageProps) {
  const { data: post } = await getSinglePostAdmin({ postId });

  if (!post) {
    return <p className="">Post not found</p>;
  }

  return (
    <div className="space-y-7">
      <PostInfo
        username={post.user.username}
        userImageUrl={post.user.profile?.imageUrl}
        likesCount={post._count.likes}
        commentsCount={post._count.comments}
        viewsCount={post._count.views}
      />
      <div className="flex gap-7">
        <SinglePost post={post} />
        <div className="space-y-7 flex-1">
          <PostLikes likes={post.likes} />

          <PostComments
            postId={post.id}
            showLikes={showLikes}
            showReplies={showReplies}
          />
          {/* <PostComments comments={post.comments} /> */}
        </div>
      </div>
    </div>
  );
}

export default AdminSinglePostPage;
