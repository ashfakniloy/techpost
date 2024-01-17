import SinglePost from "./SinglePost";
import PostLikes from "./PostLikes";
import PostComments from "./PostComments";
import { getSinglePostAdmin } from "@/db/queries/admin/getSinglePostAdmin";
import PostInfo from "./PostInfo";
import PostOption from "./PostOption";
import { getImagePlaceholder } from "@/utils/getImagePlaceholder";

type PostPageProps = {
  params: {
    category: string;
    slug: string;
  };
  searchParams: {
    showLikes: string;
    showReplies: string;
  };
};

async function AdminSinglePostPage({
  params: { slug },
  searchParams: { showLikes, showReplies },
}: PostPageProps) {
  const { data: post } = await getSinglePostAdmin({ slug });

  if (!post) {
    return <p>Post not found</p>;
  }

  const blurDataUrl = await getImagePlaceholder(post.imageUrl);

  return (
    <div className="relative">
      <div className="absolute -top-7 lg:-top-14 right-0">
        <PostOption
          id={post.id}
          title={post.title}
          slug={post.slug}
          isEditorsChoice={post.editorsChoice}
        />
      </div>
      <div className="pt-8 lg:pt-0 space-y-7">
        <PostInfo
          username={post.user.username}
          userImageUrl={post.user.profile?.imageUrl}
          likesCount={post._count.likes}
          commentsCount={post._count.comments}
          viewsCount={post._count.views}
        />
        <div className="flex flex-col lg:flex-row gap-7">
          <SinglePost post={post} blurDataUrl={blurDataUrl} />
          <div className="space-y-7 flex-1">
            <PostLikes likes={post.likes} />

            <PostComments
              postId={post.id}
              slug={post.slug}
              showLikes={showLikes}
              showReplies={showReplies}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminSinglePostPage;
