import { Loader2 } from "../Loaders/Loader";

function SubmitButton({
  name,
  isSubmitting,
  color,
}: {
  name: string;
  isSubmitting: boolean;
  color?: "blue" | "red";
}) {
  return (
    <button
      type="submit"
      className={`relative px-2 py-2.5 text-sm font-bold disabled:opacity-70 disabled:cursor-not-allowed  lg:min-w-[100px] rounded-md bg-gray-900 dark:bg-gray-50 text-gray-100 dark:text-gray-900 ${
        isSubmitting && "animate-pulse"
      }`}
      disabled={isSubmitting}
    >
      <span className="capitalize">{name}</span>
    </button>
  );
}

export default SubmitButton;
