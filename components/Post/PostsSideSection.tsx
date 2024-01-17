import Link from "next/link";
import Image from "next/image";
import type { PostItem } from "@/types";

function PostsSideSection({
  heading,
  posts,
}: {
  heading: string;
  posts: PostItem[];
}) {
  return (
    <section className="bg-gray-50 dark:bg-custom-gray2 shadow-md rounded-md w-[360px]">
      <h4 className="p-3 font-bold text-center text-gray-900 border-b border-slate-300 dark:border-slate-700 dark:text-gray-50 font-montserrat capitalize">
        {heading}
      </h4>

      <div className="px-4 py-2">
        <div>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-3 py-3 min-h-[90px]"
              >
                <Link href={`/post/${post.slug}`}>
                  <div className="w-[85px] h-[55px] relative">
                    <Image
                      src={post.imageUrl}
                      alt="programming"
                      fill
                      sizes="85px"
                      className="object-cover rounded"
                    />
                  </div>
                </Link>

                <div className="flex flex-col self-start flex-1 max-w-[238px]">
                  <Link href={`/post/${post.slug}`}>
                    <h4 className="font-medium line-clamp-2 link">
                      {post.title}
                    </h4>
                  </Link>

                  <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                    By{" "}
                    <Link href={`/user/${post.user.username}`} className="link">
                      {post.user.username}
                    </Link>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="py-2 text-center">No posts available</p>
          )}
        </div>
      </div>
    </section>
  );
}

export default PostsSideSection;
