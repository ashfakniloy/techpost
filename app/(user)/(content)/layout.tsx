import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import DeviceIdSet from "@/components/Post/DeviceIdSet";
import { getCategories } from "@/prisma/find/getCategories";
import { getServerSession } from "next-auth";

// export const metadata = {
//   openGraph: {
//     images: {
//       url: "/images/techpost-logo.png",
//       width: 1200,
//       height: 630,
//       alt: "Techpost",
//     },
//   },
// };

async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const { data: categories } = await getCategories();

  return (
    <div className="container">
      <Navbar session={session} categories={categories} />

      <main className="my-5">{children}</main>

      <Footer />

      <DeviceIdSet />
    </div>
  );
}

export default UserLayout;
