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
  title: string | JSX.Element;
  showModal: boolean;
  isPending: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleAction: () => void;
  color?: string;
  colorDark?: string;
  as?: string;
};

function Modal({
  title,
  showModal,
  isPending,
  setShowModal,
  handleAction,
  as = "Delete",
  color = "bg-gray-50 ",
  colorDark = "dark:bg-custom-gray6",
}: ModalProps) {
  return (
    <AlertDialog open={showModal || isPending} onOpenChange={setShowModal}>
      {/* <AlertDialogContent className="bg-gray-50 dark:bg-custom-gray6"> */}
      <AlertDialogContent className={`${color} ${colorDark}`}>
        <AlertDialogHeader className="lg:max-w-[470px] break-words">
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            className="border dark:border-gray-600 bg-transparent dark:hover:bg-gray-600"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            disabled={isPending}
            onClick={handleAction}
            className="capitalize"
          >
            {as}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Modal;
