// "use client";

// import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
// import { useRouter } from "next/navigation";
// import UserSigninPage from "../../(auth)/signin/page";

// function UserSigininPageModal() {
//   const router = useRouter();
//   const handleOpenChange = () => {
//     router.back();
//   };
//   return (
//     <AlertDialog defaultOpen onOpenChange={handleOpenChange}>
//       <AlertDialogContent className="border-none p-0 bg-inherit lg:pl-[34px]">
//         <UserSigninPage isModal />
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// export default UserSigininPageModal;

// import SigninForm from "../../(auth)/signin/SigninForm";

// function SigininPageModal() {
//   return (
//     <div className="fixed inset-0 bg-black/50 z-30">
//       <div className="flex items-center justify-center min-h-screen">
//         <SigninForm isModal />
//       </div>
//     </div>
//   );
// }

// export default SigininPageModal;

// "use client";

// import { Dialog, Transition } from "@headlessui/react";
// import SigninForm from "../../(auth)/signin/SigninForm";
// import { Fragment } from "react";
// import { useRouter } from "next/navigation";

// function SigininPageModal() {
//   const router = useRouter();

//   return (
//     <Transition appear show={true}>
//       <Dialog as="div" className="relative z-30" open onClose={() => ""}>
//         <Transition.Child
//           as={Fragment}
//           enter="ease-out duration-300"
//           enterFrom="opacity-0"
//           enterTo="opacity-100"
//           leave="ease-in duration-200"
//           leaveFrom="opacity-100"
//           leaveTo="opacity-0"
//         >
//           <div className="fixed inset-0 bg-black bg-opacity-25" />
//         </Transition.Child>

//         <div className="fixed inset-0 overflow-y-auto">
//           <div className="flex min-h-full items-center justify-center p-4 ">
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0 scale-95"
//               enterTo="opacity-100 scale-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100 scale-100"
//               leaveTo="opacity-0 scale-95"
//             >
//               <Dialog.Panel className="w-full max-w-md transform  align-middle shadow-md transition-all">
//                 <button
//                   type="button"
//                   className=" p-2 rounded-full bg-gray-600"
//                   onClick={() => router.back()}
//                 >
//                   X
//                 </button>
//                 {/* <div className="fixed inset-0 bg-black/50 z-30">
//                   <div className=""> */}
//                 <SigninForm isModal />
//                 {/* </div>
//                 </div> */}
//               </Dialog.Panel>
//             </Transition.Child>
//           </div>
//         </div>
//       </Dialog>
//     </Transition>
//   );
// }

// export default SigininPageModal;
