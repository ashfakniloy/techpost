import { Loader2 } from "@/components/Loaders/Loader";

function AddOrEditLoading() {
  return (
    <div className="min-h-[calc(100dvh-100px)] lg:min-h-[calc(100vh-100px)] flex justify-center items-center">
      <Loader2 width="50" />
    </div>
  );
}

export default AddOrEditLoading;
