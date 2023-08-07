import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import List from "./List";
import Card from "./Card";
import { Post } from "@prisma/client";
import Pagination from "./Pagination";
import { PER_PAGE } from "@/config";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type Props = Post & {
  user: {
    id: string;
    username: string;
  };
  _count: {
    comments: number;
    views: number;
  };
};

async function PostsView({
  posts,
  postCount,
  limit,
}: {
  posts: Props[];
  postCount: number;
  limit: number;
}) {
  const session = await getServerSession(authOptions);

  const cookieStore = cookies();
  const view = cookieStore.get("view")?.value;

  return (
    <div className="">
      {posts.length ? (
        <div className="">
          {(!view || view === "list") && (
            <div className="">
              {posts.map((post) => (
                <List
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  categoryName={post.categoryName}
                  imageUrl={post.imageUrl}
                  imageId={post.imageId}
                  user={post.user}
                  article={post.article}
                  createdAt={post.createdAt}
                  session={session}
                  _count={post._count}
                />
              ))}
            </div>
          )}

          {view === "grid" && (
            <div className="mt-10 grid gtid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
              {posts.map((post) => (
                <Card
                  key={post.id}
                  id={post.id}
                  title={post.title}
                  categoryName={post.categoryName}
                  imageUrl={post.imageUrl}
                  imageId={post.imageId}
                  user={post.user}
                  article={post.article}
                  createdAt={post.createdAt}
                  session={session}
                  _count={post._count}
                />
              ))}
            </div>
          )}

          {postCount > (limit || PER_PAGE) && (
            <div className="mt-8">
              <Pagination postCount={postCount} limit={limit || PER_PAGE} />
            </div>
          )}
        </div>
      ) : (
        <p className="mt-20 text-xl text-center text-red-500">No post found</p>
      )}
    </div>
  );
}

export default PostsView;
