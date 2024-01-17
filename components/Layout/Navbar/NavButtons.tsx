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
import { Button } from "@/components/ui/button";

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
    }).then(() => {
      localStorage.removeItem("draftPost");
    });
  };

  const signinPath =
    pathname === "/" ? "/signin" : `/signin?callback_url=${pathname}`;

  return (
    <>
      {session && session.user.role === "USER" ? (
        <Popover>
          <PopoverTrigger asChild>
            <button className="relative overflow-hidden h-[40px] w-[40px] transition-transform duration-100 rounded-full active:scale-95">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="user image"
                  sizes="40px"
                  fill
                  className="object-cover"
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

          <PopoverContent className="mt-5 p-1 w-[180px] bg-white dark:bg-stone-950 text-sm rounded-md whitespace-nowrap">
            <div className="space-y-1 p-4 border-b border-gray-300 dark:border-gray-700">
              <p>Signed in as </p>
              <p className="font-semibold capitalize">{username}</p>
            </div>
            <button
              type="button"
              aria-label="sign out"
              onClick={handleSignOut}
              className="w-full mt-1 px-4 py-2.5 text-left font-montserrat font-bold hover:bg-gray-300 dark:hover:bg-gray-800 rounded"
            >
              Sign Out
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        <div className="flex items-center gap-7">
          <Link href="/signup">
            <Button
              type="button"
              size="sm"
              aria-label="sign up"
              variant="outline"
              className="min-w-[90px] h-[32px] border-gray-600 dark:border-gray-300"
            >
              Sign Up
            </Button>
          </Link>

          <Link href={signinPath}>
            <Button
              type="button"
              aria-label="sign in"
              size="sm"
              className="min-w-[90px] h-[32px]"
            >
              Sign In
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default NavButtons;
