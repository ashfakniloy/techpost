"use client";

import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { InputField } from "@/components/Form/InputField";
import { PasswordField } from "@/components/Form/PasswordField";
import { Button } from "@/components/ui/button";
import { changeUsername } from "@/db/mutations/user/account/changeUsername";
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

  // with server action
  const onSubmit = async (values: UsernameFormProps) => {
    if (values.username === currentUsername) {
      console.log("Old and new username are same!");
      toast.error("Old and new username are same!");
      return;
    }

    const toastUsernameChange = toast.loading("Loading...");

    const result = await changeUsername({ values });

    console.log("result", result);

    if (result.success) {
      signOut({
        callbackUrl: "/signin",
      }).then(() => {
        localStorage.removeItem("draftPost");
      });
    } else if (result.error) {
      toast.error(result.error, {
        id: toastUsernameChange,
      });
    } else {
      toast.error("Error", {
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
          <div className="flex items-center justify-end gap-4 pt-1">
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

export default UsernameChange;

// // with route handler
// "use client";

// import { signOut } from "next-auth/react";
// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";
// import { InputField } from "@/components/Form/InputField";
// import { PasswordField } from "@/components/Form/PasswordField";
// import { Button } from "@/components/ui/button";
// import { UsernameFormProps, usernameSchema } from "@/schemas/accountSchema";

// function UsernameChange({
//   currentUsername,
//   setMenu,
// }: {
//   currentUsername?: string;
//   setMenu: React.Dispatch<React.SetStateAction<string>>;
// }) {
//   const defaultValues = {
//     username: "",
//     password: "",
//   };

//   const form = useForm<UsernameFormProps>({
//     defaultValues,
//     resolver: zodResolver(usernameSchema),
//   });

//   const {
//     formState: { isSubmitting },
//   } = form;

//   const onSubmit = async (values: UsernameFormProps) => {
//     if (values.username === currentUsername) {
//       console.log("Old and new username are same!");
//       toast.error("Old and new username are same!");
//       return;
//     }

//     const toastUsernameChange = toast.loading("Loading...");

//     const url = "/api/account?changeType=username";
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
//       // toast.success("Username changed succesfully", {
//       //   id: toastUsernameChange,
//       // });

//       signOut({
//         callbackUrl: "/signin",
//       });
//     } else {
//       console.log("error", data);
//       toast.error(`${data.error}`, {
//         id: toastUsernameChange,
//       });
//     }
//   };

//   return (
//     <div className="mt-6">
//       <FormProvider {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-[42px] lg:w-[360px]"
//           noValidate
//         >
//           <InputField type="text" label="New Username" name="username" />
//           <PasswordField label="Enter your password" name="password" />
//           <div className="flex items-center justify-end gap-4 pt-1">
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

// export default UsernameChange;
