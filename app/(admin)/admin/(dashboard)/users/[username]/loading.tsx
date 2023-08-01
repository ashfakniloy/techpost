import { Loader2 } from "@/components/Loaders/Loader";

function LoadingAdmin() {
  return (
    <div className="absolute inset-0 flex justify-center items-center">
      <Loader2 width="50" />
    </div>
  );
}

export default LoadingAdmin;
