// import OptionButton from "@/components/Post/OptionButton";
// import { getFormatedDate } from "@/utils/getFormatedDate";
// import Image from "next/image";
// import Link from "next/link";
// import parser from "html-react-parser";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getSinglePost } from "@/db/queries/getSinglePost";
// import { notFound } from "next/navigation";

// async function SinglePost({ postId }: { postId: string }) {
//   const session = await getServerSession(authOptions);

//   // await new Promise((resolve) => setTimeout(resolve, 5000));

//   const { data: post } = await getSinglePost({ postId });

//   if (!post) {
//     notFound();
//   }

//   return (
//     <div className="">
//       <div className="mb-4 text-gray-700 dark:text-gray-300 ">
//         <Link
//           href={`/category/${post.categoryName}`}
//           className="capitalize hover:text-blue-800 dark:hover:text-blue-500"
//         >
//           {post.categoryName}
//         </Link>
//       </div>
//       <div className="">
//         <div className="flex flex-col min-h-[135px]">
//           <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 font-montserrat">
//             {post.title}
//           </h1>

//           <div className="flex items-center gap-6 mt-5">
//             <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
//               <div className="flex items-center gap-2">
//                 <div className="">
//                   {post.user.profile?.imageUrl ? (
//                     <Image
//                       src={post.user.profile.imageUrl}
//                       alt="user image"
//                       width={35}
//                       height={35}
//                       className="rounded-full"
//                     />
//                   ) : (
//                     <Image
//                       src="/images/blankUser.jpg"
//                       alt="user image"
//                       width={35}
//                       height={35}
//                       className="rounded-full"
//                     />
//                   )}
//                 </div>

//                 <p className="">
//                   By{" "}
//                   <Link href={`/user/${post.user.username}`}>
//                     <span className="hover:text-blue-800 dark:hover:text-blue-500">
//                       {post.user.username}
//                     </span>
//                   </Link>
//                 </p>
//               </div>
//               <p className="">{getFormatedDate(post.createdAt)}</p>
//             </div>
//             {session?.user.id === post.user.id && (
//               <OptionButton
//                 title={post.title}
//                 postId={post.id}
//                 imageId={post.imageId}
//                 redirectAfterDelete={"/"}
//               />
//             )}
//           </div>
//         </div>

//         <div className="mt-5 h-[470px] relative">
//           <Image
//             src={post.imageUrl}
//             alt="image"
//             fill
//             sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//             className="object-cover"
//           />
//         </div>

//         <div className="mt-6 ProseMirror !border-none !p-0 !max-h-full">
//           {parser(post.article)}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SinglePost;

// // import OptionButton from "@/components/Post/OptionButton";
// // import { getFormatedDate } from "@/utils/getFormatedDate";
// // import Image from "next/image";
// // import Link from "next/link";
// // import parser from "html-react-parser";
// // import { getServerSession } from "next-auth";
// // import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// // import { getSinglePost } from "@/db/queries/getSinglePost";
// // import { notFound } from "next/navigation";
// // import PostLike from "@/components/Post/PostLike";
// // import { EyeIcon } from "@heroicons/react/24/solid";
// // import { getPluralize } from "@/utils/getPluralize";
// // import Comment from "@/components/Post/Comment";
// // import { Suspense } from "react";
// // import PostsCardSkeleton from "@/components/Skeleton/PostsCardSkeleton";
// // import RelatedPosts from "./RelatedPosts";
// // import UsersMorePosts from "./UsersMorePosts";
// // import CategoriesSkeleton from "@/components/Skeleton/CategoriesSkeleton";
// // import Categories from "@/components/Post/Categories";

// // async function SinglePost({ postId }: { postId: string }) {
// //   const session = await getServerSession(authOptions);

// //   await new Promise((resolve) => setTimeout(resolve, 5000));

// //   const { data: post } = await getSinglePost({ postId });

// //   if (!post) {
// //     notFound();
// //   }

// //   return (
// //     <div className="relative flex items-start justify-between gap-5">
// //       <div className="flex-1">
// //         <div className="mb-4 text-gray-700 dark:text-gray-300 ">
// //           <Link
// //             href={`/category/${post.categoryName}`}
// //             className="capitalize hover:text-blue-800 dark:hover:text-blue-500"
// //           >
// //             {post.categoryName}
// //           </Link>
// //         </div>
// //         <div className="">
// //           <div className="flex flex-col min-h-[135px]">
// //             <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-50 font-montserrat">
// //               {post.title}
// //             </h1>

// //             <div className="flex items-center gap-6 mt-5">
// //               <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
// //                 <div className="flex items-center gap-2">
// //                   <div className="">
// //                     {post.user.profile?.imageUrl ? (
// //                       <Image
// //                         src={post.user.profile.imageUrl}
// //                         alt="user image"
// //                         width={35}
// //                         height={35}
// //                         className="rounded-full"
// //                       />
// //                     ) : (
// //                       <Image
// //                         src="/images/blankUser.jpg"
// //                         alt="user image"
// //                         width={35}
// //                         height={35}
// //                         className="rounded-full"
// //                       />
// //                     )}
// //                   </div>

// //                   <p className="">
// //                     By{" "}
// //                     <Link href={`/user/${post.user.username}`}>
// //                       <span className="hover:text-blue-800 dark:hover:text-blue-500">
// //                         {post.user.username}
// //                       </span>
// //                     </Link>
// //                   </p>
// //                 </div>
// //                 <p className="">{getFormatedDate(post.createdAt)}</p>
// //               </div>
// //               {session?.user.id === post.user.id && (
// //                 <OptionButton
// //                   title={post.title}
// //                   postId={post.id}
// //                   imageId={post.imageId}
// //                   redirectAfterDelete={"/"}
// //                 />
// //               )}
// //             </div>
// //           </div>

// //           <div className="mt-5 h-[470px] relative">
// //             <Image
// //               src={post.imageUrl}
// //               alt="image"
// //               fill
// //               sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
// //               className="object-cover"
// //             />
// //           </div>

// //           <div className="mt-6 ProseMirror !border-none !p-0 !max-h-full">
// //             {parser(post.article)}
// //           </div>
// //         </div>

// //         <div className="flex items-center mt-8 font-semibold text-gray-700 dark:text-gray-300">
// //           <PostLike postId={post.id} />
// //           {post._count.views > 0 && (
// //             <div className="flex items-center gap-2 text-sm">
// //               <EyeIcon className="w-6 h-6 text-gray-600" />
// //               <p className="">{getPluralize(post._count.views, "View", "s")}</p>
// //             </div>
// //           )}
// //         </div>

// //         <div className="mt-5">
// //           <Comment postId={postId} authorId={post.userId} />
// //         </div>
// //       </div>

// //       <div className="flex flex-col gap-5">
// //         <Suspense fallback={<PostsCardSkeleton heading="Related Posts" />}>
// //           <RelatedPosts
// //             categoryName={post.categoryName}
// //             currentPostId={post.id}
// //           />
// //         </Suspense>

// //         <Suspense
// //           fallback={
// //             <PostsCardSkeleton
// //               heading={`More Posts from ${post.user.username}`}
// //             />
// //           }
// //         >
// //           <UsersMorePosts
// //             username={post.user.username}
// //             currentPostId={post.id}
// //           />
// //         </Suspense>

// //         <Suspense fallback={<CategoriesSkeleton />}>
// //           <Categories />
// //         </Suspense>
// //       </div>
// //     </div>
// //   );
// // }

// // export default SinglePost;
