"use client";

import Link from "next/link";
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

function UserSigninPage() {
  // const router = useRouter();

  const searchParams = useSearchParams();
  const callback_url = searchParams?.get("callback_url") || "/";

  const [guestIsSubmitting, setGuestIsSubmitting] = useState(false);

  // const { data: session } = useSession();

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

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      role: "USER",
      // callbackUrl: callback_url,
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
      toast.error(response.error);
    }
  };

  const handleGuestSignin = async () => {
    setGuestIsSubmitting(true);

    const response = await signIn("credentials", {
      email: "guestuser@email.com",
      password: "guest-user123",
      role: "USER",
      // callbackUrl: callback_url,
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
      toast.error(response.error);
    }

    setGuestIsSubmitting(false);
  };

  // useEffect(() => {
  //   const username = session?.user.username;
  //   const role = session?.user.role;

  //   if (username && role === "USER") {
  //     toast.success(() => (
  //       <span className="capitalize">{`Welcome ${username}`}</span>
  //     ));
  //   }
  // }, [session]);

  return (
    <div className="bg-gray-50 relative mx-3 dark:bg-custom-gray4 rounded-md shadow-md px-7 py-9 lg:px-10 lg:py-12 w-full max-w-[420px]">
      <p className="text-2xl font-montserrat font-bold text-center">Sign In</p>

      <div className="mt-5">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-[42px]"
            noValidate
          >
            <InputField label="Email" name="email" type="email" />
            <PasswordField label="Password" name="password" />

            <div className="pt-1">
              <Button
                type="submit"
                aria-label="submit"
                className="relative w-full h-[42px] text-base"
                disabled={isSubmitting || guestIsSubmitting}
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

      <div className="mt-6">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-500 dark:text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>

      <div className="mt-3">
        <Link
          href="/admin/signin"
          className="font-medium text-blue-500 dark:text-blue-400"
        >
          Sign in as admin
        </Link>
      </div>
    </div>
  );
}

export default UserSigninPage;
