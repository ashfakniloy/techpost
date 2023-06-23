import React from "react";

function Footer() {
  return (
    <div className="py-10 px-5 border-t border-gray-300 dark:border-gray-700 text-start">
      <h1 className="text-3xl font-bold text-red-700/30  dark:text-red-400/30">
        logo
      </h1>
      <p className="mt-2 text-sm">
        <span className="font-bold mr-2">Contact:</span>
        <a href="mailto:ashfakniloy@gmail.com" className="hover:text-blue-500">
          ashfakniloy@gmail.com
        </a>
      </p>
      <p className="mt-2 text-sm">
        ©2023, Ashfak Ahmed Niloy. All Rights Reserved.
      </p>
    </div>
  );
}

export default Footer;
