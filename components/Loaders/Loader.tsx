"use client";

import { useTheme } from "next-themes";
import { ProgressBar, RotatingLines } from "react-loader-spinner";

export const Loader = ({
  width,
  strokeColor,
}: {
  width: string;
  strokeColor?: string;
}) => {
  const { systemTheme, theme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const colorByTheme = currentTheme === "dark" ? "black" : "white";

  return (
    <RotatingLines
      strokeColor={strokeColor || colorByTheme}
      strokeWidth="3"
      animationDuration="0.75"
      width={width}
      visible={true}
    />
  );
};

export const Loader2 = ({ width }: { width: string }) => {
  return (
    <div className="!text-blue-500 !fill-blue-500 !stroke-blue-500">
      <RotatingLines
        strokeWidth="3"
        animationDuration="0.75"
        width={width}
        visible={true}
      />
    </div>
  );
};

export const Loader3 = ({ width }: { width: string }) => {
  return (
    <ProgressBar
      // height="60"
      width={width}
      ariaLabel="progress-bar-loading"
      wrapperStyle={{}}
      wrapperClass="progress-bar-wrapper"
      borderColor="#F4442E"
      barColor="#51E5FF"
    />
  );
};
