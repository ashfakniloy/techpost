import EditProfileForm from "./EditProfileForm";
import { getAuthSession } from "@/lib/next-auth";
import { getProfileByUserId } from "@/db/queries/getProfileByUserId";

export const metadata = {
  title: "Edit profile",
};

async function EditProfilePage() {
  const session = await getAuthSession();

  const userId = session?.user.id;

  if (!session) return;

  const { data: profile } = await getProfileByUserId({ userId });
  const profileParsed = JSON.parse(JSON.stringify(profile));

  return <EditProfileForm profile={profileParsed} />;
}

export default EditProfilePage;
