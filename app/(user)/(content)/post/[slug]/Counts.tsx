import PostLike from "@/components/Post/PostLike";
import { BASE_URL } from "@/config";
import { fetchCounts } from "@/db/fetch/fetchCounts";
import { getAuthSession } from "@/lib/next-auth";
import { getPluralize } from "@/utils/getPluralize";
import { EyeIcon } from "@heroicons/react/24/solid";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

async function countView({
  postId,
  deviceId,
}: {
  postId: string;
  deviceId: string;
}) {
  // const url = `http://localhost:3000/api/post/view?postId=${postId}&deviceId=${deviceId}`;
  const url = `${BASE_URL}/api/post/view?postId=${postId}&deviceId=${deviceId}`;

  const response = await fetch(url, {
    method: "POST",
  });

  const data = await response.json();

  if (response.ok) {
    if (data.viewAdded) {
      revalidateTag("counts");
    }
  } else {
    console.log("view error", data);
  }
}

async function Counts({ postId }: { postId: string }) {
  const deviceId = cookies().get("deviceId")?.value;

  const session = await getAuthSession();

  const isAdmin = session?.user.role === "ADMIN";

  deviceId &&
    !isAdmin &&
    (await countView({ postId: postId, deviceId: deviceId.toString() }));

  const data = await fetchCounts({ postId });

  return (
    <div className="flex items-center gap-10 font-semibold text-gray-700 dark:text-gray-300">
      <PostLike
        postId={postId}
        likesCount={data.likesCount}
        likesData={data.likesData}
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
