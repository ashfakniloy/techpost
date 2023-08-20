import AdminLayout from "@/components/Admin/Layout";

export const dynamic = "force-dynamic";

function AdminDashboardlayout({ children }: { children: React.ReactNode }) {
  return <AdminLayout>{children}</AdminLayout>;
}

export default AdminDashboardlayout;
