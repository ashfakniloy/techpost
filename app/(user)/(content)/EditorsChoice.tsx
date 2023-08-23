// import { ClientFormattedDate } from "@/components/ClientFormattedDate";
// import { getAllPosts } from "@/prisma/find/getAllPosts";
// import Image from "next/image";
// import Link from "next/link";
// import parser from "html-react-parser";

// async function EditorsChoice() {
//   const { data: posts, count } = await getAllPosts({ limitNumber: 3 });

//   const post = posts?.[2];

//   const parsedArticle = parser(
//     post?.article.replace(/<(img|iframe)\b[^>]*>/g, "") || ""
//   );

//   return (
//     <div className="mb-8 relative rounded-lg overflow-hidden">
//       {post && (
//         <div className="">
//           <div className="h-[280px] lg:h-[470px] relative">
//             <Image
//               src={post.imageUrl}
//               // src={"/images/blankUser.jpg"}
//               alt="image"
//               fill
//               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//               className="object-cover"
//             />
//           </div>

//           {/* <div className="absolute p-5 bg-gradient-to-b from-transparent to-black/50 "></div> */}

//           <div className="absolute p-5 bg-gradient-to-b from-transparent to-black/60  flex flex-col justify-center text-white inset-x-0 bottom-0 font-montserrat select-none">
//             <h1 className="pt-7 text-2xl lg:text-4xl font-bold">
//               {post.title}
//             </h1>

//             <div className=" mt-2 lg:mt-2 flex items-center gap-3 text-xs lg:text-sm lg:gap-6">
//               <div className="flex items-center gap-2">
//                 <div className="">
//                   {/* {post.user.profile?.imageUrl ? ( */}
//                   <Image
//                     src="/images/blankUser.jpg"
//                     alt="user image"
//                     width={35}
//                     height={35}
//                     className="rounded-full"
//                   />
//                   {/* ) : (
//                           <Image
//                             src="/images/blankUser.jpg"
//                             alt="user image"
//                             width={35}
//                             height={35}
//                             className="rounded-full"
//                           />
//                         )} */}
//                 </div>

//                 <p className=" ">
//                   By{" "}
//                   <Link href={`/user/${post.user.username}`}>
//                     <span className=" hover:text-blue-800 dark:hover:text-blue-500">
//                       {post.user.username}
//                     </span>
//                   </Link>
//                 </p>
//               </div>
//               <p>
//                 <ClientFormattedDate date={post.createdAt} />
//               </p>
//             </div>
//             <div className="lg:mt-2 !text-white !line-clamp-1 lg:!line-clamp-2 text-xs lg:text-sm">
//               {parsedArticle}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default EditorsChoice;

import { ClientFormattedDate } from "@/components/ClientFormattedDate";
import { getAllPosts } from "@/prisma/find/getAllPosts";
import Image from "next/image";
import Link from "next/link";
import parser from "html-react-parser";

import {
  ChatBubbleLeftIcon,
  CheckBadgeIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";
import { getSinglePost } from "@/prisma/find/getSinglePost";
import { getEditorsChoicePost } from "@/prisma/find/getEditorsChoicePost";
import EditorsChoiceBadge from "@/components/EditorsChoiceBadge";
import PostLike from "@/components/Post/PostLike";
import { getTimeDistance } from "@/utils/getTimeDistance";
import { getDescription } from "@/utils/getDescription";

async function EditorsChoice() {
  // const { data: posts, count } = await getSinglePost({ limitNumber: 4 });
  const { data: post } = await getEditorsChoicePost();

  if (!post) {
    return <></>;
  }

  const description = getDescription(post.article, 200, 200);

  return (
    <section className="mb-8 relative rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 ">
      <Link href={`/post/${post.slug}`}>
        <div className="absolute right-2 top-2 lg:right-5 lg:top-5 z-10">
          <EditorsChoiceBadge />
        </div>
        <div className="h-[280px] lg:h-[470px] relative">
          <Image
            src={post.imageUrl}
            alt="image"
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
            priority
          />
        </div>

        <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-black/60 px-2 lg:px-5 pt-5 pb-3 lg:pt-10 lg:pb-6 flex flex-col justify-center text-white inset-x-0  font-montserrat select-none">
          <p className="capitalize text-sm font-semibold drop-shadow-md">
            {post.categoryName}
          </p>

          <h1 className="pt-2 text-xl lg:text-4xl font-bold drop-shadow-lg">
            {post.title}
          </h1>

          <div className=" mt-2 lg:mt-2 flex items-center gap-3 text-xs lg:text-sm lg:gap-6">
            <div className="flex items-center gap-2">
              <div className="">
                {post.user.profile?.imageUrl ? (
                  <Image
                    src={post.user.profile.imageUrl}
                    alt="user image"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                ) : (
                  <Image
                    src="/images/blankUser.jpg"
                    alt="user image"
                    width={35}
                    height={35}
                    className="rounded-full"
                  />
                )}
              </div>

              <p className="capitalize">By {post.user.username}</p>
            </div>
            <p>
              {getTimeDistance(post.createdAt)}
              {/* <ClientFormattedDate date={post.createdAt} /> */}
            </p>
          </div>

          <div className="mt-1 lg:mt-2 !text-white !line-clamp-1 lg:!line-clamp-2 text-xs lg:text-sm">
            {description}
          </div>
        </div>
      </Link>
    </section>
  );
}

export default EditorsChoice;
