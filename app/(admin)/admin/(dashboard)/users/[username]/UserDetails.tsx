import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Section from "@/components/Admin/Section";
import { ClientFormattedDate } from "@/components/ClientFormattedDate";
import { getSingleUserAdmin } from "@/prisma/find/admin/getSingleUserAdmin";
import { getProfileByUserId } from "@/prisma/find/getProfileByUserId";
import { Profile } from "@/types";
import { getTimeDistance } from "@/utils/getTimeDistance";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import Image from "next/image";

async function UserDetails({ username }: { username: string }) {
  const { data: user } = await getSingleUserAdmin({
    username: username,
  });

  if (!user) {
    return <p className="text-xl text-red-500">User not found</p>;
  }

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
      name: "Password",
      value: user.password,
    },
    {
      name: "Facebook",
      value: user.profile?.facebook?.toLocaleLowerCase() || "not provided",
    },
    {
      name: "Twitter",
      value: user.profile?.twitter?.toLocaleLowerCase() || "not provided",
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
    <Section title="User Details" className="w-[800px]">
      <div className="flex gap-7">
        <div className="w-[150px] h-[150px] lg:w-[300px] lg:h-[300px] relative">
          {user.profile?.imageUrl ? (
            <Image
              src={user.profile.imageUrl}
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
        <div className="flex-1 space-y-7 w-full">
          {infoData.map((info, i) => (
            <div key={i} className="w-full flex">
              <p className="w-1/3">{info.name}</p>
              <p className="">{info.value}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default UserDetails;
