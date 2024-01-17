"use client";

import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
  // CartesianGrid,
} from "recharts";

import { useTheme } from "next-themes";
import SectionChart from "@/components/Admin/SectionChart";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type ViewsOverviewProps = {
  name: string;
  total: number;
};

function ViewsOverview({
  firstYear,
  viewsData,
}: {
  firstYear: number;
  viewsData: ViewsOverviewProps[];
}) {
  // console.log("viewsData", viewsData);

  // const mockData = [
  //   { name: "Jan", total: 103 },
  //   { name: "Feb", total: 254 },
  //   { name: "Mar", total: 480 },
  //   { name: "Apr", total: 363 },
  //   { name: "May", total: 272 },
  //   { name: "Jun", total: 820 },
  //   { name: "Jul", total: 694 },
  //   { name: "Aug", total: 581 },
  //   { name: "Sep", total: 270 },
  //   { name: "Oct", total: 702 },
  //   { name: "Nov", total: 652 },
  //   { name: "Dec", total: 589 },
  // ];

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const strokeColor = currentTheme === "dark" ? "#ffffff" : "#000000";

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const newParam = new URLSearchParams(searchParams.toString());

  const handleYear = (value: string) => {
    // console.log("year selected");
    newParam.set("views", value.toString());
    router.replace(`${pathname}?${newParam}`, { scroll: false });
  };

  const views = searchParams?.get("views");
  const currentYear = new Date().getFullYear();

  const selectedYear = views ? Number(views) : currentYear;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-custom-gray5 p-4 rounded-lg text-gray-900 dark:text-gray-50 text-sm font-medium shadow-md">
          <p className="label">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <SectionChart
      title="Posts Views Overview"
      selectedYear={selectedYear}
      handleYear={handleYear}
      firstYear={firstYear}
    >
      <ResponsiveContainer width="100%" height={400} minWidth={600}>
        <AreaChart
          data={viewsData}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          <XAxis
            dataKey="name"
            stroke={strokeColor}
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke={strokeColor}
            fontSize={12}
            tickLine={false}
            axisLine={false}
            allowDecimals={false}
            // tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ opacity: "70%" }} />
          {/* <CartesianGrid
            vertical={false}
            stroke="#14b8a6"
            strokeOpacity={0.2}
          /> */}

          <Area
            type="linear"
            dataKey="total"
            fill="#14b8a6"
            fillOpacity={0.2}
            stroke="#14b8a6"
            strokeWidth={2}
            // dot={true}
          />
        </AreaChart>
      </ResponsiveContainer>
    </SectionChart>
  );
}

export default ViewsOverview;
