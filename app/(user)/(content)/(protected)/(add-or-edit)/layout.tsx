function AddPostLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="lg:flex justify-between items-start gap-5 relative">
        <div className="lg:flex-1 lg:max-w-[796px]">{children}</div>

        <div className="hidden lg:w-[380px]"></div>
      </div>
    </div>
  );
}

export default AddPostLayout;
