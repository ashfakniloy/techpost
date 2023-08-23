export const metadata = {
  title: "Admin dashboard",
  description: "Admin dashboard for techpost",
};

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100 dark:bg-custom-gray5 min-h-screen">
      {children}
    </div>
  );
}

export default AdminLayout;
