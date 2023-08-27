import AdminLayout from "@/components/Admin/Layout";
import Refresh from "@/components/Admin/Layout/Refresh";

export const dynamic = "force-dynamic";

function AdminDashboardlayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminLayout>
      {/* temporary fix router.refresh until nextjs fix caching revalidate issue */}
      <Refresh />

      {children}
    </AdminLayout>
  );
}

export default AdminDashboardlayout;
