import React from "react";

function UserRootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <>
      hello
      {authModal}
      {children}
    </>
  );
}

export default UserRootLayout;
