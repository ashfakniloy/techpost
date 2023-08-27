"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

function Refresh() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.refresh();
  }, [pathname]);

  return <></>;
}

export default Refresh;
