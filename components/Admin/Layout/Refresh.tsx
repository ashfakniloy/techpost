"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

function Refresh() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.refresh();
  }, [pathname]);

  return <></>;
}

export default Refresh;
