import { cn } from "@/lib/utils";

function Section({
  title,
  children,
  className,
}: {
  title: string | JSX.Element;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-gray-50 dark:bg-custom-gray6 p-6 rounded-lg shadow-md",
        className
      )}
    >
      <h3 className="text-xl font-montserrat font-semibold capitalize">
        {title}
      </h3>
      <div className="mt-6">{children}</div>
    </div>
  );
}

export default Section;
