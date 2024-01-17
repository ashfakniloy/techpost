import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { Session } from "next-auth";

export default async function middleware(req: NextRequest) {
  const { origin, pathname } = req.nextUrl;

  const secret = process.env.NEXTAUTH_SECRET;

  const token = (await getToken({ req, secret })) as Session | null;
  // console.log("token from middleware", token);

  const isAdmin =
    token?.user.role === "ADMIN" || token?.user.role === "GUEST_ADMIN";

  const isUser = token?.user.role === "USER";

  if (pathname.includes("/admin")) {
    //for admin
    if (pathname !== "/admin/signin") {
      if (!isAdmin) {
        const adminRedirectPath =
          pathname === `/admin`
            ? `${origin}/admin/signin`
            : `${origin}/admin/signin?callback_url=${pathname}`;

        return NextResponse.redirect(adminRedirectPath);
      }
    } else {
      if (isAdmin) {
        return NextResponse.redirect(`${origin}/admin`);
      }
    }
  } else {
    // for user
    if (pathname !== "/signin" && pathname !== "/signup") {
      if (!isUser) {
        const userRedirectPath = `${origin}/signin?callback_url=${pathname}`;

        return NextResponse.redirect(userRedirectPath);
      }
    } else {
      if (isUser) {
        return NextResponse.redirect(`${origin}`);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/add-post/:path*",
    "/edit-post/:path*",
    "/my-profile/:path*",
    "/signin",
    "/signup",
    "/admin/:path*",
  ],
};

// export { default } from "next-auth/middleware";

// export const config = {
//   matcher: ["/add-post/:path*", "/edit-post", "/my-profile/:path*"],
// };

// import { NextRequest, NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export default async function middleware(req: NextRequest) {
//   const { origin, pathname } = req.nextUrl;

//   const secret = process.env.NEXTAUTH_SECRET;

//   const token = await getToken({ req, secret });
//   console.log("token from middleware", token?.user?.role);

//   //for admin
//   if (pathname !== "/admin/signin") {
//     if (pathname.includes("/admin")) {
//       if (token?.user?.role !== "ADMIN") {
//         return NextResponse.redirect(`${origin}/admin/signin`);
//       }
//     }
//   } else {
//     if (token?.user?.role === "ADMIN") {
//       return NextResponse.redirect(`${origin}/admin`);
//     }
//   }

//   // for user
//   if (pathname !== "/signin" && pathname !== "/signup") {
//     if (token?.user?.role !== "USER") {
//       return NextResponse.redirect(`${origin}/signin`);
//     }
//   } else {
//     if (token?.user?.role === "USER") {
//       return NextResponse.redirect(`${origin}`);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/add-post/:path*",
//     "/edit-post",
//     "/my-profile/:path*",
//     "/signin",
//     "/signup",
//     "/admin/:path*",
//   ],
// };
