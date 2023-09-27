import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/next-auth";
import { getUserById } from "@/db/queries/getUserById";

// export const dynamic = "force-dynamic";

async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();

  if (session) {
    const user = await getUserById({
      userId: session.user.id,
    });

    // console.log("user", user);

    if (!user) {
      redirect("/invalid-user");
    }
  }

  return <>{children}</>;
}

export default ProtectedLayout;
