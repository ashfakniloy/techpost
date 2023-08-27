"use client";

import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/Form/InputField";
import { PasswordField } from "@/components/Form/PasswordField";
import { Button } from "@/components/ui/button";
import {
  DeleteAccountFormProps,
  deleteAccountSchema,
} from "@/schemas/accountSchema";

function DeleteAccount({
  setMenu,
}: {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const defaultValues = {
    password: "",
    text: "",
  };

  const form = useForm<DeleteAccountFormProps>({
    defaultValues,
    resolver: zodResolver(deleteAccountSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: DeleteAccountFormProps) => {
    const toastDeleteAccount = toast.loading("Loading...");

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
            <div className="flex items-center justify-end gap-5 pt-1">
              <Button
                type="button"
                variant="outline"
                className="lg:min-w-[100px] border-gray-500"
                onClick={() => setMenu("")}
                disabled={isSubmitting}
                aria-label="cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                aria-label="delete account"
                className="lg:min-w-[100px]"
                disabled={isSubmitting}
              >
                Delete Account
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default DeleteAccount;
