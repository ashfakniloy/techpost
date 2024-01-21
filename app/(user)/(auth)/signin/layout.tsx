import { Suspense } from "react";

export const metadata = {
  title: "Sign in",
};

function UserSigninLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export default UserSigninLayout;
