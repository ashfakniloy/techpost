import Image from "next/image";
import Link from "next/link";
import type { Session } from "next-auth";
import OptionButton from "./OptionButton";
import PostLike from "./PostLike";
import { Post } from "@prisma/client";
import { getTimeDistance } from "@/utils/getTimeDistance";
import { getPluralize } from "@/utils/getPluralize";
import { EyeIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";
import { getDescription } from "@/utils/getDescription";

type SessionProps = {
  session: Session | null;
};

type CardProps = Omit<
  Post,
  "userId" | "views" | "updatedAt" | "editorsChoice"
> & {
  user: {
    id: string;
    username: string;
  };
  _count: {
    comments: number;
    views: number;
  };
};

function Card({
  id,
  slug,
  title,
  categoryName,
  user,
  createdAt,
  imageUrl,
  imageId,
  article,
  session,
  _count,
}: CardProps & SessionProps) {
  // const description = parser(
  //   article.replace(/<(img|iframe)\b[^>]*>/g, "") || ""
  // );

  const description = getDescription(article, 200, 200);

  return (
    <section className="transition-shadow duration-300 bg-gray-50 rounded-md shadow-md group dark:bg-custom-gray2 hover:shadow-lg min-w-[290px] lg:max-w-[386px]">
      <Link href={`/post/${slug}`}>
        <div className="h-[180px] lg:h-[220px] relative rounded-t-md overflow-hidden">
          <Image
            src={imageUrl}
            alt="programming"
            fill
            sizes="400px"
            className="object-cover transition duration-700 ease-out group-hover:scale-105"
          />

          <div className="absolute bottom-0 right-0">
            <span className="bg-black/70 text-[10px] lg:text-xs px-1.5 lg:px-3 py-1 lg:py-1.5 text-white text-xs capitalize">
              {categoryName}
            </span>
          </div>
        </div>
      </Link>
      <div className="p-4 flex flex-col justify-between min-h-[144px] lg:min-h-[192px] ">
        <div className="">
          <div className="">
            <Link href={`/post/${slug}`}>
              <h3
                className={`text-base leading-snug lg:leading-[28px] lg:text-xl font-semibold title-color `}
              >
                {title}
              </h3>
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 lg:text-sm lg:mt-1 lg:gap-5 dark:text-gray-400">
            <p className="">
              By{" "}
              <Link
                href={`/user/${user.username}`}
                className="hover:text-blue-800 dark:hover:text-blue-500"
              >
                {user.username}
              </Link>{" "}
            </p>
            <p className="">{getTimeDistance(createdAt)}</p>
          </div>
          <div className="mt-1 lg:mt-2 text-xs lg:text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
            {description}
          </div>
        </div>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center">
            <PostLike postId={id} />

            {_count.comments > 0 && (
              <Link
                href={`/post/${id}`}
                className="mr-4 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500"
              >
                <span className="flex items-center gap-1  text-xs lg:text-sm">
                  <ChatBubbleLeftIcon className="w-4 h-4 lg:w-6 lg:h-6 fill-gray-500 dark:fill-gray-300" />
                  {_count.comments}
                </span>
                {/* {getPluralize(_count.comments, "Comment", "s")} */}
              </Link>
            )}
            {_count.views > 0 && (
              <div className="">
                <div className="flex items-center gap-1  text-xs lg:text-sm">
                  <EyeIcon className="w-4 h-4 lg:w-6 lg:h-6 text-gray-400 dark:text-gray-600" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {_count.views}
                    {/* {getPluralize(_count.views, "View", "s")} */}
                  </p>
                </div>
              </div>
            )}
          </div>

          {session?.user.id === user.id && (
            <OptionButton
              title={title}
              postId={id}
              slug={slug}
              imageId={imageId}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Card;
