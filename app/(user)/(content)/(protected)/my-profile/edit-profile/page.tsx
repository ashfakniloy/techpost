import { getProfileByUserId } from "@/db/queries/getProfileByUserId";
import { getServerSession } from "next-auth";
import EditProfileForm from "./EditProfileForm";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
  title: "Edit profile",
};

async function EditProfilePage() {
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (!session) return;

  const { data: profile } = await getProfileByUserId({ userId });
  const profileParsed = JSON.parse(JSON.stringify(profile));

  return <EditProfileForm profile={profileParsed} />;
}

export default EditProfilePage;
