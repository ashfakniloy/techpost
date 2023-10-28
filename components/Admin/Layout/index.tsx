"use client";

import AdminSidebar from "./Sidebar";
import PageTitle from "./PageTitle";
import useToggle from "@/hooks/useToggle";
import AdminHeader from "./Header/Index";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

function AdminLayout({
  role,
  children,
}: {
  role: string | undefined;
  children: React.ReactNode;
}) {
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
        role={role}
      />

      <div className="lg:flex-1 relative overflow-x-auto">
        <AdminHeader
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
        />

        <div className="py-5 lg:py-10 mx-2 lg:mx-7">
          <PageTitle />

          <div className="my-10">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
