"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { DynamicField } from "@/components/Form/DynamicField";
import { ImageField } from "@/components/Form/ImageField";
import { InputField } from "@/components/Form/InputField";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CategoryOptionProps } from "./CategoryOption";
import { CategoryFormProps, categorySchema } from "@/schemas/categorySchema";
import { editCategory } from "@/db/mutations/admin/editCategory";

type EditCategoryProps = CategoryOptionProps & {
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function EditCategory({
  id,
  name,
  imageUrl,
  imageId,
  quotes,
  setShowEditModal,
}: EditCategoryProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const defaultValues = {
    name: name,
    imageUrl: imageUrl,
    imageId: imageId,
    quotes: quotes?.length ? quotes : [{ quote: "", author: "" }],
  };

  const form = useForm<CategoryFormProps>({
    // defaultValues,
    values: defaultValues,
    resolver: zodResolver(categorySchema),
  });

  // with server action
  const onSubmit = async (values: CategoryFormProps) => {
    // console.log(values);
    // return;

    setIsSubmitting(true);
    const toastCategoryAdd = toast.loading("Loading...");

    const result = await editCategory({ values, categoryId: id });

    console.log("result", result);

    if (result.success) {
      toast.success(result.success, {
        id: toastCategoryAdd,
      });

      form.reset();
      router.replace(`/admin/categories/${result.data.name.toLowerCase()}`);
    } else if (result.error) {
      toast.error(result.error, {
        id: toastCategoryAdd,
      });
    } else {
      toast.error("Error", {
        id: toastCategoryAdd,
      });
    }

    setShowEditModal(false);
    setIsSubmitting(false);
  };

  return (
    <>
      <button
        type="button"
        title="Close"
        className="absolute top-2 right-2 rounded-full overflow-hidden flex justify-end hover:scale-110 transition-transform duration-100 disabled:cursor-not-allowed"
        onClick={() => setShowEditModal(false)}
        disabled={isSubmitting}
      >
        <XCircleIcon className="w-7 h-7" />
      </button>

      <h1 className="text-2xl font-bold text-center">Edit category</h1>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <ScrollArea>
            <div className="max-h-[60dvh] lg:max-h-[60vh] px-6 space-y-5">
              <InputField type="text" label="Category Name" name="name" />

              <ImageField label="Image" name="imageUrl" isAdmin />

              <DynamicField
                name="quotes"
                optionNames={["quote", "author"]}
                labels={["Quote", "Author"]}
                type="text"
                maxLength={20}
              />
            </div>
          </ScrollArea>

          <div className="flex justify-between pt-7 gap-8 px-6">
            <Button
              type="button"
              onClick={() => setShowEditModal(false)}
              variant="outline"
              className="w-full border-gray-700 dark:border-gray-400"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </form>
      </FormProvider>
    </>
  );
}

export default EditCategory;

// // with route handler
// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { FormProvider, useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { DynamicField } from "@/components/Form/DynamicField";
// import { ImageField } from "@/components/Form/ImageField";
// import { InputField } from "@/components/Form/InputField";
// import { Button } from "@/components/ui/button";
// import { XCircleIcon } from "@heroicons/react/24/outline";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import type { CategoryOptionProps } from "./CategoryOption";
// import { CategoryFormProps, categorySchema } from "@/schemas/categorySchema";
// import { editCategory } from "@/actions/editCategory";

// type EditCategoryProps = CategoryOptionProps & {
//   setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
// };

// function EditCategory({
//   id,
//   name,
//   imageUrl,
//   imageId,
//   quotes,
//   setShowEditModal,
// }: EditCategoryProps) {
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const router = useRouter();

//   const defaultValues = {
//     name: name,
//     imageUrl: imageUrl,
//     imageId: imageId,
//     quotes: quotes?.length ? quotes : [{ quote: "", author: "" }],
//   };

//   const form = useForm<CategoryFormProps>({
//     // defaultValues,
//     values: defaultValues,
//     resolver: zodResolver(categorySchema),
//   });

//   const onSubmit = async (values: CategoryFormProps) => {
//     // console.log(values);
//     // return;

//     setIsSubmitting(true);
//     const toastCategoryAdd = toast.loading("Loading...");

//     const url = `/api/admin/category?categoryId=${id}`;

//     const response = await fetch(url, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       form.reset();

//       router.refresh();

//       toast.success("Category updated successfully", {
//         id: toastCategoryAdd,
//       });
//       console.log("success", data);

//       router.replace(`/admin/categories/${data.response.name.toLowerCase()}`);
//       setShowEditModal(false);
//     } else {
//       toast.error(`${data.error}`, {
//         id: toastCategoryAdd,
//       });
//       console.log("error", data);
//     }

//     setIsSubmitting(false);

//     // router.push("/add-post/preview");
//   };

//   // const onSubmit = async (values: CategoryFormProps) => {
//   //   // console.log(values);
//   //   // return;
//   //   setIsSubmitting(true);
//   //   const toastCategoryAdd = toast.loading("Loading...");

//   //   const response = await editCategory({ categoryId: id, values: values });

//   //   if (response.success) {
//   //     form.reset();
//   //     router.refresh();

//   //     toast.success("Category updated successfully", {
//   //       id: toastCategoryAdd,
//   //     });
//   //     console.log("success", response.success);

//   //     router.replace(`/admin/categories/${response.data.name.toLowerCase()}`);
//   //     setShowEditModal(false);
//   //   } else {
//   //     toast.error(`${response.error}`, {
//   //       id: toastCategoryAdd,
//   //     });
//   //     console.log("error", response.data);
//   //   }

//   //   setIsSubmitting(false);

//   //   // router.push("/add-post/preview");
//   // };

//   return (
//     <>
//       <button
//         type="button"
//         title="Close"
//         className="absolute top-2 right-2 rounded-full overflow-hidden flex justify-end hover:scale-110 transition-transform duration-100 disabled:cursor-not-allowed"
//         onClick={() => setShowEditModal(false)}
//         disabled={isSubmitting}
//       >
//         <XCircleIcon className="w-7 h-7" />
//       </button>

//       <h1 className="text-2xl font-bold text-center">Edit category</h1>

//       <FormProvider {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
//           <ScrollArea>
//             <div className="max-h-[60dvh] lg:max-h-[60vh] px-6 space-y-5">
//               <InputField type="text" label="Category Name" name="name" />

//               <ImageField label="Image" name="imageUrl" isAdmin />

//               {/* <DynamicField
//                label="Quote"
//               type="text"
//               name="contactNo"
//               optionName="number"
//               maxLength={4} /> */}

//               <DynamicField
//                 name="quotes"
//                 optionNames={["quote", "author"]}
//                 labels={["Quote", "Author"]}
//                 type="text"
//                 maxLength={20}
//               />
//             </div>
//           </ScrollArea>

//           <div className="flex justify-between pt-7 gap-8 px-6">
//             <Button
//               type="button"
//               onClick={() => setShowEditModal(false)}
//               // className="w-full bg-emerald-700 hover:bg-emerald-600 text-white"
//               variant="outline"
//               className="w-full border-gray-700 dark:border-gray-400"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </Button>
//             <Button type="submit" className="w-full" disabled={isSubmitting}>
//               Submit
//             </Button>
//           </div>
//         </form>
//       </FormProvider>
//     </>
//   );
// }

// export default EditCategory;
