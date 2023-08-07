import { Loader2 } from "@/components/Loaders/Loader";

function LoadingCategory() {
  return (
    <div className="absolute min-h-screen inset-0 flex justify-center items-center">
      <Loader2 width="50" />
    </div>
  );
}

export default LoadingCategory;
