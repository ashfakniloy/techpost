"use client";

import {
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
  Area,
} from "recharts";

import { useTheme } from "next-themes";
import SectionChart from "@/components/Admin/SectionChart";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PostsOverviewProps = {
  name: string;
  total: number;
};

function PostsOverview({
  firstYear,
  postsData,
}: {
  firstYear: number;
  postsData: PostsOverviewProps[];
}) {
  // console.log("postsData", postsData);

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
    newParam.set("posts", value.toString());
    router.replace(`${pathname}?${newParam}`, { scroll: false });
  };

  const posts = searchParams?.get("posts");
  const currentYear = new Date().getFullYear();

  const selectedYear = posts ? Number(posts) : currentYear;

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
      title="Posts Overview"
      selectedYear={selectedYear}
      handleYear={handleYear}
      firstYear={firstYear}
    >
      <ResponsiveContainer width="100%" height={400} minWidth={600}>
        <AreaChart
          data={postsData}
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

          <Area
            type="linear"
            dataKey="total"
            fill="#3498db"
            fillOpacity={0.2}
            stroke="#3498db"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </SectionChart>
  );
}

export default PostsOverview;
