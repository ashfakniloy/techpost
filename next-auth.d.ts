import NextAuth from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: string;
      username: string;
      email: string;
      imageUrl: string;
      role: "ADMIN" | "USER" | "GUEST_ADMIN";
    };
  }
}
