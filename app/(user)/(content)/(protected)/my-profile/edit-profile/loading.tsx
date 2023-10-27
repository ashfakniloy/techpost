import { Loader } from "@/components/Loaders/Loader";

function EditProfileLoadingPage() {
  return (
    <div className="min-h-[100px] lg:min-h-[760px] flex justify-center mt-20 lg:mt-[300px]">
      <div className="opacity-60">
        <Loader width="50" />
      </div>
    </div>
  );
}

export default EditProfileLoadingPage;
