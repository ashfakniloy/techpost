import AdminLayout from "@/components/Admin/Layout";
import { getAuthSession } from "@/lib/next-auth";
// import Refresh from "@/components/Admin/Layout/Refresh";

export const dynamic = "force-dynamic";

async function AdminDashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();
  const role = session?.user.role;

  return (
    <AdminLayout role={role}>
      {/* temporary fix router.refresh until nextjs fix caching revalidate issue */}
      {/* <Refresh /> */}

      {children}
    </AdminLayout>
  );
}

export default AdminDashboardlayout;
