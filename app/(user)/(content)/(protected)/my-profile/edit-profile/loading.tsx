import { Loader2 } from "@/components/Loaders/Loader";
import React from "react";

function EditProfileLoadingPage() {
  return (
    <div className="min-h-[100px] lg:min-h-[760px] flex justify-center mt-20 lg:mt-[300px]">
      <Loader2 width="50" />
    </div>
  );
}

export default EditProfileLoadingPage;
