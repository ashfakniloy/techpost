import AdminLayout from "@/components/Admin/Layout";
import PageTitle from "@/components/Admin/Layout/PageTitle";
import Refresh from "@/components/Admin/Layout/Refresh";
import AdminSidebar from "@/components/Admin/Layout/Sidebar";

export const dynamic = "force-dynamic";

function AdminDashboardlayout({ children }: { children: React.ReactNode }) {
  return (
    // <div className="lg:flex">
    //   <AdminSidebar />

    //   <div className="lg:flex-1 relative">
    //     {/* <Header showMenu={showMenu} setShowMenu={setShowMenu} /> */}

    //     {/* <div className="py-12 px-2 lg:px-16 2xl:px-20">{children}</div> */}

    //     {/* <div className="my-10 mx-2 lg:mx-16 2xl:mx-20"> */}
    //     <div className="my-10 mx-2 lg:mx-7">
    //       {/* temporary fix router.refresh until nextjs fix caching revalidate issue */}
    //       {/* <Refresh /> */}

    //       <PageTitle />

    //       <div className="my-10">{children}</div>
    //     </div>
    //   </div>
    // </div>
    <AdminLayout>{children}</AdminLayout>
  );
}

export default AdminDashboardlayout;
