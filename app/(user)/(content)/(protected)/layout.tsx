import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getUserById } from "@/prisma/find/getUserById";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  const { user } = await getUserById({
    userId: session?.user.id,
  });

  // console.log("user", user);

  if (!user) {
    redirect("/invalid-user");
  }

  return <>{children}</>;
}

export default ProtectedLayout;
