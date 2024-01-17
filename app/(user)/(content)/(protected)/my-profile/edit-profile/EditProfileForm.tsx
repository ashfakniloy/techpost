"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/components/Form/InputField";
import { IconFacebook } from "@/components/Icons/IconFacebook";
import { IconTwitter } from "@/components/Icons/IconTwitter";
import { toast } from "react-hot-toast";
import { Profile } from "@prisma/client";
import { TextAreaField } from "@/components/Form/TextAreaField";
import { ImageField } from "@/components/Form/ImageField";
import { IconLinkedin } from "@/components/Icons/IconLinkedin";
import { useSession } from "next-auth/react";
import { ProfileFormProps, profileSchema } from "@/schemas/profileSchema";
import { Button } from "@/components/ui/button";
import { editProfile } from "@/db/mutations/user/account/editProfile";
import { useRouter } from "next/navigation";

function EditProfileForm({
  profile,
}: {
  profile:
    | (Profile & {
        user: {
          username: string;
        };
      })
    | null;
}) {
  const { data: session, update } = useSession();

  const router = useRouter();

  const defaultValues = {
    imageUrl: profile?.imageUrl ?? "",
    imageId: profile?.imageId ?? "",
    bio: profile?.bio ?? "",
    facebook: profile?.facebook ?? "",
    twitter: profile?.twitter ?? "",
    linkedin: profile?.linkedin ?? "",
  };

  const form = useForm<ProfileFormProps>({
    defaultValues,
    resolver: zodResolver(profileSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  // with server action
  const onSubmit = async (values: ProfileFormProps) => {
    if (profile === null) return;

    const toastProfileUpdate = toast.loading("Loading...");

    const result = await editProfile({
      values: values,
      profileId: profile.id,
    });

    console.log("result", result);

    if (result.success) {
      toast.success(result.success, {
        id: toastProfileUpdate,
      });

      await update({
        ...session,
        user: {
          ...session?.user,
          imageUrl: result.data.imageUrl,
        },
      });

      router.refresh();
    } else if (result.error) {
      toast.error(result.error, {
        id: toastProfileUpdate,
      });
    } else {
      toast.error("Error", {
        id: toastProfileUpdate,
      });
    }
  };

  return (
    <div>
      <h4 className="mb-5 text-[22px] lg:text-2xl text-center lg:text-start font-extrabold text-gray-700 font-montserrat dark:text-gray-400">
        Edit Your Profile
      </h4>

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 lg:w-[450px]"
          noValidate
        >
          <ImageField label="Image" name="imageUrl" />
          <TextAreaField label="Bio" name="bio" />

          <div>
            <label className="inline-block mb-2">Social Accounts</label>
            <span className="w-5 h-5"></span>
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <IconFacebook className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100" />
                <div className="w-[450px]">
                  <InputField
                    type="text"
                    name="facebook"
                    placeholder="Enter facebook profile"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <IconTwitter className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100" />
                <div className="w-[450px]">
                  <InputField
                    type="text"
                    name="twitter"
                    placeholder="Enter twitter profile"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <IconLinkedin className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100" />
                <div className="w-[450px]">
                  <InputField
                    type="text"
                    name="linkedin"
                    placeholder="Enter linkedin profile"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="min-w-[120px]"
              aria-label="save"
              disabled={isSubmitting}
            >
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default EditProfileForm;

// // with route handler
// "use client";

// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { InputField } from "@/components/Form/InputField";
// import { IconFacebook } from "@/components/Icons/IconFacebook";
// import { IconTwitter } from "@/components/Icons/IconTwitter";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { Profile } from "@prisma/client";
// import { TextAreaField } from "@/components/Form/TextAreaField";
// import { ImageField } from "@/components/Form/ImageField";
// import { IconLinkedin } from "@/components/Icons/IconLinkedin";
// import { useSession } from "next-auth/react";
// import { ProfileFormProps, profileSchema } from "@/schemas/profileSchema";
// import { Button } from "@/components/ui/button";

// function EditProfileForm({
//   profile,
// }: {
//   profile:
//     | (Profile & {
//         user: {
//           username: string;
//         };
//       })
//     | null;
// }) {
//   const router = useRouter();

//   const { data: session, update } = useSession();

//   const defaultValues = {
//     imageUrl: profile?.imageUrl ?? "",
//     imageId: profile?.imageId ?? "",
//     bio: profile?.bio ?? "",
//     facebook: profile?.facebook ?? "",
//     twitter: profile?.twitter ?? "",
//     linkedin: profile?.linkedin ?? "",
//   };

//   const form = useForm<ProfileFormProps>({
//     defaultValues,
//     resolver: zodResolver(profileSchema),
//   });

//   const {
//     formState: { isSubmitting },
//   } = form;

//   const onSubmit = async (values: ProfileFormProps) => {
//     const toastProfileUpdate = toast.loading("Loading...");

//     const url = `/api/profile?profileId=${profile?.id}`;
//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });

//     const data = await response.json();

//     // console.log("submit", values);

//     // return;

//     if (response.ok) {
//       console.log("success", data);
//       toast.success("Profile updated successfully", {
//         id: toastProfileUpdate,
//       });

//       // if(data.response.imageUrl !== session?.user.imageUrl)
//       await update({
//         ...session,
//         user: {
//           ...session?.user,
//           imageUrl: data.response.imageUrl,
//         },
//       });

//       router.refresh();
//     } else {
//       console.log("error", data);
//       toast.error(data.error, {
//         id: toastProfileUpdate,
//       });
//     }
//   };

//   // console.log("session", session);

//   return (
//     <div>
//       <h4 className="mb-5 text-[22px] lg:text-2xl text-center lg:text-start font-extrabold text-gray-700 font-montserrat dark:text-gray-400">
//         Edit Your Profile
//       </h4>

//       <FormProvider {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="space-y-5 lg:w-[450px]"
//           noValidate
//         >
//           <ImageField label="Image" name="imageUrl" />
//           <TextAreaField label="Bio" name="bio" />

//           <div>
//             <label className="inline-block mb-2">Social Accounts</label>
//             <span className="w-5 h-5"></span>
//             <div className="space-y-8">
//               <div className="flex items-center gap-2">
//                 <IconFacebook className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100" />
//                 <div className="w-[450px]">
//                   <InputField
//                     type="text"
//                     name="facebook"
//                     placeholder="Enter facebook profile"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <IconTwitter className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100" />
//                 <div className="w-[450px]">
//                   <InputField
//                     type="text"
//                     name="twitter"
//                     placeholder="Enter twitter profile"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <IconLinkedin className="w-[25px] h-[25px] fill-gray-800 dark:fill-gray-100" />
//                 <div className="w-[450px]">
//                   <InputField
//                     type="text"
//                     name="linkedin"
//                     placeholder="Enter linkedin profile"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-end">
//             <Button
//               type="submit"
//               className="min-w-[120px]"
//               aria-label="save"
//               disabled={isSubmitting}
//             >
//               Save
//             </Button>
//           </div>
//         </form>
//       </FormProvider>
//     </div>
//   );
// }

// export default EditProfileForm;
