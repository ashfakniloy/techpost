function CancelButton({
  setMenu,
  isSubmitting,
}: {
  setMenu: React.Dispatch<React.SetStateAction<string>>;
  isSubmitting: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => setMenu("")}
      className="px-4 py-2.5 rounded-md text-sm lg:min-w-[100px] text-white font-bold bg-gray-600 dark:bg-gray-500 disabled:opacity-70 disabled:cursor-not-allowed"
      disabled={isSubmitting}
    >
      Cancel
    </button>
  );
}

export default CancelButton;
