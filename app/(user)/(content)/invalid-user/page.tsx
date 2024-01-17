"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

function InvalidUserPage() {
  useEffect(() => {
    signOut({
      // redirect: false,
      callbackUrl: `${window.location.origin}/signin`,
    }).then(() => {
      localStorage.removeItem("draftPost");
    });
  }, []);

  return <></>;
}

export default InvalidUserPage;
