import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOptions";
// import { authOptions } from "@/lib/next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { prisma } from "@/lib/prisma";

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },

//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       authorize: async (credentials) => {
//         const { email, password } = credentials as {
//           email: string;
//           password: string;
//         };

//         const response = await prisma.user.findUnique({
//           where: {
//             email: email,
//           },

//           include: {
//             profile: {
//               select: {
//                 imageUrl: true,
//               },
//             },
//           },
//         });

//         if (!response) {
//           console.log("error from nextauth", response);
//           throw new Error("Incorrect Email");
//         }

//         if (response.password !== password) {
//           throw new Error("Incorrect Password");
//         }

//         // console.log("auth response", response);

//         const user = {
//           id: response.id,
//           username: response.username,
//           email: response.email,
//           imageUrl: response.profile?.imageUrl,
//         };

//         console.log("response from [nextauth]", prisma);

//         return user;
//       },
//     }),
//   ],

//   pages: {
//     signIn: "/signin",
//   },

//   callbacks: {
//     jwt: ({ token, user }) => {
//       // console.log("token", token);
//       if (user) {
//         token.user = user;
//       }

//       return token;
//     },

//     session: ({ session, token }) => {
//       if (token) {
//         session.user = token.user as any;
//       }

//       // console.log("session IS", session);

//       return session;
//     },
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

// export default NextAuth(authOptions);
