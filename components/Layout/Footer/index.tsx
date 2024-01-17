import Link from "next/link";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 border-t border-gray-300 dark:border-gray-700 text-start">
      <p className="text-xl lg:text-2xl font-montserrat font-extrabold uppercase">
        TECHPOST
      </p>
      <p className="mt-2 text-sm">
        <span className="font-semibold mr-2">Created by:</span>
        <Link
          href="https://niloy.vercel.app"
          target="_blank"
          className="text-blue-600 dark:text-blue-400 underline link"
        >
          Ashfak Ahmed Niloy
        </Link>
      </p>
      <p className="mt-2 text-sm">
        ©{currentYear}, Ashfak Ahmed Niloy. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
