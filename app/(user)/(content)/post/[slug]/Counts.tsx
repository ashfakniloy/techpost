import { cookies } from "next/headers";
import { EyeIcon } from "@heroicons/react/24/solid";
import { getAuthSession } from "@/lib/next-auth";
import PostLike from "@/components/Post/PostLike";
import { getPluralize } from "@/utils/getPluralize";
import { fetchCounts } from "@/db/fetch/fetchCounts";
import { addView } from "@/db/mutations/user/post/addView";

async function Counts({ postId }: { postId: string }) {
  const deviceId = cookies().get("deviceId")?.value;

  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  deviceId && !isAdmin && (await addView({ postId }));

  const data = await fetchCounts({ postId });

  const hasLiked: boolean = data.likesData.some(
    (like: any) => like.userId === session?.user.id
  );

  return (
    <div className="flex items-center gap-10 font-semibold text-gray-700 dark:text-gray-300">
      <PostLike
        session={session}
        postId={postId}
        likesCount={data.likesCount}
        likesData={data.likesData}
        hasLiked={hasLiked}
      />
      {data.viewsCount > 0 && (
        <div className="flex items-center gap-2 text-sm lg:text-base font-bold">
          <EyeIcon className="w-6 h-6 text-gray-600" />
          <p>
            {getPluralize({
              count: data.viewsCount,
              name: "View",
              plural: "Views",
            })}
          </p>
        </div>
      )}
    </div>
  );
}

export default Counts;
