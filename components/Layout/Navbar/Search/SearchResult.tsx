import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type Props = Post & {
  user: {
    username: string;
  };
};

function SearchResult({ heading, posts }: { heading: string; posts: Props[] }) {
  return (
    <section className="absolute top-[59px] w-full border rounded-md border-slate-300 dark:border-slate-700  bg-gray-50 dark:bg-custom-gray2 shadow-md">
      <p className="p-3 font-bold text-center text-gray-900 border-b border-slate-300 dark:border-slate-700 dark:text-gray-50 font-montserrat">
        {heading}
      </p>

      {posts.length > 0 ? (
        <div className="max-h-[445px] overflow-y-auto custom-scrollbar">
          <div className="px-4 ">
            <div>
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center gap-3 py-3 group"
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

                  <div className="flex flex-col self-start flex-1 max-w-[252px] break-words">
                    <h4 className="font-medium line-clamp-2 link">
                      <Link href={`/post/${post.slug}`}>{post.title}</Link>
                    </h4>

                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      By{" "}
                      <Link
                        href={`/user/${post.user.username}`}
                        className="link"
                      >
                        {post.user.username}
                      </Link>
                    </p>
                    <p>{/* Created At: {getTimeDistance(post.createdAt)} */}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p className="py-2 text-center">No posts available</p>
      )}
    </section>
  );
}

export default SearchResult;
