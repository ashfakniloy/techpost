// import {
//   NewspaperIcon,
//   UsersIcon,
//   Squares2X2Icon,
//   EyeIcon,
//   ChatBubbleLeftIcon,
// } from "@heroicons/react/24/outline";

import { getCounts } from "@/prisma/find/getCounts";
import {
  HandThumbUpIcon,
  EyeIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

type PostInfoProps = {
  username: string;
  userImageUrl?: string | null;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
};

async function PostInfo({
  username,
  userImageUrl,
  likesCount,
  commentsCount,
  viewsCount,
}: PostInfoProps) {
  const imageSrc = userImageUrl ? userImageUrl : "/images/blankUser.jpg";

  const cardList = [
    {
      title: "Posted By",
      value: username,
      icon: (
        <Image
          src={imageSrc}
          alt={username}
          width={52}
          height={52}
          className="rounded-full"
        />
      ),
    },
    {
      title: "Total Likes",
      value: likesCount,
      icon: <HandThumbUpIcon className="" />,
    },
    {
      title: "Total Comments",
      value: commentsCount,
      icon: <ChatBubbleLeftIcon className="" />,
    },
    {
      title: "Total Views",
      value: viewsCount,
      icon: <EyeIcon className="" />,
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {cardList.map((card, i) => (
        <div
          key={i}
          className="h-[120px] w-full bg-gray-50 dark:bg-custom-gray6 rounded-lg shadow-md px-8 py-6 hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
        >
          <div className="flex justify-between items-center h-full">
            <div className="h-[52px] w-[52px] p-2.5 bg-gray-200 dark:bg-cyan-900/70 rounded-full">
              <span className="">{card.icon}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {card.title}
              </p>
              <h3 className="text-2xl font-bold">{card.value}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostInfo;
