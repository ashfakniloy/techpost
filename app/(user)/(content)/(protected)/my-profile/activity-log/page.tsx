// not using
export const metadata = {
  title: "Activity log",
};

function ActivityLogpage() {
  return (
    <div>
      <div className="mb-5 flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2 lg:gap-0">
        <h4 className="text-[22px] lg:text-2xl text-center lg:text-start font-extrabold font-montserrat text-gray-700 dark:text-gray-400 ">
          Recent Activities
        </h4>
        <p className="text-xs text-center lg:w-[400px]">
          {`* Please note that this page is not functional yet and is displaying placeholder data for demonstration purposes.`}
        </p>
      </div>

      <div className="space-y-5">
        <div className="bg-gray-50 dark:bg-custom-gray2 shadow-md p-3 rounded-md">
          <p className="ml-3 mb-2 text-lg">March 19, 2023</p>
          <div>
            <div className="px-3 py-2 border-b last:border-b-0 border-gray-300/50 dark:border-custom-gray3">
              <p>
                <span className="font-bold">Random user </span>liked{" "}
                <span className="font-bold">Random user 2</span>&apos;s post.
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                10:00 AM
              </p>
            </div>
            <div className="px-3 py-2 border-b last:border-b-0 border-gray-300/50 dark:border-custom-gray3">
              <p>
                <span className="font-bold">Random user </span>liked{" "}
                <span className="font-bold">Random user 2</span>&apos;s post.
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                10:00 AM
              </p>
            </div>
            <div className="px-3 py-2  border-b last:border-b-0 border-gray-300/50 dark:border-custom-gray3">
              <p>
                <span className="font-bold">Random user </span>liked{" "}
                <span className="font-bold">Random user 2</span>&apos;s post.
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                10:00 AM
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-custom-gray2 shadow-md p-3 rounded-md">
          <p className="ml-3 mb-2 text-lg">March 19, 2023</p>
          <div>
            <div className="px-3 py-2  border-b last:border-b-0 border-gray-300/50 dark:border-custom-gray3">
              <p>
                <span className="font-bold">Random user </span>liked{" "}
                <span className="font-bold">Random user 2</span>&apos;s post.
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                10:00 AM
              </p>
            </div>
            <div className="px-3 py-2  border-b last:border-b-0 border-gray-300/50 dark:border-custom-gray3">
              <p>
                <span className="font-bold">Random user </span>liked{" "}
                <span className="font-bold">Random user 2</span>&apos;s post.
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                10:00 AM
              </p>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 dark:bg-custom-gray2 shadow-md p-3 rounded-md">
          <p className="ml-3 mb-2 text-lg">March 19, 2023</p>
          <div>
            <div className="px-3 py-2 border-b last:border-b-0 border-gray-300/50 dark:border-custom-gray3">
              <p>
                <span className="font-bold">Random user </span>liked{" "}
                <span className="font-bold">Random user 2</span>&apos;s post.
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                10:00 AM
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityLogpage;
