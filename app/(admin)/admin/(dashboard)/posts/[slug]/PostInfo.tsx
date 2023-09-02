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
          fill
          sizes="52px"
          className="object-cover"
        />
      ),
    },
    {
      title: "Total Likes",
      value: likesCount,
      icon: <HandThumbUpIcon />,
    },
    {
      title: "Total Comments",
      value: commentsCount,
      icon: <ChatBubbleLeftIcon />,
    },
    {
      title: "Total Views",
      value: viewsCount,
      icon: <EyeIcon />,
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {cardList.map((card, i) => (
        <div
          key={i}
          className="h-[120px] w-full bg-gray-50 dark:bg-custom-gray6 rounded-lg shadow-md px-8 py-6 hover:shadow-lg transition-shadow duration-300 group"
        >
          <div className="flex justify-between items-center h-full">
            <div className="relative overflow-hidden h-[52px] w-[52px] p-2.5 bg-gray-200 dark:bg-cyan-900/70 rounded-full">
              {card.icon}
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {card.title}
              </p>

              <h3 className="text-2xl font-bold max-w-[240px] text-center capitalize">
                {card.value}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostInfo;
