import { getProfileByUsername } from "@/prisma/find/getProfileByUsername";
import { getTimeDistance } from "@/utils/getTimeDistance";
import Image from "next/image";

async function ProfileTopSection({ username }: { username: string }) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const { data: profile } = await getProfileByUsername({ username });

  if (!profile) {
    return <p className="text-xl text-center">Profile not found</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-3 lg:gap-8">
      <div className="w-[150px] h-[150px] lg:w-[250px] lg:h-[250px] relative">
        {profile.imageUrl ? (
          <Image
            src={profile.imageUrl}
            alt="user"
            fill
            className="object-cover rounded-md"
          />
        ) : (
          <Image
            src="/images/blankUser.jpg"
            alt="user image"
            fill
            className="object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex-1 lg:mt-3">
        <h4 className="text-2xl lg:text-3xl font-bold">
          {profile?.user.username}
        </h4>
        <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
          Joined {getTimeDistance(profile.createdAt)}
        </p>
        <p className="mt-2 lg:mt-5">{profile?.bio}</p>

        {/* <p className="mt-10 text-gray-600 dark:text-gray-400">
            No Biodata for random user
          </p> */}
      </div>
    </div>
  );
}

export default ProfileTopSection;
