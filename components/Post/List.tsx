import Link from "next/link";
import Image from "next/image";
import type { Session } from "next-auth";
import OptionButton from "./OptionButton";
import { getTimeDistance } from "@/utils/getTimeDistance";
import { PostItem } from "@/types";
import CountsSection from "./CountsSection";
// import { Suspense } from "react";
// import CountsFetch from "./CountsFetch";
// import CountsFetchSkeleton from "../Skeleton/CountsFetchSkeleton";

type SessionProps = {
  session: Session | null;
};

type ListProps = SessionProps & {
  post: PostItem;
  blurDataURL: string;
};

function List({ post, session, blurDataURL }: ListProps) {
  const {
    id,
    slug,
    imageUrl,
    title,
    shortDescription,
    user,
    categoryName,
    createdAt,
    _count,
  } = post;

  return (
    <div className="border-b last:border-b-0 border-gray-300 dark:border-gray-700 py-5 lg:py-10">
      <div className="flex lg:items-center gap-2.5 lg:gap-4">
        <Link
          href={`/post/${slug}`}
          className="w-[100px] h-[60px] lg:w-[230px] lg:h-[150px] mt-2 lg:mt-0"
        >
          <div className="w-full h-full relative overflow-hidden rounded-md">
            <Image
              src={imageUrl}
              placeholder="blur"
              blurDataURL={blurDataURL}
              alt="post image"
              fill
              sizes="(max-width: 768px) 100px, 240px"
              className="object-cover"
            />
            <span className="absolute bottom-0 left-0 rounded-tr-md  bg-black/70 text-white text-[10px] lg:text-xs px-1 lg:px-3 py-0.5 lg:py-1.5 capitalize">
              {categoryName}
            </span>
          </div>
        </Link>

        <div className="flex-1 min-h-[90px] lg:min-h-[150px] flex flex-col justify-between min-w-[150px] lg:max-w-[540px]">
          <div className="space-y-1.5">
            {/* <div className="max-w-[540px]"> */}
            <Link href={`/post/${slug}`}>
              <h3 className="link lg:text-xl font-montserrat font-semibold ">
                {title}
              </h3>
            </Link>

            <div className="flex items-center gap-2 text-xs lg:text-sm lg:gap-5 text-gray-500 dark:text-gray-400">
              <p className="capitalize">
                By{" "}
                <Link href={`/user/${user.username}`} className="link">
                  {user.username}
                </Link>
              </p>
              <p>{getTimeDistance(createdAt)}</p>
            </div>

            <div className=" !text-gray-700 dark:!text-gray-300 line-clamp-2 text-sm">
              {shortDescription}
            </div>
          </div>

          <div className="mt-1.5 flex items-center justify-between">
            <CountsSection
              likes={_count.likes}
              comments={_count.comments}
              views={_count.views}
            />

            {session?.user.id === user.id && (
              <OptionButton title={title} postId={id} slug={slug} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default List;
