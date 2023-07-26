// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";
// import { toast } from "react-hot-toast";
// import { z } from "zod";
// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { InputField } from "@/components/Form/InputField";
// import { Loader } from "@/components/Loaders/Loader";
// import { PasswordField } from "@/components/Form/PasswordField";

// function UserSignInPage() {
//   const router = useRouter();

//   const defaultValues = {
//     email: "",
//     password: "",
//   };

//   const formSchema = z.object({
//     email: z.string().nonempty("Email is required").email("Invalid email"),
//     password: z.string().nonempty("Password is required"),
//   });

//   type FormValuesProps = z.infer<typeof formSchema>;

//   const form = useForm<FormValuesProps>({
//     defaultValues,
//     resolver: zodResolver(formSchema),
//   });

//   const {
//     formState: { isSubmitting },
//   } = form;

//   const onSubmit = async (values: FormValuesProps) => {
//     // console.log("login", values);
//     // return;

//     const toastSignin = toast.loading("Loading...");

//     const response = await signIn("credentials", {
//       email: values.email,
//       password: values.password,
//       // callbackUrl: `${window.location.origin}`,
//       redirect: false,
//     });

//     // console.log("response", response);

//     if (!response?.error) {
//       console.log("succcess", response);
//       toast.success("Login Successfull", {
//         id: toastSignin,
//       });

//       router.push("/");
//       router.refresh();
//     } else {
//       console.log("error", response);
//       toast.error(`${response?.error}`, {
//         id: toastSignin,
//       });
//     }
//   };

//   return (
//     <div className="bg-gray-50 mx-3 dark:bg-custom-gray4 rounded-md shadow-md p-7 lg:p-10 w-full max-w-[420px]">
//       <p className="text-2xl font-bold text-center">Sign In</p>

//       <div className="mt-5">
//         <FormProvider {...form}>
//           <form
//             onSubmit={form.handleSubmit(onSubmit)}
//             className="space-y-6"
//             noValidate
//           >
//             <InputField label="Email" name="email" type="email" />
//             <PasswordField label="Password" name="password" />

//             <div className="pt-3">
//               <button
//                 type="submit"
//                 className="relative w-full py-[9px] font-medium text-white bg-black rounded-md dark:text-black dark:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting && (
//                   <span className="absolute flex left-[105px] items-center inset-y-0">
//                     <Loader width="30" />
//                   </span>
//                 )}
//                 <span>Submit</span>
//               </button>
//             </div>
//           </form>
//         </FormProvider>
//       </div>

//       <div className="mt-6">
//         <p className="text-sm text-gray-600 dark:text-gray-300">
//           Don&apos;t have an account?{" "}
//           <Link href="/signup" className="text-blue-500 dark:text-blue-400">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default UserSignInPage;

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/Form/InputField";
import { Loader } from "@/components/Loaders/Loader";
import { PasswordField } from "@/components/Form/PasswordField";
// import { XMarkIcon } from "@heroicons/react/24/solid";

function UserSigninPage() {
  // function UserSigninPage({ isModal }: { isModal?: boolean }) {//for showing modal with parallel route this needs to be a component and should be imported in this page
  const router = useRouter();

  const defaultValues = {
    email: "",
    password: "",
  };

  const formSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email"),
    password: z.string().nonempty("Password is required"),
  });

  type FormValuesProps = z.infer<typeof formSchema>;

  const form = useForm<FormValuesProps>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: FormValuesProps) => {
    // console.log("login", values);
    // return;

    const toastSignin = toast.loading("Loading...");

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      role: "USER",
      // callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    // console.log("response", response);

    if (!response?.error) {
      console.log("succcess", response);
      toast.success("Login Successfull", {
        id: toastSignin,
      });

      // isModal ? router.back() : router.push("/");
      router.refresh();
      router.push("/");
    } else {
      console.log("error", response);
      toast.error(`${response?.error}`, {
        id: toastSignin,
      });
    }
  };

  return (
    <div className="bg-gray-50 relative mx-3 dark:bg-custom-gray4 rounded-md shadow-md px-7 py-9 lg:px-10 lg:py-12  w-full max-w-[420px]">
      {/* {isModal && (
        <button
          type="button"
          className="absolute right-5 top-5 p-1 rounded-full hover:bg-gray-700"
          onClick={() => router.back()}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      )} */}
      <p className="text-2xl font-bold text-center">Sign In</p>

      <div className="mt-5">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
          >
            <InputField label="Email" name="email" type="email" />
            <PasswordField label="Password" name="password" />

            <div className="pt-3">
              <button
                type="submit"
                className="relative w-full py-[9px] font-medium text-white bg-black rounded-md dark:text-black dark:bg-gray-50 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <span className="absolute flex left-[80px] lg:left-[105px] items-center inset-y-0">
                    <Loader width="30" />
                  </span>
                )}
                <span>Submit</span>
              </button>
            </div>
          </form>
        </FormProvider>
      </div>

      <div className="mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 dark:text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default UserSigninPage;
