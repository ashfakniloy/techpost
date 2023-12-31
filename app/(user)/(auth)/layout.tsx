import TechpostLogo from "@/components/Layout/TechpostLogo";

function UserAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="mt-10 flex justify-center">
        <TechpostLogo />
      </div>
      <div className="my-10 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default UserAuthLayout;

// import Link from "next/link";
// import { getAuthSession } from "@/lib/next-auth";
// import { redirect } from "next/navigation";

// async function UserAuthLayout({ children }: { children: React.ReactNode }) {
//   const session = await getAuthSession();

//   if (session) {
//     redirect("/");
//   }

//   return (
//     <div>
//       <h2 className="absolute inset-x-0 flex justify-center text-3xl font-bold top-5 lg:top-20">
//         <Link href="/">techpost</Link>
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
