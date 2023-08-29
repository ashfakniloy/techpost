import { cookies } from "next/headers";
import { PER_PAGE } from "@/config";
import List from "./List";
import Card from "./Card";
import Pagination from "./Pagination";
import { getAuthSession } from "@/lib/next-auth";
import { getMultipleImagePlaceholder } from "@/utils/getImagePlaceholder";
import type { PostItem } from "@/types";

async function PostsView({
  posts,
  postCount,
  limit,
}: {
  posts: PostItem[];
  postCount: number;
  limit: number;
}) {
  const session = await getAuthSession();

  const cookieStore = cookies();
  const view = cookieStore.get("view")?.value;

  const imageUrls = posts.map((post) => post.imageUrl);

  const blurDataUrls = await getMultipleImagePlaceholder(imageUrls);

  return (
    <>
      {posts.length ? (
        <>
          {(!view || view === "list") &&
            posts.map((post, i) => (
              <List
                key={post.id}
                session={session}
                post={post}
                blurDataURL={blurDataUrls[i]}
              />
            ))}

          {view === "grid" && (
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
              {posts.map((post, i) => (
                <Card
                  key={post.id}
                  session={session}
                  post={post}
                  blurDataURL={blurDataUrls[i]}
                />
              ))}
            </div>
          )}

          {postCount > (limit || PER_PAGE) && (
            <div className="mt-8">
              <Pagination postCount={postCount} limit={limit || PER_PAGE} />
            </div>
          )}
        </>
      ) : (
        <p className="mt-20 text-xl text-center text-red-500">No post found</p>
      )}
    </>
  );
}

export default PostsView;

// import { cookies } from "next/headers";
// import type { Post } from "@prisma/client";
// import { PER_PAGE } from "@/config";
// import List from "./List";
// import Card from "./Card";
// import Pagination from "./Pagination";
// import { getAuthSession } from "@/lib/next-auth";
// import { getMultipleImagePlaceholder } from "@/utils/getImagePlaceholder";

// type Props = Post & {
//   user: {
//     id: string;
//     username: string;
//   };
//   _count: {
//     comments: number;
//     views: number;
//   };
// };

// async function PostsView({
//   posts,
//   postCount,
//   limit,
// }: {
//   posts: Props[];
//   postCount: number;
//   limit: number;
// }) {
//   const session = await getAuthSession();

//   const cookieStore = cookies();
//   const view = cookieStore.get("view")?.value;

//   const imageUrls = posts.map((post) => post.imageUrl);

//   const blurDataUrls = await getMultipleImagePlaceholder(imageUrls);

//   return (
//     <div>
//       {posts.length ? (
//         <div>
//           {(!view || view === "list") && (
//             <div>
//               {posts.map((post, i) => (
//                 <List
//                   key={post.id}
//                   id={post.id}
//                   slug={post.slug}
//                   title={post.title}
//                   categoryName={post.categoryName}
//                   imageUrl={post.imageUrl}
//                   imageId={post.imageId}
//                   user={post.user}
//                   article={post.article}
//                   createdAt={post.createdAt}
//                   session={session}
//                   _count={post._count}
//                   blurDataURL={blurDataUrls[i]}
//                 />
//               ))}
//             </div>
//           )}

//           {view === "grid" && (
//             <div className="mt-10 grid gtid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
//               {posts.map((post, i) => (
//                 <Card
//                   key={post.id}
//                   id={post.id}
//                   slug={post.slug}
//                   title={post.title}
//                   categoryName={post.categoryName}
//                   imageUrl={post.imageUrl}
//                   imageId={post.imageId}
//                   user={post.user}
//                   article={post.article}
//                   createdAt={post.createdAt}
//                   session={session}
//                   _count={post._count}
//                   blurDataURL={blurDataUrls[i]}
//                 />
//               ))}
//             </div>
//           )}

//           {postCount > (limit || PER_PAGE) && (
//             <div className="mt-8">
//               <Pagination postCount={postCount} limit={limit || PER_PAGE} />
//             </div>
//           )}
//         </div>
//       ) : (
//         <p className="mt-20 text-xl text-center text-red-500">No post found</p>
//       )}
//     </div>
//   );
// }

// export default PostsView;
