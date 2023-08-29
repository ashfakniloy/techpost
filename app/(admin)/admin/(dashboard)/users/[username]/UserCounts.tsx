import { NewspaperIcon, EyeIcon } from "@heroicons/react/24/outline";

type UserCountsProps = {
  postsCount: number;
  viewsCount: number;
};

function UserCounts({ postsCount, viewsCount }: UserCountsProps) {
  const cardList = [
    {
      title: "Total Posts",
      value: postsCount,
      icon: <NewspaperIcon className="stroke-sky-400 dark:stroke-blue-300" />,
    },
    {
      title: "Posts Viewed By Users",
      value: viewsCount,
      icon: <EyeIcon className="stroke-sky-400 dark:stroke-blue-300" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
      {cardList.map((card, i) => (
        <div
          key={i}
          className="h-[120px] w-full bg-gray-50 dark:bg-custom-gray6 rounded-lg shadow-md px-8 py-6 hover:shadow-lg transition-shadow duration-300 group"
        >
          <div className="flex justify-between items-center h-full">
            <div className="h-[52px] w-[52px] p-2 bg-gray-200 dark:bg-cyan-900/70 rounded-full">
              <span>{card.icon}</span>
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

export default UserCounts;
