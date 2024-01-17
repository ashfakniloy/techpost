"use client";

import { DynamicField } from "@/components/Form/DynamicField";
import { ImageField } from "@/components/Form/ImageField";
import { InputField } from "@/components/Form/InputField";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CategoryFormProps, categorySchema } from "@/schemas/categorySchema";
import { addCategory } from "@/db/mutations/admin/addCategory";

function AddCategory() {
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const defaultValues = {
    name: "",
    imageUrl: "",
    imageId: "",
    quotes: [{ quote: "", author: "" }],
  };

  const form = useForm<CategoryFormProps>({
    defaultValues,
    resolver: zodResolver(categorySchema),
  });

  // with server action
  const onSubmit = async (values: CategoryFormProps) => {
    // console.log(values);
    // return;
    setIsSubmitting(true);
    const toastCategoryAdd = toast.loading("Loading...");

    const result = await addCategory({ values });

    console.log("result", result);

    if (result.success) {
      toast.success(result.success, {
        id: toastCategoryAdd,
      });

      form.reset();
    } else if (result.error) {
      toast.error(result.error, {
        id: toastCategoryAdd,
      });
    } else {
      toast.error("Error", {
        id: toastCategoryAdd,
      });
    }

    setShowModal(false);
    setIsSubmitting(false);
  };

  return (
    <AlertDialog open={showModal} onOpenChange={setShowModal}>
      <AlertDialogTrigger asChild>
        <Button variant="default">Add category</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="relative bg-gray-50 dark:bg-custom-gray6 py-10 px-0 rounded-lg max-w-[700px]">
        <button
          type="button"
          title="Close"
          className="absolute top-2 right-2 rounded-full overflow-hidden flex justify-end hover:scale-110 transition-transform duration-100 disabled:cursor-not-allowed"
          onClick={() => setShowModal(false)}
          disabled={isSubmitting}
        >
          <XCircleIcon className="w-7 h-7" />
        </button>

        <h1 className="text-2xl font-bold text-center">Add new category</h1>

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <ScrollArea>
              <div className="max-h-[60dvh] lg:max-h-[60vh] px-6 space-y-5">
                <InputField type="text" label="Category Name" name="name" />
                <ImageField label="Image" name="imageUrl" isAdmin />
                {/* <DynamicField
               label="Quote"
              type="text"
              name="contactNo"
              optionName="number"
              maxLength={4} /> */}
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
                onClick={() => setShowModal(false)}
                // className="w-full bg-emerald-700 hover:bg-emerald-600 text-white"
                variant="outline"
                className="w-full border-gray-700 dark:border-gray-400"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Add
              </Button>
            </div>
          </form>
        </FormProvider>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AddCategory;

// // with route handler
// "use client";

// import { DynamicField } from "@/components/Form/DynamicField";
// import { ImageField } from "@/components/Form/ImageField";
// import { InputField } from "@/components/Form/InputField";
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { XCircleIcon } from "@heroicons/react/24/outline";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { FormProvider, useForm } from "react-hook-form";
// import { toast } from "react-hot-toast";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { CategoryFormProps, categorySchema } from "@/schemas/categorySchema";

// function AddCategory() {
//   const [showModal, setShowModal] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const router = useRouter();

//   const defaultValues = {
//     name: "",
//     imageUrl: "",
//     imageId: "",
//     quotes: [{ quote: "", author: "" }],
//   };

//   const form = useForm<CategoryFormProps>({
//     defaultValues,
//     resolver: zodResolver(categorySchema),
//   });

//   const onSubmit = async (values: CategoryFormProps) => {
//     // console.log(values);
//     // return;
//     setIsSubmitting(true);
//     const toastCategoryAdd = toast.loading("Loading...");

//     const url = "/api/admin/category";

//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(values),
//     });

//     const data = await response.json();

//     if (response.ok) {
//       toast.success("Category created successfully", {
//         id: toastCategoryAdd,
//       });
//       console.log("success", data);

//       form.reset();
//       router.refresh();
//       setShowModal(false);
//     } else {
//       toast.error(`${data.error}`, {
//         id: toastCategoryAdd,
//       });
//       console.log("error", data);
//     }

//     setIsSubmitting(false);

//     // router.push("/add-post/preview");
//   };

//   return (
//     <AlertDialog open={showModal} onOpenChange={setShowModal}>
//       <AlertDialogTrigger asChild>
//         <Button variant="default">Add category</Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent className="relative bg-gray-50 dark:bg-custom-gray6 py-10 px-0 rounded-lg max-w-[700px]">
//         <button
//           type="button"
//           title="Close"
//           className="absolute top-2 right-2 rounded-full overflow-hidden flex justify-end hover:scale-110 transition-transform duration-100 disabled:cursor-not-allowed"
//           onClick={() => setShowModal(false)}
//           disabled={isSubmitting}
//         >
//           <XCircleIcon className="w-7 h-7" />
//         </button>

//         <h1 className="text-2xl font-bold text-center">Add new category</h1>

//         <FormProvider {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
//             <ScrollArea>
//               <div className="max-h-[60dvh] lg:max-h-[60vh] px-6 space-y-5">
//                 <InputField type="text" label="Category Name" name="name" />
//                 <ImageField label="Image" name="imageUrl" isAdmin />
//                 {/* <DynamicField
//                label="Quote"
//               type="text"
//               name="contactNo"
//               optionName="number"
//               maxLength={4} /> */}
//                 <DynamicField
//                   name="quotes"
//                   optionNames={["quote", "author"]}
//                   labels={["Quote", "Author"]}
//                   type="text"
//                   maxLength={20}
//                 />
//               </div>
//             </ScrollArea>

//             <div className="flex justify-between pt-7 gap-8 px-6">
//               <Button
//                 type="button"
//                 onClick={() => setShowModal(false)}
//                 // className="w-full bg-emerald-700 hover:bg-emerald-600 text-white"
//                 variant="outline"
//                 className="w-full border-gray-700 dark:border-gray-400"
//                 disabled={isSubmitting}
//               >
//                 Cancel
//               </Button>
//               <Button type="submit" className="w-full" disabled={isSubmitting}>
//                 Add
//               </Button>
//             </div>
//           </form>
//         </FormProvider>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// }

// export default AddCategory;
