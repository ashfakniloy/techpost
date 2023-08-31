import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

function UserBio({ bio }: { bio?: string | null }) {
  return (
    <div className="bg-gray-50 dark:bg-custom-gray6 py-6 px-3 rounded-lg shadow-md w-full">
      <h3 className="text-xl font-montserrat font-semibold px-3">User Bio</h3>
      <ScrollArea className="mt-6 px-3 h-[188px]">
        {bio ? (
          bio
        ) : (
          <span className="flex justify-center w-full text-xl text-red-500">
            No bio provided
          </span>
        )}
      </ScrollArea>
    </div>
  );
}

export default UserBio;
