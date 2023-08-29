import { cookies } from "next/headers";
import SortBy from "./SortBy";
import ViewToggle from "./ViewToggle";

function PostsHeader({ postsTitle }: { postsTitle: string }) {
  const cookieStore = cookies();
  const view = cookieStore.get("view")?.value;

  return (
    <div className="gap-2.5 lg:gap-0 flex flex-col leading-none lg:flex-row justify-between items-center">
      <h2 className="text-[22px] lg:text-2xl text-center lg:text-start font-bold text-gray-700 font-montserrat dark:text-gray-400 capitalize">
        {postsTitle !== "invalid" ? postsTitle : ""}
      </h2>

      <div className="flex items-center gap-3 lg:gap-7">
        <SortBy />

        {postsTitle !== "invalid" && <ViewToggle cookieView={view} />}
      </div>
    </div>
  );
}

export default PostsHeader;
