// "use client";

// import useToggle from "@/hooks/useToggle";
// import { Session } from "next-auth";
// import { signOut } from "next-auth/react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// type NavButtonsProps = {
//   session: Session | null;
//   username: string | undefined;
//   imageUrl: string | null | undefined;
// };

// function NavButtons({ session, username, imageUrl }: NavButtonsProps) {
//   const {
//     node: profileNode,
//     toggle: showProfile,
//     setToggle: setShowProfile,
//   } = useToggle();

//   const pathname = usePathname();

//   const handleSignOut = () => {
//     signOut({
//       // redirect: false,
//       callbackUrl: `${window.location.origin}${pathname}`,
//     });

//     // router.refresh();
//     // router.push("/signin");
//   };

//   return (
//     <>
//       {session && session.user.role === "USER" ? (
//         <div ref={profileNode} className="relative">
//           <button
//             onClick={() => setShowProfile(!showProfile)}
//             className="overflow-hidden transition-transform duration-100 rounded-full active:scale-95"
//           >
//             {imageUrl ? (
//               <Image
//                 src={imageUrl}
//                 alt="user image"
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//             ) : (
//               <Image
//                 src="/images/blankUser.jpg"
//                 alt="user image"
//                 width={40}
//                 height={40}
//                 className="rounded-full"
//               />
//             )}
//           </button>

//           {showProfile && (
//             <div className="absolute inset-x-0 flex justify-end mt-3">
//               <div className=" min-w-[180px] bg-white dark:bg-stone-900 text-sm border border-gray-300 dark:border-gray-700 rounded-md whitespace-nowrap">
//                 <div className="p-4 space-y-1 border-b border-gray-300 dark:border-gray-700">
//                   <p className="">Signed in as </p>
//                   <p className="font-semibold">{username}</p>
//                 </div>
//                 <button
//                   onClick={handleSignOut}
//                   className="w-full px-4 py-3 text-left hover:bg-gray-300 dark:hover:bg-custom-gray3"
//                 >
//                   Sign Out
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="flex items-center gap-7">
//           <Link href="/signup">
//             <button className="px-3 py-1 text-sm text-gray-700 dark:text-gray-200 font-bold bg-transparent border-2 border-gray-300 dark:border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-400 dark:hover:text-gray-900 rounded-md">
//               Sign Up
//             </button>
//           </Link>
//           <Link href="/signin">
//             <button className="px-3 py-1 text-sm font-bold bg-gray-900 border-2 border-gray-900 text-gray-200 dark:text-gray-900 dark:border-gray-200 dark:bg-gray-200 rounded-md">
//               Sign In
//             </button>
//           </Link>
//         </div>
//       )}
//     </>
//   );
// }

// export default NavButtons;

"use client";

import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type NavButtonsProps = {
  session: Session | null;
  username: string | undefined;
  imageUrl: string | null | undefined;
};

function NavButtons({ session, username, imageUrl }: NavButtonsProps) {
  const pathname = usePathname();

  const handleSignOut = () => {
    signOut({
      // redirect: false,
      callbackUrl: `${window.location.origin}${pathname}`,
    });

    // router.refresh();
    // router.push("/signin");
  };

  return (
    <>
      {session && session.user.role === "USER" ? (
        <Popover>
          <PopoverTrigger asChild>
            <button className="overflow-hidden transition-transform duration-100 rounded-full active:scale-95">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="user image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <Image
                  src="/images/blankUser.jpg"
                  alt="user image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
            </button>
          </PopoverTrigger>

          <PopoverContent className="mt-3 p-0 w-[180px] bg-white dark:bg-stone-950 text-sm border border-gray-300 dark:border-gray-700 rounded-md whitespace-nowrap">
            <div className="space-y-1 p-4 border-b border-gray-300 dark:border-gray-700">
              <p className="">Signed in as </p>
              <p className="font-semibold">{username}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-3 text-left hover:bg-gray-300 dark:hover:bg-gray-800"
            >
              Sign Out
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex items-center gap-7">
          <Link href="/signup">
            <button
              type="button"
              aria-label="sign up"
              className="px-3 py-1 text-sm text-gray-700 dark:text-gray-200 font-bold bg-transparent border-2 border-gray-300 dark:border-gray-400 hover:bg-gray-300 dark:hover:bg-gray-400 dark:hover:text-gray-900 rounded-md"
            >
              Sign Up
            </button>
          </Link>
          <Link href="/signin">
            <button
              type="button"
              aria-label="sign in"
              className="px-3 py-1 text-sm font-bold bg-gray-900 border-2 border-gray-900 text-gray-200 dark:text-gray-900 dark:border-gray-200 dark:bg-gray-200 rounded-md"
            >
              Sign In
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default NavButtons;
