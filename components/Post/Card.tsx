import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";
import OptionButton from "./OptionButton";
import { getTimeDistance } from "@/utils/getTimeDistance";
import CountsSection from "./CountsSection";
import type { PostItem } from "@/types";

type SessionProps = {
  session: Session | null;
};

type CardProps = SessionProps & {
  post: PostItem;
  blurDataURL: string;
};

function Card({ post, blurDataURL, session }: CardProps) {
  const {
    id,
    slug,
    imageUrl,
    imageId,
    title,
    shortDescription,
    user,
    categoryName,
    createdAt,
    _count,
  } = post;

  return (
    <div className="transition-shadow duration-300 bg-gray-50 rounded-md shadow-md group dark:bg-custom-gray2 hover:shadow-lg min-w-[290px] lg:max-w-[386px]">
      <Link href={`/post/${slug}`}>
        <div className="h-[180px] lg:h-[220px] relative rounded-t-md overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              placeholder="blur"
              blurDataURL={blurDataURL}
              alt="post image"
              fill
              sizes="(max-width: 768px) 100vw, 390px"
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
            />
          )}

          <div className="absolute bottom-0 right-0">
            <span className="bg-black/70 text-xs lg:text-xs px-1.5 lg:px-3 py-1 lg:py-1.5 text-white capitalize">
              {categoryName}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4 flex flex-col justify-between min-h-[144px] lg:min-h-[192px] ">
        <div>
          <Link href={`/post/${slug}`}>
            <h3 className="link text-base leading-snug lg:leading-[28px] lg:text-xl font-montserrat font-semibold">
              {title}
            </h3>
          </Link>

          <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 lg:text-sm lg:mt-1 lg:gap-5 dark:text-gray-400">
            <p className="capitalize">
              By{" "}
              <Link href={`/user/${user.username}`} className="link">
                {user.username}
              </Link>{" "}
            </p>
            <p>{getTimeDistance(createdAt)}</p>
          </div>
          <div className="mt-1 lg:mt-2 text-xs lg:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {shortDescription}
          </div>
        </div>

        <div className="flex items-center justify-between mt-1">
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
  );
}

export default Card;
