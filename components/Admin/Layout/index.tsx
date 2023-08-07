"use client";

import AdminSidebar from "./Sidebar";
import PageTitle from "./PageTitle";
import useToggle from "@/hooks/useToggle";
import AdminHeader from "./Header/Index";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Refresh from "./Refresh";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const { toggle: showSidebar, setToggle: setShowSidebar, node } = useToggle();
  const pathname = usePathname();

  useEffect(() => {
    setShowSidebar(false);
  }, [pathname]);

  return (
    <div className="lg:flex">
      <AdminSidebar
        node={node}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />

      <div className="lg:flex-1 relative">
        <AdminHeader
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        {/* <div className="py-12 px-2 lg:px-16 2xl:px-20">{children}</div> */}

        {/* <div className="my-10 mx-2 lg:mx-16 2xl:mx-20"> */}
        <div className="py-5 lg:py-10 mx-2 lg:mx-7">
          {/* temporary fix router.refresh until nextjs fix caching revalidate issue */}
          {/* <Refresh /> */}

          <PageTitle />

          <div className="my-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
