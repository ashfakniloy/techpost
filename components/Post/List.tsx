import Link from "next/link";
import Image from "next/image";
import parser from "html-react-parser";
import type { Session } from "next-auth";
import OptionButton from "./OptionButton";
import PostLike from "./PostLike";
import { getTimeDistance } from "@/utils/getTimeDistance";
import { Post } from "@prisma/client";
import { getPluralize } from "@/utils/getPluralize";
import { EyeIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/solid";

type SessionProps = {
  session: Session | null;
};

type ListProps = Omit<
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

function List({
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
}: ListProps & SessionProps) {
  // const parsedArticle = parser(
  //   article.replace(/<(img|iframe) .*?>/g, "") || ""
  // );

  const parsedArticle =
    parser(
      article
        .replace(/<(img|iframe)\b[^>]*>/g, "")
        .replace(/<a\b[^>]*>(.*?)<\/a>/g, "<p>$1</p>")
    ) || "";

  return (
    <div className="transition-shadow duration-300 p-2 lg:p-4 h-[96px] lg:h-[167px] bg-gray-50 rounded-md shadow-md dark:bg-custom-gray2 hover:shadow-lg">
      <div className="flex gap-2.5 lg:gap-4 lg:min-h-[135px]">
        <Link href={`/post/${id}`}>
          <div className="lg:w-[210px] lg:h-[135px] w-[110px] h-[80px] relative overflow-hidden rounded-md">
            <Image
              src={imageUrl}
              alt="programming"
              fill
              sizes="(max-width: 768px) 30vw, (max-width: 1200px) 20vw, 10vw"
              className="object-cover"
            />
            <span className="absolute bottom-0 left-0 rounded-tr-md  bg-black/70 text-white text-[10px] lg:text-xs px-1 lg:px-3 py-0.5 lg:py-1.5 capitalize">
              {categoryName}
            </span>
          </div>
        </Link>

        <div className="flex flex-col justify-between flex-1 w-[10%]">
          {/* <div className="max-w-[215px] lg:max-w-[540px]  overflow-hidden"> */}
          <div className="overflow-hidden break-words">
            <div className="inline-block ">
              <Link href={`/post/${id}`}>
                <h4 className="lg:text-xl font-semibold !line-clamp-1 title-color">
                  {title}
                </h4>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-xs lg:text-sm lg:mt-1 lg:gap-5 text-gray-500 dark:text-gray-400">
              <p className="">
                By
                <Link href={`/user/${user.username}`} className="ml-1.5 link">
                  {user.username}
                </Link>
              </p>
              <p className="">{getTimeDistance(createdAt)}</p>
            </div>
            <div className="lg:mt-2 !text-gray-700 dark:!text-gray-300 !line-clamp-1 lg:!line-clamp-2 text-xs lg:text-sm">
              {parsedArticle}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center justify-between text-sm">
              <PostLike postId={id} />

              {_count.comments > 0 && (
                <Link
                  href={`/post/${id}`}
                  className="mr-4 text-gray-700 dark:text-gray-300 hover:text-blue-800 dark:hover:text-blue-500"
                >
                  <span className="flex items-center gap-2 text-xs lg:text-sm">
                    <ChatBubbleLeftIcon className="w-5 h-5 fill-gray-500 dark:fill-gray-300" />
                    {_count.comments}
                  </span>

                  {/* {getPluralize(_count.comments, "Comment", "s")} */}
                </Link>
              )}
              {_count.views > 0 && (
                <div className="">
                  <div className="flex items-center gap-1 text-xs lg:text-sm">
                    <EyeIcon className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                    {_count.views}
                    {/* <p className="text-gray-700 dark:text-gray-300">
                      {getPluralize(_count.views, "View", "s")}
                    </p> */}
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

export default List;
