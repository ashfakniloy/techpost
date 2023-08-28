"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

const IconMoon = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
      />
    </svg>
  );
};

const IconSun = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
      />
    </svg>
  );
};

function ThemeButton() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <>
      {currentTheme === "dark" ? (
        <button
          type="button"
          aria-label="toggle light mode"
          className="p-1 rounded-full active:bg-gray-300 dark:active:bg-gray-800 lg:hover:bg-gray-300 lg:dark:hover:bg-gray-800"
          onClick={() => setTheme("light")}
        >
          <IconSun className="w-5 h-5 text-yellow-500" />
        </button>
      ) : (
        <button
          type="button"
          aria-label="toggle dark mode"
          className="p-1 rounded-full active:bg-gray-300 dark:active:bg-gray-800 lg:hover:bg-gray-300 lg:dark:hover:bg-gray-800"
          onClick={() => setTheme("dark")}
        >
          <IconMoon className="w-5 h-5 text-gray-700" />
        </button>
      )}
    </>
  );
}

export default ThemeButton;
