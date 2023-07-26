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
    <div className={cn("bg-custom-gray6 p-6 rounded-lg", className)}>
      <h3 className="text-xl font-semibold capitalize">{title}</h3>
      <div className="mt-10">{children}</div>
    </div>
  );
}

export default Section;
