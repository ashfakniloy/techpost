import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type Props = Post & {
  user: {
    username: string;
  };
};

function PostsGroup({ heading, posts }: { heading: string; posts: Props[] }) {
  return (
    <div className="w-[360px] bg-gray-50 dark:bg-custom-gray2 shadow-md rounded-md">
      <p className="p-3 font-semibold text-center text-gray-900 break-words border-b border-slate-300 dark:border-slate-700 dark:text-gray-50 font-montserrat">
        {heading}
      </p>

      <div className="px-4 py-2">
        <div className="overflow-hidden ">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-3 py-3 min-h-[90px]"
              >
                <Link href={`/post/${post.id}`}>
                  <div className="w-[85px] h-[55px] relative">
                    <Image
                      src={post.imageUrl}
                      alt="programming"
                      fill
                      sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 10vw"
                      className="object-cover rounded"
                    />
                  </div>
                </Link>

                <div className="flex flex-col self-start flex-1">
                  <h4 className="font-medium line-clamp-2 title-color">
                    <Link href={`/post/${post.id}`}>{post.title}</Link>
                  </h4>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    By
                    <Link
                      href={`/user/${post.user.username}`}
                      className="ml-1 link"
                    >
                      {post.user.username}
                    </Link>
                  </p>
                  <p className="">
                    {/* Created At: {getTimeDistance(post.createdAt)} */}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="py-2 text-center">No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostsGroup;
