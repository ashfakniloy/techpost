import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import DeviceIdSet from "@/components/Post/DeviceIdSet";
import { getAuthSession } from "@/lib/next-auth";
import { fetchCategories } from "@/db/fetch/fetchCategories";
// import { getCategories } from "@/db/queries/getCategories";

async function UserLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();

  const categories = await fetchCategories();

  // const { data: categories } = await getCategories();

  // console.log("categories", categories);

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
