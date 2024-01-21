import { Suspense } from "react";

function AdminSigninLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={null}>{children}</Suspense>;
}

export default AdminSigninLayout;
