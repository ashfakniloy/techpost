import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import DeviceIdSet from "@/components/Post/DeviceIdSet";
import { getCategories } from "@/prisma/find/getCategories";
import { getProfileByUserId } from "@/prisma/find/getProfileByUserId";
import { getServerSession } from "next-auth";

async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  // console.log("session", session);
  const { data: profile } = await getProfileByUserId({ userId });

  const { data: categories } = await getCategories();

  // const profile: ProfileProps = data?.profile;

  // console.log("profile", profile);

  // console.log("userid", userId);

  return (
    <div className="container">
      <Navbar
        session={session}
        imageUrl={profile?.imageUrl}
        username={profile?.user.username}
        categories={categories}
      />
      <div className="my-5">{children}</div>
      <Footer />

      <DeviceIdSet isAdmin={session?.user.role === "ADMIN"} />
    </div>
  );
}

export default UserLayout;
