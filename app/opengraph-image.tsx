import { ImageResponse } from "next/og";
import { BASE_URL } from "@/config";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "techpost";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div tw="bg-lime-500 w-full h-full flex flex-col justify-center items-center">
        <div tw="w-[70%] flex justify-center items-center rounded-3xl overflow-hidden">
          <img src={`${BASE_URL}/images/techpost-logo.png`} alt="logo" />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
