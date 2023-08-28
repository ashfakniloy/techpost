"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function SigninToComment() {
  const pathname = usePathname();

  return (
    <Link
      href={`/signin?callback_url=${pathname}`}
      className="text-blue-600 dark:text-blue-400 link"
    >
      Sign in to comment
    </Link>
  );
}

export default SigninToComment;
