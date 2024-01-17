import TechpostLogo from "@/components/Layout/TechpostLogo";

function UserAuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="mt-10 flex justify-center">
        <TechpostLogo />
      </div>
      <div className="my-10 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

export default UserAuthLayout;
