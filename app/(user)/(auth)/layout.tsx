import Link from "next/link";

function UserAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h2 className="absolute inset-x-0 flex justify-center text-3xl font-bold top-5 lg:top-20">
        <Link href="/">logo</Link>
      </h2>
      <div className="flex items-center justify-center min-h-screen">
        {children}
      </div>
      {/* <div className="absolute inset-x-0 bottom-0">
        <p className="flex justify-center">footer</p>
      </div> */}
    </div>
  );
}

export default UserAuthLayout;

// import Link from "next/link";
// import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// async function UserAuthLayout({ children }: { children: React.ReactNode }) {
//   const session = await getServerSession(authOptions);

//   if (session) {
//     redirect("/");
//   }

//   return (
//     <div>
//       <h2 className="absolute inset-x-0 flex justify-center text-3xl font-bold top-5 lg:top-20">
//         <Link href="/">logo</Link>
//       </h2>
//       <div className="flex items-center justify-center min-h-screen">
//         {children}
//       </div>
//       {/* <div className="absolute inset-x-0 bottom-0">
//         <p className="flex justify-center">footer</p>
//       </div> */}
//     </div>
//   );
// }

// export default UserAuthLayout;
