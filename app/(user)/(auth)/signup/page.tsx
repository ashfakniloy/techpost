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
// import { XMarkIcon } from "@heroicons/react/24/solid";

function UserSignUpPage() {
  // function UserSignUpPage({ isModal }: { isModal?: boolean }) { //for showing modal with parallel route this needs to be a component and should be imported in this page
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

    const url = "/api/signup";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("succcess", data);
      toast.success("Account Created Successfully", {
        id: toastSignup,
      });
      router.push("/signin");
    } else {
      console.log("error", data);
      toast.error(`${data.error}`, {
        id: toastSignup,
      });
    }
  };

  return (
    <div className="bg-gray-50 relative mx-3 dark:bg-custom-gray4 rounded-md shadow-md px-7 py-9 pg:px-10 lg:py-12 w-full max-w-[420px]">
      {/* {isModal && (
        <button
          type="button"
          className="absolute right-5 top-5 p-1 rounded-full hover:bg-gray-700"
          onClick={() => router.back()}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      )} */}
      <p className="text-2xl font-bold text-center">Create new Account</p>
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
            <PasswordField label="Confirm Password " name="confirm_password" />
            <div className="pt-3">
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
  );
}

export default UserSignUpPage;
