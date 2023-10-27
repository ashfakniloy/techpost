"use client";

import { ProgressBar, RotatingLines } from "react-loader-spinner";

export const Loader = ({ width }: { width: string }) => {
  return (
    <RotatingLines
      strokeColor="currentColor"
      strokeWidth="3"
      animationDuration="0.75"
      width={width}
      visible={true}
    />
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
