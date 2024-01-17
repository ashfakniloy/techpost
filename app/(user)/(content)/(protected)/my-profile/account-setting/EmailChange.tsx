"use client";

import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { InputField } from "@/components/Form/InputField";
import { PasswordField } from "@/components/Form/PasswordField";
import { Button } from "@/components/ui/button";
import { EmailFormProps, emailSchema } from "@/schemas/accountSchema";
import { changeEmail } from "@/db/mutations/user/account/changeEmail";

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

  const form = useForm<EmailFormProps>({
    defaultValues,
    resolver: zodResolver(emailSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  // with server action
  const onSubmit = async (values: EmailFormProps) => {
    if (values.email === currentEmail) {
      console.log("Old and new email are same!");
      toast.error("Old and new email are same!");
      return;
    }

    const toastEmailChange = toast.loading("Loading...");

    const result = await changeEmail({ values });

    console.log("result", result);

    if (result.success) {
      signOut({
        callbackUrl: "/signin",
      }).then(() => {
        localStorage.removeItem("draftPost");
      });
    } else if (result.error) {
      toast.error(result.error, {
        id: toastEmailChange,
      });
    } else {
      toast.error("Error", {
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
          <div className="flex items-center justify-end gap-5 pt-1">
            <Button
              type="button"
              aria-label="cancel"
              variant="outline"
              className="lg:min-w-[100px] border-gray-500"
              onClick={() => setMenu("")}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              aria-label="submit"
              className="lg:min-w-[100px]"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default EmailChange;

// // with route handler
// "use client";

// import { signOut } from "next-auth/react";
// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";
// import { InputField } from "@/components/Form/InputField";
// import { PasswordField } from "@/components/Form/PasswordField";
// import { Button } from "@/components/ui/button";
// import { EmailFormProps, emailSchema } from "@/schemas/accountSchema";

// function EmailChange({
//   currentEmail,
//   setMenu,
// }: {
//   currentEmail?: string;
//   setMenu: React.Dispatch<React.SetStateAction<string>>;
// }) {
//   const defaultValues = {
//     email: "",
//     password: "",
//   };

//   const form = useForm<EmailFormProps>({
//     defaultValues,
//     resolver: zodResolver(emailSchema),
//   });

//   const {
//     formState: { isSubmitting },
//   } = form;

//   const onSubmit = async (values: EmailFormProps) => {
//     if (values.email === currentEmail) {
//       console.log("Old and new email are same!");
//       toast.error("Old and new email are same!");
//       return;
//     }

//     const toastEmailChange = toast.loading("Loading...");

//     const url = "/api/account?changeType=email";
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       console.log("succecss", data);
//       // toast.success("Email changed succesfully", {
//       //   id: toastEmailChange,
//       // });

//       signOut({
//         callbackUrl: "/signin",
//       });
//     } else {
//       console.log("error", data);
//       toast.error(`${data.error}`, {
//         id: toastEmailChange,
//       });
//     }
//   };

//   return (
//     <div className="mt-6">
//       <FormProvider {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-7 lg:w-[360px]"
//           noValidate
//         >
//           <InputField type="email" label="New Email" name="email" />
//           <PasswordField label="Enter your password" name="password" />
//           <div className="flex items-center justify-end gap-5 pt-1">
//             <Button
//               type="button"
//               aria-label="cancel"
//               variant="outline"
//               className="lg:min-w-[100px] border-gray-500"
//               onClick={() => setMenu("")}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button
//               type="submit"
//               aria-label="submit"
//               className="lg:min-w-[100px]"
//               disabled={isSubmitting}
//             >
//               Submit
//             </Button>
//           </div>
//         </form>
//       </FormProvider>
//     </div>
//   );
// }

// export default EmailChange;
