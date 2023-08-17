import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getProfileByUserId } from "@/prisma/find/getProfileByUserId";
import { getTimeDistance } from "@/utils/getTimeDistance";
import { getServerSession } from "next-auth";
import Image from "next/image";

async function MyProfileSideSection() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  // if(!userId) return

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const { data: profile } = await getProfileByUserId({ userId });

  return (
    <section className="lg:w-[360px] lg:sticky lg:top-[92px]">
      <div className="flex flex-col p-3 lg:p-5 bg-gray-50 rounded-md shadow-md dark:bg-custom-gray2">
        <div className="w-[150px] h-[150px] lg:w-full lg:h-[300px] relative">
          {profile?.imageUrl ? (
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
        <div className="overflow-hidden">
          <h4 className="mt-2 lg:mt-3 text-2xl font-bold">
            {profile?.user.username}
          </h4>
          <p className="text-xs lg:text-sm lg:mt-1 text-gray-600 dark:text-gray-400">
            Joined {getTimeDistance(profile!.createdAt)}
          </p>
          <p className="mt-2 lg:mt-4 text-sm lg:text-base ">{profile?.bio}</p>
        </div>
      </div>
    </section>
  );
}

export default MyProfileSideSection;
