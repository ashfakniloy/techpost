function SingleCard({
  title,
  count,
  icon,
}: {
  title: string;
  count: number;
  icon: JSX.Element;
}) {
  return (
    <div className="h-[120px] w-full bg-custom-gray6 rounded-lg shadow-md px-8 py-6 hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
      <div className="flex justify-between items-center h-full">
        <div className=" h-[52px] w-[52px] p-2.5 bg-cyan-900/70 rounded-full">
          <span>{icon}</span>
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <p className="text-sm text-gray-300">{title}</p>
          <h3 className="text-2xl font-bold">{count}</h3>
        </div>
      </div>
    </div>
  );
}

export default SingleCard;
