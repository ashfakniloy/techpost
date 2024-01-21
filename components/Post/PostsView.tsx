//without view toggle
import List from "./List";
import Pagination from "./Pagination";
import { getAuthSession } from "@/lib/next-auth";
import type { PostItem } from "@/types";
import { PER_PAGE } from "@/config";
import { getMultipleImagePlaceholder } from "@/utils/getImagePlaceholder";
import { Suspense } from "react";

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

  const imageUrls = posts.map((post) => post.imageUrl);

  const blurDataUrls = await getMultipleImagePlaceholder(imageUrls);

  return (
    <>
      {posts.length ? (
        <>
          {posts.map((post, i) => (
            <List
              key={post.id}
              session={session}
              post={post}
              blurDataURL={blurDataUrls[i]}
            />
          ))}

          {postCount > (limit || PER_PAGE) && (
            <div className="mt-8">
              <Suspense fallback={null}>
                <Pagination postCount={postCount} limit={limit || PER_PAGE} />
              </Suspense>
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

// //with view toggle

// import { cookies } from "next/headers";
// import { PER_PAGE } from "@/config";
// import List from "./List";
// import Card from "./Card";
// import Pagination from "./Pagination";
// import { getAuthSession } from "@/lib/next-auth";
// import { getMultipleImagePlaceholder } from "@/utils/getImagePlaceholder";
// import type { PostItem } from "@/types";

// async function PostsView({
//   posts,
//   postCount,
//   limit,
// }: {
//   posts: PostItem[];
//   postCount: number;
//   limit: number;
// }) {
//   const session = await getAuthSession();

//   const cookieStore = cookies();
//   const view = cookieStore.get("view")?.value;

//   const imageUrls = posts.map((post) => post.imageUrl);

//   const blurDataUrls = await getMultipleImagePlaceholder(imageUrls);

//   return (
//     <>
//       {posts.length ? (
//         <>
//           {(!view || view === "list") &&
//             posts.map((post, i) => (
//               <List
//                 key={post.id}
//                 session={session}
//                 post={post}
//                 blurDataURL={blurDataUrls[i]}
//               />
//             ))}

//           {view === "grid" && (
//             <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
//               {posts.map((post, i) => (
//                 <Card
//                   key={post.id}
//                   session={session}
//                   post={post}
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
//         </>
//       ) : (
//         <p className="mt-20 text-xl text-center text-red-500">No post found</p>
//       )}
//     </>
//   );
// }

// export default PostsView;
