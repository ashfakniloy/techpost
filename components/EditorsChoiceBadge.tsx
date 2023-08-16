import { CheckBadgeIcon } from "@heroicons/react/24/solid";

function EditorsChoiceBadge() {
  return (
    <div className=" text-white bg-blue-600 px-1.5 py-1 lg:px-2 lg:py-1.5 rounded-full flex items-center gap-1 select-none">
      <CheckBadgeIcon className="fill-yellow-300 h-5 w-5" />
      <span className="uppercase font-bold text-[10px] lg:text-xs">
        {`EDITOR'S CHOICE`}
      </span>
    </div>
  );
}

export default EditorsChoiceBadge;
