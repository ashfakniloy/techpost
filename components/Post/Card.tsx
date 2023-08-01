import Image from "next/image";
import Link from "next/link";
import parser from "html-react-parser";
import type { Session } from "next-auth";
import OptionButton from "./OptionButton";
import PostLike from "./PostLike";
import { Post } from "@prisma/client";
import { getTimeDistance } from "@/utils/getTimeDistance";
import { getPluralize } from "@/utils/getPluralize";
import { EyeIcon } from "@heroicons/react/24/solid";
import { ChatBubbleLeftIcon } from "@heroicons/react/20/solid";

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
  // const parsedArticle = parser(
  //   article.replace(/<(img|iframe)\b[^>]*>/g, "") || ""
  // );
  const parsedArticle =
    parser(
      article
        .replace(/<(img|iframe)\b[^>]*>/g, "")
        .replace(/<a\b[^>]*>(.*?)<\/a>/g, "<p>$1</p>")
    ) || "";

  return (
    <div className="transition-shadow max-h-[290px] lg:max-h-[412px] duration-300 bg-gray-50 rounded-md shadow-md group dark:bg-custom-gray2 hover:shadow-lg">
      <div className="">
        <Link href={`/post/${id}`}>
          <div className="h-[120px] lg:h-[220px] relative rounded-t-md overflow-hidden">
            <Image
              src={imageUrl}
              alt="programming"
              fill
              // sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 60vw"
              sizes="60vw"
              className="object-cover transition duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute bottom-0 right-0">
              <span className="bg-black/70 text-[10px] lg:text-xs px-1.5 lg:px-3 py-1 lg:py-1.5 text-white text-xs capitalize">
                {categoryName}
              </span>
            </div>
          </div>
        </Link>
        <div className="p-2 lg:p-4 flex flex-col justify-between min-h-[144px] lg:min-h-[192px]">
          <div className="overflow-hidden break-words">
            <div className="inline-block ">
              <Link href={`/post/${id}`}>
                <h4 className="text-base leading-snug lg:leading-[28px] lg:text-xl font-semibold !line-clamp-2 title-color">
                  {title}
                </h4>
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
              {parsedArticle}
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
              <OptionButton title={title} postId={id} imageId={imageId} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
