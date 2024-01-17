"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Loader } from "@/components/Loaders/Loader";
import { InputField } from "@/components/Form/InputField";
import { PasswordField } from "@/components/Form/PasswordField";
import { SignupFormProps, signupSchema } from "@/schemas/signupSchema";
import { Button } from "@/components/ui/button";
import { userSignup } from "@/db/mutations/user/account/userSignup";

function UserSignUpPage() {
  const router = useRouter();

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const form = useForm<SignupFormProps>({
    defaultValues,
    resolver: zodResolver(signupSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: SignupFormProps) => {
    const toastSignup = toast.loading("Loading...");

    const result = await userSignup({ values });

    if (result?.success) {
      toast.success(result.success, {
        id: toastSignup,
      });
      router.push("/signin");
    } else if (result?.error) {
      console.log("error", result);
      toast.error(result.error, {
        id: toastSignup,
      });
    }
  };

  // // with route handler
  // const onSubmit = async (values: SignupFormProps) => {
  //   const toastSignup = toast.loading("Loading...");

  //   const url = "/api/signup";

  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(values),
  //   });

  //   const data = await response.json();

  //   if (response.ok) {
  //     console.log("succcess", data);
  //     toast.success("Account Created Successfully", {
  //       id: toastSignup,
  //     });
  //     router.push("/signin");
  //   } else {
  //     console.log("error", data);
  //     toast.error(`${data.error}`, {
  //       id: toastSignup,
  //     });
  //   }
  // };

  return (
    <>
      <div className="bg-gray-50 relative mx-3 dark:bg-custom-gray4 rounded-md shadow-md px-7 py-9 pg:px-10 lg:py-12 w-full max-w-[420px]">
        <p className="text-2xl font-montserrat font-bold text-center">
          Create new account
        </p>
        <div className="mt-5">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-[42px]"
              noValidate
            >
              <InputField label="Username" name="username" type="text" />
              <InputField label="Email" name="email" type="email" />
              <PasswordField label="Password" name="password" />
              <PasswordField
                label="Confirm Password "
                name="confirm_password"
              />
              <div className="pt-3">
                <Button
                  type="submit"
                  aria-label="submit"
                  className="relative w-full h-[42px] text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span className="absolute flex left-[80px] lg:left-[95px] items-center inset-y-0">
                      <Loader width="30" />
                    </span>
                  )}
                  <span>Submit</span>
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already have have an account?{" "}
            <Link href="/signin" className="text-blue-500 dark:text-blue-400">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <p className="mt-2 text-sm opacity-80 max-w-[350px] text-center">
        {`* Create new account with any email, you don't have to verify your email address.`}
      </p>
    </>
  );
}

export default UserSignUpPage;

// // with route handler
// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";
// import { Loader } from "@/components/Loaders/Loader";
// import { InputField } from "@/components/Form/InputField";
// import { PasswordField } from "@/components/Form/PasswordField";
// import { SignupFormProps, signupSchema } from "@/schemas/signupSchema";
// import { Button } from "@/components/ui/button";

// function UserSignUpPage() {
//   const router = useRouter();

//   const defaultValues = {
//     username: "",
//     email: "",
//     password: "",
//     confirm_password: "",
//   };

//   const form = useForm<SignupFormProps>({
//     defaultValues,
//     resolver: zodResolver(signupSchema),
//   });

//   const {
//     formState: { isSubmitting },
//   } = form;

//   const onSubmit = async (values: SignupFormProps) => {
//     const toastSignup = toast.loading("Loading...");

//     const url = "/api/signup";

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       console.log("succcess", data);
//       toast.success("Account Created Successfully", {
//         id: toastSignup,
//       });
//       router.push("/signin");
//     } else {
//       console.log("error", data);
//       toast.error(`${data.error}`, {
//         id: toastSignup,
//       });
//     }
//   };

//   return (
//     <>
//       <div className="bg-gray-50 relative mx-3 dark:bg-custom-gray4 rounded-md shadow-md px-7 py-9 pg:px-10 lg:py-12 w-full max-w-[420px]">
//         <p className="text-2xl font-montserrat font-bold text-center">
//           Create new account
//         </p>
//         <div className="mt-5">
//           <FormProvider {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-[42px]"
//               noValidate
//             >
//               <InputField label="Username" name="username" type="text" />
//               <InputField label="Email" name="email" type="email" />
//               <PasswordField label="Password" name="password" />
//               <PasswordField
//                 label="Confirm Password "
//                 name="confirm_password"
//               />
//               <div className="pt-3">
//                 <Button
//                   type="submit"
//                   aria-label="submit"
//                   className="relative w-full h-[42px] text-base"
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting && (
//                     <span className="absolute flex left-[80px] lg:left-[95px] items-center inset-y-0">
//                       <Loader width="30" />
//                     </span>
//                   )}
//                   <span>Submit</span>
//                 </Button>
//               </div>
//             </form>
//           </FormProvider>
//         </div>

//         <div className="mt-6">
//           <p className="text-sm text-gray-600 dark:text-gray-300">
//             Already have have an account?{" "}
//             <Link href="/signin" className="text-blue-500 dark:text-blue-400">
//               Sign In
//             </Link>
//           </p>
//         </div>
//       </div>
//       <p className="mt-2 text-sm opacity-80 max-w-[350px] text-center">
//         {`* Create new account with any email, you don't have to verify your email address.`}
//       </p>
//     </>
//   );
// }

// export default UserSignUpPage;
