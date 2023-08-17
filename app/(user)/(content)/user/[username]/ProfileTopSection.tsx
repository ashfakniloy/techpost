import { IconFacebook } from "@/components/Icons/IconFacebook";
import { IconLinkedin } from "@/components/Icons/IconLinkedin";
import { IconReddit } from "@/components/Icons/IconReddit";
import { IconTwitter } from "@/components/Icons/IconTwitter";
import { getProfileByUsername } from "@/prisma/find/getProfileByUsername";
import { getTimeDistance } from "@/utils/getTimeDistance";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function ProfileTopSection({ username }: { username: string }) {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const { data: profile } = await getProfileByUsername({ username });

  if (!profile) {
    notFound();
  }

  return (
    <section className="flex flex-col lg:flex-row gap-3 lg:gap-8">
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
        <h4 className="text-2xl lg:text-3xl font-bold capitalize">
          {profile?.user.username}
        </h4>
        <div className="mt-2 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-10">
          <p className=" text-xs lg:text-sm text-gray-600 dark:text-gray-400">
            Joined {getTimeDistance(profile.createdAt)}
          </p>
          <div className="flex items-center gap-5">
            {/* <p className="text-xs lg:text-sm font-medium">Socials:</p> */}
            {profile.facebook && (
              <Link href={profile.facebook} target="_blank">
                <IconFacebook className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 hover:fill-blue-500 dark:hover:fill-blue-300 transition-colors duration-200" />
              </Link>
            )}

            {profile.twitter && (
              <Link href={profile.twitter} target="_blank">
                <IconTwitter className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 hover:fill-blue-500 dark:hover:fill-blue-300 transition-colors duration-200" />
              </Link>
            )}

            {profile.linkedin && (
              <Link href={profile.linkedin} target="_blank">
                <IconLinkedin className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 hover:fill-blue-500 dark:hover:fill-blue-300 transition-colors duration-200" />
              </Link>
            )}

            {profile.reddit && (
              <Link href={profile.reddit} target="_blank">
                <IconReddit className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 hover:fill-blue-500 dark:hover:fill-blue-300 transition-colors duration-200" />
              </Link>
            )}
          </div>
        </div>

        <p className="mt-5">{profile?.bio}</p>

        {/* <p className="mt-10 text-gray-600 dark:text-gray-400">
            No Biodata for random user
          </p> */}
      </div>
    </section>
  );
}

export default ProfileTopSection;
