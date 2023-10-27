"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/Form/InputField";
import { Loader } from "@/components/Loaders/Loader";
import { PasswordField } from "@/components/Form/PasswordField";
import { SigninFormProps, signinSchema } from "@/schemas/signinSchema";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
// import { XMarkIcon } from "@heroicons/react/24/solid";

function AdminSigninPage() {
  const router = useRouter();

  const { data: session } = useSession();

  const searchParams = useSearchParams();

  const callback_url = searchParams?.get("callback_url");

  const [guestIsSubmitting, setGuestIsSubmitting] = useState(false);

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm<SigninFormProps>({
    defaultValues,
    resolver: zodResolver(signinSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: SigninFormProps) => {
    // console.log("login", values);
    // return;

    // const toastSignin = toast.loading("Loading...");

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      role: "ADMIN",
      // callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    // console.log("response", response);

    if (!response?.error) {
      console.log("succcess", response);
      // toast.success("Welcome Admin", {
      //   id: toastSignin,
      // });

      // isModal ? router.back() : router.push("/");
      router.refresh();
      // router.push("/admin");
      router.push(callback_url || "/admin");
    } else {
      console.log("error", response);
      toast.error(
        `${response?.error}`
        // {
        //   id: toastSignin,
        // }
      );
    }
  };

  const handleGuestSignin = async () => {
    setGuestIsSubmitting(true);
    // const toastSignin = toast.loading("Loading...");

    const response = await signIn("credentials", {
      email: "guestadmin@email.com",
      password: "guest-admin123",
      role: "GUEST_ADMIN",
      // callbackUrl: `${window.location.origin}`,
      redirect: false,
    });

    // console.log("response", response);

    if (!response?.error) {
      console.log("succcess", response);
      // toast.success("Welcome Admin", {
      //   id: toastSignin,
      // });

      // isModal ? router.back() : router.push("/");
      router.refresh();
      // router.push("/admin");
      router.push(callback_url || "/admin");
    } else {
      console.log("error", response);
      toast.error(
        `${response?.error}`
        // {
        //   id: toastSignin,
        // }
      );
    }

    setGuestIsSubmitting(false);
  };

  useEffect(() => {
    const role = session?.user.role;

    const messages = {
      ADMIN: "Welcome Admin",
      GUEST_ADMIN: "Welcome Guest Admin",
    };

    if (role === "ADMIN" || role === "GUEST_ADMIN") {
      const message = messages[role];

      toast.success(<span className="capitalize">{message}</span>);
    }
  }, [session]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-gray-50 relative mx-3 dark:bg-custom-gray6 rounded-md shadow-md px-7 py-9 lg:px-10 lg:py-12  w-full max-w-[420px]">
        {/* {isModal && (
        <button
          type="button"
          className="absolute right-5 top-5 p-1 rounded-full hover:bg-gray-700"
          onClick={() => router.back()}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      )} */}
        <p className="text-2xl font-montserrat font-bold text-center">
          Admin Sign In
        </p>

        <div className="mt-5">
          <FormProvider {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-10 lg:space-y-8"
              noValidate
            >
              <InputField label="Email" name="email" type="email" />
              <PasswordField label="Password" name="password" />

              <div className="pt-3">
                {/* <button
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
                </button> */}

                <Button
                  type="submit"
                  aria-label="submit"
                  className="relative w-full h-[42px] text-base"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <span className="absolute flex left-[80px] lg:left-[105px] items-center inset-y-0">
                      <Loader width="30" />
                    </span>
                  )}
                  <span>Submit</span>
                </Button>
              </div>
            </form>
          </FormProvider>

          <div className="border-b-2 border-gray-300 dark:border-gray-600 my-6" />

          <div className="">
            <Button
              type="button"
              aria-label="guest user signin"
              variant="outline"
              className="relative w-full h-[42px] text-base border-gray-600 dark:border-gray-300"
              onClick={handleGuestSignin}
              disabled={isSubmitting || guestIsSubmitting}
            >
              {guestIsSubmitting && (
                <span className="absolute flex left-[15%] items-center inset-y-0">
                  <Loader width="30" />
                </span>
              )}
              <span>Sign in as guest</span>
            </Button>
          </div>
        </div>

        {/* <div className="mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 dark:text-blue-400">
              Sign Up
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default AdminSigninPage;
