"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { Loader } from "@/components/Loaders/Loader";
import { InputField } from "@/components/Form/InputField";
import { PasswordField } from "@/components/Form/PasswordField";
import { XMarkIcon } from "@heroicons/react/24/solid";

function UserSignUpPage() {
  // function UserSignUpPage({ isModal }: { isModal?: boolean }) { //for showing modal with parallel route this needs to be a component and should be imported in this page
  const router = useRouter();

  const defaultValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formSchema = z
    .object({
      username: z.string().nonempty("Username is required"),
      email: z.string().nonempty("Email is required").email("Invalid email"),
      password: z.string().nonempty("Password is required"),
      confirm_password: z.string().nonempty("Confirm Password is required"),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match",
      path: ["confirm_password"],
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
    const toastSignup = toast.loading("Loading...");

    const signupvalues = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    const url = "/api/signup";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupvalues),
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
            className="space-y-6"
            noValidate
          >
            <InputField label="Username" name="username" type="text" />
            <InputField label="Email" name="email" type="email" />
            <PasswordField label="Password" name="password" />
            <PasswordField label="Confirm Password " name="confirm_password" />
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
