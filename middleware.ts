export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/add-post/:path*", "/edit-post", "/my-profile/:path*"],
};
