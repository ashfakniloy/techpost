import { IconFacebook } from "@/components/Icons/IconFacebook";
import { IconLinkedin } from "@/components/Icons/IconLinkedin";
import { IconTwitter } from "@/components/Icons/IconTwitter";
// import { BASE_URL } from "@/config";
// import { getProfileByUsername } from "@/db/queries/getProfileByUsername";
// import { getImagePlaceholder } from "@/utils/getImagePlaceholder";
import { getTimeDistance } from "@/utils/getTimeDistance";
// import { Profile } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
// import { notFound } from "next/navigation";

type UserTopSectionProps = {
  username: string;
  imageUrl: string | null;
  bio?: string | null;
  createdAt: Date;
  facebook: string | null;
  twitter: string | null;
  linkedin: string | null;
};

function UserTopSection({
  username,
  imageUrl,
  bio,
  createdAt,
  facebook,
  twitter,
  linkedin,
}: UserTopSectionProps) {
  // const BlankUserImage = `${BASE_URL}/images/blankUser.jpg`;

  // const blurDataUrl = await getImagePlaceholder(
  //   profile?.imageUrl || BlankUserImage
  // );

  return (
    <section className="flex flex-col lg:flex-row gap-3 lg:gap-8">
      <div className="w-[150px] h-[150px] lg:w-[250px] lg:h-[250px] relative">
        {imageUrl ? (
          <Image
            src={imageUrl}
            // placeholder="blur"
            // blurDataURL={blurDataUrl}
            alt={username}
            fill
            sizes="(max-width: 768px) 150px, 250px"
            className="object-cover rounded-md"
          />
        ) : (
          <Image
            src="/images/blankUser.jpg"
            // placeholder="blur"
            // blurDataURL={blurDataUrl}
            alt={username}
            fill
            sizes="(max-width: 768px) 150px, 250px"
            className="object-cover rounded-md"
          />
        )}
      </div>
      <div className="flex-1 lg:mt-3">
        <h4 className="text-2xl lg:text-3xl font-montserrat font-bold capitalize">
          {username}
        </h4>
        <div className="mt-2 flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-10">
          <p className=" text-xs lg:text-sm text-gray-600 dark:text-gray-400">
            Joined {getTimeDistance(createdAt)}
          </p>
          <div className="flex items-center gap-5">
            {facebook && (
              <Link href={facebook} target="_blank">
                <IconFacebook className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 lg:hover:fill-blue-500 dark:lg:hover:fill-blue-300 transition-colors duration-200" />
              </Link>
            )}

            {twitter && (
              <Link href={twitter} target="_blank">
                <IconTwitter className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 lg:hover:fill-blue-500 dark:lg:hover:fill-blue-300 transition-colors duration-200" />
              </Link>
            )}

            {linkedin && (
              <Link href={linkedin} target="_blank">
                <IconLinkedin className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100 lg:hover:fill-blue-500 dark:lg:hover:fill-blue-300 transition-colors duration-200" />
              </Link>
            )}
          </div>
        </div>

        <p className="mt-5">{bio}</p>
      </div>
    </section>
  );
}

export default UserTopSection;
