"use client";

import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { PasswordField } from "@/components/Form/PasswordField";
import { Button } from "@/components/ui/button";
import { PasswordFormProps, passwordSchema } from "@/schemas/accountSchema";
import { changePassword } from "@/db/mutations/user/account/changePassword";

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

  // with server action
  const onSubmit = async (values: PasswordFormProps) => {
    if (values.currentPassword === values.newPassword) {
      console.log("Old and new password should not be same!");
      toast.error("Old and new password should not be same!");
      return;
    }

    const toastChangePassword = toast.loading("Loading...");

    const result = await changePassword({ values });

    console.log("result", result);

    if (result.success) {
      signOut({
        callbackUrl: "/signin",
      }).then(() => {
        localStorage.removeItem("draftPost");
      });
    } else if (result.error) {
      toast.error(result.error, {
        id: toastChangePassword,
      });
    } else {
      toast.error("Error", {
        id: toastChangePassword,
      });
    }
  };

  return (
    <div>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-10 lg:space-y-8 lg:w-[360px]"
          noValidate
        >
          <PasswordField label="Current Password" name="currentPassword" />
          <PasswordField label="New Password" name="newPassword" />
          <PasswordField label="Retype New Password" name="retypePassword" />

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

export default PasswordChange;

// // with route handler
// "use client";

// import { signOut } from "next-auth/react";
// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";
// import { PasswordField } from "@/components/Form/PasswordField";
// import { Button } from "@/components/ui/button";
// import { PasswordFormProps, passwordSchema } from "@/schemas/accountSchema";

// function PasswordChange({
//   setMenu,
// }: {
//   setMenu: React.Dispatch<React.SetStateAction<string>>;
// }) {
//   const defaultValues = {
//     currentPassword: "",
//     newPassword: "",
//     retypePassword: "",
//   };

//   const form = useForm<PasswordFormProps>({
//     defaultValues,
//     resolver: zodResolver(passwordSchema),
//   });

//   const {
//     formState: { isSubmitting },
//   } = form;

//   const onSubmit = async (values: PasswordFormProps) => {
//     if (values.currentPassword === values.newPassword) {
//       console.log("Old and new password should not be same!");
//       toast.error("Old and new password should not be same!");
//       return;
//     }

//     // if (values.newPassword !== values.retypePassword) {
//     //   console.log("passwords dont match");
//     //   toast.error("Passwords don't match");
//     //   return;
//     // }

//     const toastChangePassword = toast.loading("Loading...");

//     const url = "/api/account?changeType=password";
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
//       // toast.success("Password changed succesfully", {
//       //   id: toastChangePassword,
//       // });

//       signOut({
//         callbackUrl: "/signin",
//       });
//     } else {
//       console.log("error", data);
//       toast.error(`${data.error}`, {
//         id: toastChangePassword,
//       });
//     }
//   };

//   return (
//     <div>
//       <FormProvider {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-10 lg:space-y-8 lg:w-[360px]"
//           noValidate
//         >
//           <PasswordField label="Current Password" name="currentPassword" />
//           <PasswordField label="New Password" name="newPassword" />
//           <PasswordField label="Retype New Password" name="retypePassword" />

//           <div className="flex items-center justify-end gap-5 pt-1">
//             <Button
//               type="button"
//               variant="outline"
//               className="lg:min-w-[100px] border-gray-500"
//               onClick={() => setMenu("")}
//               disabled={isSubmitting}
//               aria-label="cancel"
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

// export default PasswordChange;
