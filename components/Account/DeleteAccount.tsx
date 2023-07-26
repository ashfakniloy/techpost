"use client";

import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/Form/InputField";
import { PasswordField } from "@/components/Form/PasswordField";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import SubmitButton from "../Buttons/SubmitButton";
import CancelButton from "../Buttons/CancelButton";

function DeleteAccount({
  setMenu,
}: {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const defaultValues = {
    password: "",
    text: "",
  };

  const formSchema = z.object({
    password: z.string().nonempty("Password is required"),
    text: z.string().nonempty("This field is required"),
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
    const toastDeleteAccount = toast.loading("Loading...");

    if (values.text !== "delete my account") {
      console.log("error: type the text correctly");
      toast.error("Enter the text correctly", {
        id: toastDeleteAccount,
      });
      return;
    }

    const filteredValues = {
      password: values.password,
    };

    const url = "/api/account";
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredValues),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("success", data);
      signOut({
        callbackUrl: "/signup",
      });
    } else {
      console.log("error", data);
      toast.error(`${data.error}`, {
        id: toastDeleteAccount,
      });
    }
  };

  return (
    <div className="">
      <div className="">
        <p className="lg:text-lg">Are you sure you want to do this?</p>
        <p className="mt-5 text-sm lg:text-base">
          All your posts and activities will be deleted.
        </p>
        <p className=" text-sm lg:text-base">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
      </div>
      <div className="mt-6">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-7 lg:w-[360px]"
            noValidate
          >
            <PasswordField label="Enter your password" name="password" />
            <InputField
              name="text"
              type="text"
              label={
                <p>
                  To verify, type
                  <span className="mx-1.5 select-none italic opacity-70">
                    delete my account
                  </span>
                  below
                </p>
              }
            />
            <div className="flex items-center justify-end gap-2 pt-1">
              <CancelButton setMenu={setMenu} isSubmitting={isSubmitting} />
              <SubmitButton name="Delete Account" isSubmitting={isSubmitting} />
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default DeleteAccount;
