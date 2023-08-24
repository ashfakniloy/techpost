"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordField } from "@/components/Form/PasswordField";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import CancelButton from "@/components/Buttons/CancelButton";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { PasswordFormProps, passwordSchema } from "@/schemas/accountSchema";

function PasswordChange({
  setMenu,
}: {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const defaultValues = {
    currentPassword: "",
    newPassword: "",
    retypePassword: "",
  };

  const form = useForm<PasswordFormProps>({
    defaultValues,
    resolver: zodResolver(passwordSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: PasswordFormProps) => {
    if (values.currentPassword === values.newPassword) {
      console.log("Old and new password are same!");
      toast.error("Old and new password are same!");
      return;
    }

    // if (values.newPassword !== values.retypePassword) {
    //   console.log("passwords dont match");
    //   toast.error("Passwords don't match");
    //   return;
    // }

    const toastChangePassword = toast.loading("Loading...");

    const url = "/api/account?changeType=password";
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("succecss", data);
      // toast.success("Password changed succesfully", {
      //   id: toastChangePassword,
      // });

      signOut({
        callbackUrl: "/signin",
      });
    } else {
      console.log("error", data);
      toast.error(`${data.error}`, {
        id: toastChangePassword,
      });
    }
  };

  return (
    <div className="">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 lg:w-[360px]"
          noValidate
        >
          <PasswordField label="Current Password" name="currentPassword" />
          <PasswordField label="New Password" name="newPassword" />
          <PasswordField label="Retype New Password" name="retypePassword" />

          <div className="flex items-center justify-end gap-2 pt-1">
            <CancelButton setMenu={setMenu} isSubmitting={isSubmitting} />
            <SubmitButton name="Change Password" isSubmitting={isSubmitting} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default PasswordChange;
