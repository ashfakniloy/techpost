import { fetchCounts } from "@/db/fetch/fetchCounts";
import {
  HandThumbUpIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
} from "@heroicons/react/24/solid";

async function CountsFetch({ postId }: { postId: string }) {
  const data = await fetchCounts({ postId });

  return (
    <div className="flex items-center gap-7 text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-200">
      {data.likesCount > 0 && (
        <span className="flex items-center gap-1.5">
          <HandThumbUpIcon className="w-[18px] h-[18px]" />
          {data.likesCount}
        </span>
      )}

      {data.commentsCount > 0 && (
        <span className="flex items-center gap-1.5">
          <ChatBubbleLeftIcon className="w-[18px] h-[18px]" />
          {data.commentsCount}
        </span>
      )}

      {data.viewsCount > 0 && (
        <span className="flex items-center gap-1.5">
          <EyeIcon className="w-[18px] h-[18px] " />
          {data.viewsCount}
        </span>
      )}
    </div>
  );
}

export default CountsFetch;
