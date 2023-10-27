import { Loader } from "@/components/Loaders/Loader";

function LoadingCategory() {
  return (
    <div className="absolute min-h-screen inset-0 flex justify-center items-center">
      <div className="opacity-60">
        <Loader width="50" />
      </div>
    </div>
  );
}

export default LoadingCategory;
