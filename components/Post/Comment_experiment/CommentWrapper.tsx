"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function CommentWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const postId = params?.postId;

  const [show, setShow] = useState(false);

  // console.log("show", show);

  return (
    <div>
      {children}

      <div className="mt-3 flex justify-center">
        {/* <button
          className="px-5 py-1.5 rounded text-sm font-bold bg-blue-600 text-gray-50"
          onClick={() => router.push(`/${pathname}?show=${show}`)}
        >
          View more comments
        </button> */}
        {/* <button
          className="px-5 py-1.5 rounded text-sm font-bold bg-blue-600 text-gray-50"
          onClick={() => setShow(!show)}
        >
          View more comments
        </button> */}
      </div>
    </div>
  );
}

export default CommentWrapper;
