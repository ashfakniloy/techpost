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

function EmailChange({
  currentEmail,
  setMenu,
}: {
  currentEmail?: string;
  setMenu: React.Dispatch<React.SetStateAction<string>>;
}) {
  const defaultValues = {
    email: "",
    password: "",
  };

  const formSchema = z.object({
    email: z.string().nonempty("Email is required").email("Invalid email"),
    password: z.string().nonempty("Password is required"),
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
    if (values.email === currentEmail) {
      console.log("Old and new email are same!");
      toast.error("Old and new email are same!");
      return;
    }

    const toastEmailChange = toast.loading("Loading...");

    const url = "/api/account?changeType=email";
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
      // toast.success("Email changed succesfully", {
      //   id: toastEmailChange,
      // });

      signOut({
        callbackUrl: "/signin",
      });
    } else {
      console.log("error", data);
      toast.error(`${data.error}`, {
        id: toastEmailChange,
      });
    }
  };

  return (
    <div className="mt-6">
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 lg:w-[360px]"
          noValidate
        >
          <InputField type="email" label="New Email" name="email" />
          <PasswordField label="Enter your password" name="password" />
          <div className="flex items-center justify-end gap-2 pt-1">
            <CancelButton setMenu={setMenu} isSubmitting={isSubmitting} />
            <SubmitButton name="Change Email" isSubmitting={isSubmitting} />
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default EmailChange;
