import {
  NewspaperIcon,
  UsersIcon,
  Squares2X2Icon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { getCounts } from "@/db/queries/admin/getCounts";

async function DashBoardCards() {
  const { usersCount, postsCount, viewsCount, categoriesCount } =
    await getCounts();

  const cardList = [
    {
      title: "Total Users",
      count: usersCount,
      icon: <UsersIcon />,
    },
    {
      title: "Total Posts",
      count: postsCount,
      icon: <NewspaperIcon />,
    },
    {
      title: "Total Views",
      count: viewsCount,
      icon: <EyeIcon />,
    },
    {
      title: "Total Categories",
      count: categoriesCount,
      icon: <Squares2X2Icon />,
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-6">
      {cardList.map((card) => (
        <div
          key={card.title}
          className="h-[120px] w-full bg-custom-gray6 rounded-lg shadow-md px-8 py-6 hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
        >
          <div className="flex justify-between items-center h-full">
            <div className=" h-[52px] w-[52px] p-2.5 bg-cyan-900/70 rounded-full">
              <span>{card.icon}</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-sm text-gray-300">{card.title}</p>
              <h3 className="text-2xl font-bold">{card.count}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashBoardCards;
