// import useToggle from "@/hooks/useToggle";
// import {
//   Bars3Icon,
//   ChevronDownIcon,
//   ChevronUpIcon,
// } from "@heroicons/react/24/solid";
// import { signOut } from "next-auth/react";

// function AdminHeader({ showMenu, setShowMenu }) {
//   const { toggle, setToggle, node } = useToggle();

//   const handleSignout = () => {
//     signOut({
//       // redirect: false,
//       callbackUrl: `${window.location.origin}/admin`,
//     });
//   };

//   return (
//     <div className="sticky top-0 z-20">
//       <div className="relative z-20">
//         <div className="bg-white h-[68px] w-full flex justify-between lg:justify-end items-center shadow-md  px-7 z-30">
//           <div
//             className="text-custom-blue2 lg:hidden"
//             onClick={() => setShowMenu(!showMenu)}
//           >
//             <Bars3Icon className="h-8 w-8" />
//           </div>

//           <div className="text-xl mx-auto text-custom-blue4 font-bold lg:hidden">
//             SMS Dashboard
//           </div>

//           <div className="flex justify-between items-center gap-5 lg:gap-[80px]">
//             <div className="hidden lg:flex justify-between items-center gap-12 text-custom-gray2 text-base font-semibold">
//               <p className="">Signed in as Admin</p>
//             </div>

//             <button
//               className="hidden lg:block bg-custom-blue5 hover:bg-opacity-80 active:scale-95 text-sm text-white font-semibold px-2 py-1 lg:px-4 lg:py-2 rounded-lg transition duration-200"
//               onClick={handleSignout}
//             >
//               Sign out
//             </button>
//           </div>

//           <button
//             className="lg:hidden text-custom-blue2 p-1 rounded-full border-2 border-custom-blue2"
//             onClick={() => setToggle(!toggle)}
//           >
//             {toggle ? (
//               <ChevronUpIcon className="h-5 w-5" />
//             ) : (
//               <ChevronDownIcon className="h-5 w-5" />
//             )}
//           </button>
//         </div>
//       </div>
//       <div
//         ref={node}
//         className={`lg:hidden flex flex-col items-center bg-custom-blue5 absolute top-[68px] w-full py-7 text-sm text-white font-semibold shadow-md ease-out duration-300 z-10
//             ${toggle ? "translate-y-0" : "-translate-y-full shadow-none"}`}
//       >
//         <p className="py-3">Signed in as Admin</p>
//         <button
//           type="button"
//           className="mt-2 px-5  py-3 bg-custom-blue hover:bg-opacity-80 text-sm rounded-lg active:scale-95 transition duration-200"
//           onClick={handleSignout}
//         >
//           Sign out
//         </button>
//       </div>
//     </div>
//   );
// }

// export default AdminHeader;
