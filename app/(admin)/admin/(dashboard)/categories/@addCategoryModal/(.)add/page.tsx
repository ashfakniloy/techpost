// "use client";

// import { useRouter } from "next/navigation";

function AddCategoryModalPage() {
  // const router = useRouter();

  return (
    <div className="absolute bg-black/50 backdrop-blur-sm inset-0">
      <div className="flex justify-center my-28">
        <div className="bg-custom-gray6 p-10 rounded-lg h-[800px] w-[700px]">
          <h1 className="text-3xl font-bold text-center">Add new category</h1>
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModalPage;
