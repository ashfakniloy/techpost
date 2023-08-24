"use client";

import { useState } from "react";

import { useSession } from "next-auth/react";
import UsernameChange from "./UsernameChange";
import EmailChange from "./EmailChange";
import PasswordChange from "./PasswordChange";
import DeleteAccount from "./DeleteAccount";

function AccountSettingpage() {
  const { data: session } = useSession();
  const [menu, setMenu] = useState("");
  const accountMenus = [
    {
      name: "Username",
      info: session?.user.username,
      component: (
        <UsernameChange
          currentUsername={session?.user.username}
          setMenu={setMenu}
        />
      ),
    },
    {
      name: "Email",
      info: session?.user.email,
      component: (
        <EmailChange currentEmail={session?.user.email} setMenu={setMenu} />
      ),
    },
    {
      name: "Change Password",
      component: <PasswordChange setMenu={setMenu} />,
    },
    {
      name: "Delete Account",
      component: <DeleteAccount setMenu={setMenu} />,
    },
  ];

  const toggle = (name: string) => {
    // if (menu === name) {
    //   return setMenu("");
    // }

    setMenu(name);
  };

  return (
    <div className="">
      <h4 className="mb-5 text-[22px] lg:text-2xl text-center lg:text-start font-extrabold text-gray-700 font-montserrat dark:text-gray-400">
        Change Account Setting
      </h4>

      <div className="flex flex-col divide-y divide-gray-300/70 dark:divide-custom-gray2">
        {accountMenus.map((accountMenu) => (
          <div key={accountMenu.name}>
            <div
              className={`px-2 py-3 lg:py-5 lg:px-5 flex gap-4 lg:gap-0 ${
                accountMenu.name === menu
                  ? "bg-gray-50 dark:bg-custom-gray2 shadow-md rounded-md"
                  : "hover:bg-gray-50/50 dark:hover:bg-custom-gray2/50 cursor-pointer rounded-md"
              }`}
              onClick={() =>
                accountMenu.name !== menu && toggle(accountMenu.name)
              }
            >
              <div className="lg:text-lg flex-1 lg:max-w-[200px]">
                {accountMenu.name}
              </div>

              <div className="">
                {accountMenu.info &&
                  (accountMenu.name !== menu ? (
                    <span
                      className={`flex-1 ${
                        accountMenu.name === "Username" && "capitalize"
                      }`}
                    >
                      {accountMenu.info}
                    </span>
                  ) : (
                    <span className="flex-1">
                      Current {accountMenu.name}:
                      <span
                        className={`ml-1 lg:ml-4 ${
                          accountMenu.name === "Username" && "capitalize"
                        }`}
                      >
                        {accountMenu.info}
                      </span>
                    </span>
                  ))}
                {accountMenu.name === menu && (
                  <div className="">{accountMenu.component}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountSettingpage;

// import DeleteAccount from "@/components/Account/DeleteAccount";
// import EmailChange from "@/components/Account/EmailChange";
// import PasswordChange from "@/components/Account/PasswordChange";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getServerSession } from "next-auth";

// async function AccountSettingpage() {
//   const session = await getServerSession(authOptions);

//   return (
//     <div className="">
//       <div className="ml-1 mb-5 h-[50px] flex justify-between items-center">
//         <h4 className="text-3xl font-extrabold text-gray-700 font-montserrat dark:text-gray-400">
//           Change Account Setting
//         </h4>
//       </div>

//       <div className="space-y-10">
//         <EmailChange currentEmail={session?.user.email} />
//         <PasswordChange />
//         <DeleteAccount />
//       </div>
//     </div>
//   );
// }

// export default AccountSettingpage;
