"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/Form/InputField";
import { PasswordField } from "@/components/Form/PasswordField";
import { toast } from "react-hot-toast";
import { signOut } from "next-auth/react";
import CancelButton from "@/components/Buttons/CancelButton";
import SubmitButton from "@/components/Buttons/SubmitButton";
import { UsernameFormProps, usernameSchema } from "@/schemas/accountSchema";

function UsernameChange({
  currentUsername,
  setMenu,
}: {
  currentUsername?: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const defaultValues = {
    username: "",
    password: "",
  };

  const form = useForm<UsernameFormProps>({
    defaultValues,
    resolver: zodResolver(usernameSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: UsernameFormProps) => {
    if (values.username === currentUsername) {
      console.log("Old and new username are same!");
      toast.error("Old and new username are same!");
      return;
    }

    const toastUsernameChange = toast.loading("Loading...");

    const url = "/api/account?changeType=username";
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
      // toast.success("Username changed succesfully", {
      //   id: toastUsernameChange,
      // });

      signOut({
        callbackUrl: "/signin",
      });
    } else {
      console.log("error", data);
      toast.error(`${data.error}`, {
        id: toastUsernameChange,
      });
    }
  };

  return (
    <div className="mt-6">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-[42px] lg:w-[360px]"
          noValidate
        >
          <InputField type="text" label="New Username" name="username" />
          <PasswordField label="Enter your password" name="password" />
          <div className="flex items-center justify-end gap-2 pt-1">
            <CancelButton setMenu={setMenu} isSubmitting={isSubmitting} />
            <SubmitButton name="Change Username" isSubmitting={isSubmitting} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default UsernameChange;
