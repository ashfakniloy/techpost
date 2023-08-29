import Link from "next/link";
import Image from "next/image";
import Section from "@/components/Admin/Section";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";
import { getSingleUserAdmin } from "@/db/queries/admin/getSingleUserAdmin";
import { getImagePlaceholder } from "@/utils/getImagePlaceholder";
import { BASE_URL } from "@/config";

async function UserDetails({ username }: { username: string }) {
  const { data: user } = await getSingleUserAdmin({
    username: username,
  });

  if (!user) {
    return <p className="text-xl text-red-500">User not found</p>;
  }

  const BlankUserImage = `${BASE_URL}/images/blankUser.jpg`;

  const blurDataUrl = await getImagePlaceholder(
    user.profile?.imageUrl || BlankUserImage
  );

  // console.log("iuser", totalViews);

  const infoData = [
    {
      name: "Username",
      value: <span className="capitalize">{user.username}</span>,
    },
    {
      name: "Email",
      value: user.email.toLocaleLowerCase(),
    },
    {
      name: "Facebook",
      value: user.profile?.facebook?.toLocaleLowerCase(),
      asLink: true,
    },
    {
      name: "Twitter",
      value: user.profile?.twitter?.toLocaleLowerCase(),
      asLink: true,
    },
    {
      name: "Linkedin",
      value: user.profile?.linkedin?.toLocaleLowerCase(),
      asLink: true,
    },
    {
      name: "Created At",
      value: <ClientFormattedDate date={user.createdAt} />,
    },
    {
      name: "Updated At",
      value: <ClientFormattedDate date={user.updatedAt} />,
    },
  ];

  return (
    <Section title="User Details" className="lg:w-[800px]">
      <div className="flex flex-col lg:flex-row gap-7">
        <div className="w-[200px] h-[200px] lg:w-[250px] lg:h-[250px]  relative">
          {user.profile?.imageUrl ? (
            <Image
              src={user.profile.imageUrl}
              placeholder="blur"
              blurDataURL={blurDataUrl}
              alt={username}
              fill
              className="object-cover rounded-md"
            />
          ) : (
            <Image
              src="/images/blankUser.jpg"
              placeholder="blur"
              blurDataURL={blurDataUrl}
              alt={username}
              fill
              className="object-cover rounded-md"
            />
          )}
        </div>
        <div className="flex-1 space-y-7 w-full">
          {infoData.map((info, i) => (
            <div
              key={i}
              className="w-full flex items-center flex-wrap lg:flex-auto"
            >
              <p className="w-1/3">{info.name}</p>
              {/* <p className="max-w-[315px]">{info.value ? "" : "not provided"}</p> */}
              <p className="lg:max-w-[315px]">
                {!info.asLink ? (
                  info.value
                ) : info.value ? (
                  <Link
                    href={info.value}
                    target="_blank"
                    className="hover:underline link text-sm"
                  >
                    {info.value}
                  </Link>
                ) : (
                  "not provided"
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default UserDetails;
