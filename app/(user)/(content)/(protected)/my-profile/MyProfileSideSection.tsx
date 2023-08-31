import Image from "next/image";
import Link from "next/link";
import { IconFacebook } from "@/components/Icons/IconFacebook";
import { IconLinkedin } from "@/components/Icons/IconLinkedin";
import { IconTwitter } from "@/components/Icons/IconTwitter";
import { getTimeDistance } from "@/utils/getTimeDistance";
import { getAuthSession } from "@/lib/next-auth";
import { getProfileByUserId } from "@/db/queries/getProfileByUserId";
import { BASE_URL } from "@/config";
import { getImagePlaceholder } from "@/utils/getImagePlaceholder";
import { notFound } from "next/navigation";

async function MyProfileSideSection() {
  const session = await getAuthSession();
  const userId = session?.user.id;

  const { data: profile } = await getProfileByUserId({ userId });

  if (!profile) {
    notFound();
  }

  const BlankUserImage = `${BASE_URL}/images/blankUser.jpg`;

  const blurDataUrl = await getImagePlaceholder(
    profile?.imageUrl || BlankUserImage
  );

  return (
    <section className="lg:w-[360px] lg:sticky lg:top-[92px]">
      <div className="flex flex-col p-3 lg:p-5 bg-gray-50 rounded-md shadow-md dark:bg-custom-gray2">
        <div className="w-[150px] h-[150px] lg:w-full lg:h-[300px] relative">
          {profile?.imageUrl ? (
            <Image
              src={profile.imageUrl}
              placeholder="blur"
              blurDataURL={blurDataUrl}
              alt={profile.user.username}
              fill
              sizes="(max-width: 768px) 150px, 320px"
              className="object-cover rounded-md"
            />
          ) : (
            <Image
              src="/images/blankUser.jpg"
              placeholder="blur"
              blurDataURL={blurDataUrl}
              alt={profile.user.username}
              fill
              sizes="(max-width: 768px) 150px, 320px"
              className="object-cover rounded-md"
            />
          )}
        </div>
        <div className="overflow-hidden">
          <h4 className="mt-2 lg:mt-3 text-2xl font-montserrat font-bold capitalize">
            {profile?.user.username}
          </h4>
          <p className="text-xs lg:text-sm mt-1 text-gray-600 dark:text-gray-400">
            Joined {getTimeDistance(profile!.createdAt)}
          </p>

          <div className="mt-3 flex items-center gap-5">
            {profile?.facebook && (
              <Link href={profile.facebook} target="_blank">
                <IconFacebook className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 lg:hover:fill-blue-500 dark:lg:hover:fill-blue-300 transition-colors duration-200" />
              </Link>
            )}

            {profile?.twitter && (
              <Link href={profile.twitter} target="_blank">
                <IconTwitter className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 lg:hover:fill-blue-500 dark:lg:hover:fill-blue-300 transition-colors duration-200" />
              </Link>
            )}

            {profile?.linkedin && (
              <Link href={profile.linkedin} target="_blank">
                <IconLinkedin className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 lg:hover:fill-blue-500 dark:lg:hover:fill-blue-300 transition-colors duration-200" />
              </Link>
            )}
          </div>

          <p className=" mt-3 lg:mt-5 text-sm lg:text-base ">{profile?.bio}</p>
        </div>
      </div>
    </section>
  );
}

export default MyProfileSideSection;
