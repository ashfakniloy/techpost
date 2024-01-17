import SortBy from "./SortBy";

function PostsHeader({ postsTitle }: { postsTitle: string }) {
  return (
    <div className="gap-2.5 lg:gap-0 flex flex-col leading-none lg:flex-row justify-between items-center">
      <h2 className="text-[22px] lg:text-2xl text-center lg:text-start max-w-[475px] font-montserrat font-bold text-gray-700 dark:text-gray-400 capitalize">
        {postsTitle !== "invalid" ? postsTitle : ""}
      </h2>

      <div className="flex items-center gap-3 lg:gap-7">
        <SortBy />
      </div>
    </div>
  );
}

export default PostsHeader;
