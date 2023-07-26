import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type ModalProps = {
  title: string;
  showModal: boolean;
  isPending: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAction: () => Promise<void>;
  color?: string;
  colorDark?: string;
};

function Modal({
  title,
  showModal,
  isPending,
  setShowModal,
  handleAction,
  color = "bg-gray-50 ",
  colorDark = "dark:bg-custom-gray6",
}: ModalProps) {
  return (
    <AlertDialog open={showModal || isPending} onOpenChange={setShowModal}>
      {/* <AlertDialogContent className="bg-gray-50 dark:bg-custom-gray6"> */}
      <AlertDialogContent className={`${color} ${colorDark}`}>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            className="border dark:border-gray-600 bg-transparent dark:hover:bg-gray-600"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleAction}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Modal;
