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

          <PopoverContent className="mt-3 p-1 w-[180px] bg-white dark:bg-stone-950 text-sm rounded-md whitespace-nowrap">
            <div className="space-y-1 p-4 border-b border-gray-300 dark:border-gray-700">
              <p className="">Signed in as </p>
              <p className="font-semibold capitalize">{username}</p>
            </div>
            <button
              type="button"
              aria-label="sign out"
              onClick={handleSignOut}
              className="w-full mt-1 px-4 py-2.5 text-left font-bold hover:bg-gray-300 dark:hover:bg-gray-800 rounded"
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

          <Link href="/signin">
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
