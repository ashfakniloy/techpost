import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

function SectionChart({
  title,
  children,
  handleYear,
  selectedYear,
  firstYear,
  className,
}: {
  title: string | JSX.Element;
  children: React.ReactNode;
  handleYear: (value: string) => void;
  selectedYear: number;
  firstYear: number;
  className?: string;
}) {
  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - firstYear + 1 },
    (_, index) => firstYear + index
  );

  return (
    <div
      className={cn(
        "bg-gray-50 dark:bg-custom-gray6 p-4 lg:p-6 rounded-lg shadow-md",
        className
      )}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-montserrat font-semibold capitalize">
          {title}
        </h3>

        <div className="flex items-center gap-3">
          <p>Year:</p>
          <Select value={selectedYear?.toString()} onValueChange={handleYear}>
            <SelectTrigger className="w-[90px]">
              <SelectValue placeholder={currentYear.toString()} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {years &&
                  years.map((year, i) => (
                    <SelectItem key={i} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="mt-6 overflow-x-auto">{children}</div>
    </div>
  );
}

export default SectionChart;
