import { Loader } from "@/components/Loaders/Loader";

function AddOrEditLoading() {
  return (
    <div className="min-h-[calc(100dvh-100px)] lg:min-h-[calc(100vh-100px)] flex justify-center items-center">
      <div className="opacity-60">
        <Loader width="50" />
      </div>
    </div>
  );
}

export default AddOrEditLoading;
