import { Suspense } from "react";
import MyProfileNav from "./MyProfileNav";
import MyProfileSideSection from "./MyProfileSideSection";
import UserCardSkeleton from "@/components/Skeleton/UserCardSkeleton";

function MyProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative grid grid-cols-1 lg:flex  items-start justify-between gap-5">
      <div className="lg:flex-1 lg:max-w-[796px]">
        <MyProfileNav />

        <div className="mt-7">{children}</div>
      </div>

      <div className="-order-1 lg:order-none lg:sticky lg:top-[94px]">
        <Suspense fallback={<UserCardSkeleton />}>
          <MyProfileSideSection />
        </Suspense>
      </div>
    </div>
  );
}

export default MyProfileLayout;
