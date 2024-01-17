"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/Form/InputField";
import { Loader } from "@/components/Loaders/Loader";
import { PasswordField } from "@/components/Form/PasswordField";
import { SigninFormProps, signinSchema } from "@/schemas/signinSchema";
import { Button } from "@/components/ui/button";
import TechpostLogo from "@/components/Layout/TechpostLogo";

function AdminSigninPage() {
  // const router = useRouter();

  // const { data: session } = useSession();

  const searchParams = useSearchParams();

  const callback_url = searchParams.get("callback_url") || "/admin";

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

      // router.refresh();
      // router.push(callback_url || "/admin");
      window.location.assign(callback_url);
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

      // router.refresh();
      // router.push(callback_url);
      window.location.assign(callback_url);
    } else {
      console.log("error", response);
      toast.error(`${response?.error}`);
    }

    setGuestIsSubmitting(false);
  };

  // useEffect(() => {
  //   const role = session?.user.role;

  //   const messages = {
  //     ADMIN: "Welcome Admin",
  //     GUEST_ADMIN: "Welcome Guest Admin",
  //   };

  //   if (role === "ADMIN" || role === "GUEST_ADMIN") {
  //     const message = messages[role];

  //     toast.success(<span className="capitalize">{message}</span>);
  //   }
  // }, [session]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="mt-10 flex justify-center">
        <TechpostLogo />
      </div>

      <div className="my-10 bg-gray-50 relative mx-3 dark:bg-custom-gray6 rounded-md shadow-md px-7 py-9 lg:px-10 lg:py-12  w-full max-w-[420px]">
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
                <Button
                  type="submit"
                  aria-label="submit"
                  className="relative w-full h-[42px] text-base"
                  disabled={isSubmitting || guestIsSubmitting}
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
      </div>
    </div>
  );
}

export default AdminSigninPage;
