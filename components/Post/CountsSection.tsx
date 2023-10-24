import {
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

function CountsSection({
  likes,
  comments,
  views,
}: {
  likes: number;
  comments: number;
  views: number;
}) {
  return (
    <div className="flex items-center gap-7 text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
      {likes > 0 && (
        <span className="flex items-center gap-1.5">
          <HandThumbUpIcon className="w-[18px] h-[18px]" />
          {likes}
        </span>
      )}

      {comments > 0 && (
        <span className="flex items-center gap-1.5">
          <ChatBubbleLeftIcon className="w-[18px] h-[18px]" />
          {comments}
        </span>
      )}

      {views > 0 && (
        <span className="flex items-center gap-1.5">
          <EyeIcon className="w-[18px] h-[18px] " />
          {views}
        </span>
      )}
    </div>
  );
}

export default CountsSection;
