export const PER_PAGE = 10;

export const BASE_URL =
  process.env.NODE_ENV !== "development"
    ? "https://techpost.vercel.app"
    : "http://localhost:3000";
