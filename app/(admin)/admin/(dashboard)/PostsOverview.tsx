// "use client";

// import {
//   Bar,
//   BarChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
//   Legend,
// } from "recharts";
// import Section from "@/components/Admin/Section";
// import { useTheme } from "next-themes";
// import SectionChart from "@/components/Admin/SectionChart";

// type PostsOverviewProps = {
//   name: string;
//   total: number;
// };

// function PostsOverview({ postsData }: { postsData: PostsOverviewProps[] }) {
//   // console.log("postsData", postsData);

//   const mockData = [
//     { name: "Jan", total: 103 },
//     { name: "Feb", total: 254 },
//     { name: "Mar", total: 480 },
//     { name: "Apr", total: 363 },
//     { name: "May", total: 272 },
//     { name: "Jun", total: 739 },
//     { name: "Jul", total: 694 },
//     { name: "Aug", total: 581 },
//     { name: "Sep", total: 270 },
//     { name: "Oct", total: 702 },
//     { name: "Nov", total: 652 },
//     { name: "Dec", total: 589 },
//   ];

//   const { systemTheme, theme } = useTheme();
//   const currentTheme = theme === "system" ? systemTheme : theme;
//   const strokeColor = currentTheme === "dark" ? "#ffffff" : "#000000";

//   const CustomTooltip = ({ active, payload, label }: any) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="bg-white dark:bg-custom-gray5 p-4 rounded-lg text-gray-900 dark:text-gray-50 text-sm font-medium shadow-md">
//           <p className="label">{`${label} : ${payload[0].value}`}</p>
//         </div>
//       );
//     }

//     return null;
//   };

//   return (
//     <SectionChart title="Posts Overview" className="">
//       <ResponsiveContainer width="100%" height={400}>
//         <BarChart
//           data={postsData}
//           margin={{
//             top: 0,
//             right: 0,
//             left: -20,
//             bottom: 0,
//           }}
//         >
//           <XAxis
//             dataKey="name"
//             stroke={strokeColor}
//             fontSize={12}
//             tickLine={false}
//             axisLine={false}
//             className="px-0"
//           />
//           <YAxis
//             stroke={strokeColor}
//             fontSize={12}
//             tickLine={false}
//             axisLine={false}
//             tickFormatter={(value) => `${value}`}
//             allowDecimals={false}
//             className="px-0"
//           />
//           <Tooltip content={<CustomTooltip />} cursor={{ opacity: "20%" }} />
//           {/* <Tooltip contentStyle={{ color: "red" }} /> */}
//           {/* <Legend /> */}

//           <Bar dataKey="total" fill="#3498db" radius={[4, 4, 0, 0]} />
//         </BarChart>
//       </ResponsiveContainer>
//     </SectionChart>
//   );
// }

// export default PostsOverview;

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

type PostsOverviewProps = {
  name: string;
  total: number;
};

function PostsOverview({ postsData }: { postsData: PostsOverviewProps[] }) {
  // console.log("postsData", postsData);

  const mockData = [
    { name: "Jan", total: 103 },
    { name: "Feb", total: 254 },
    { name: "Mar", total: 480 },
    { name: "Apr", total: 363 },
    { name: "May", total: 272 },
    { name: "Jun", total: 820 },
    { name: "Jul", total: 694 },
    { name: "Aug", total: 581 },
    { name: "Sep", total: 270 },
    { name: "Oct", total: 702 },
    { name: "Nov", total: 652 },
    { name: "Dec", total: 589 },
  ];

  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const strokeColor = currentTheme === "dark" ? "#ffffff" : "#000000";

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
    <SectionChart title="Posts Overview" className="">
      <ResponsiveContainer width="100%" height={400}>
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
