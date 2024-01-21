import { Open_Sans, Montserrat } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import SessionProvider from "@/components/Session";
import ToastNotification from "@/components/ToastNotification";
import ThemeWrapper from "@/components/Theme/ThemeWrapper";
import { BASE_URL } from "@/config";
import Log from "@/components/Log";
import "./globals.css";

const openSans = Open_Sans({ subsets: ["latin"] });

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Techpost",
    template: `%s | Techpost`,
  },
  description:
    "Unlock the world of technology with engaging and informative blog. Explore the latest trends and news.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`text-black dark:text-gray-50 bg-gray-100 dark:bg-custom-gray ${openSans.className} ${montserrat.variable}`}
      >
        <ThemeWrapper>
          <ToastNotification
            toastOptions={{
              duration: 3000,
            }}
          />
          <SessionProvider>
            <div className="break-words">{children}</div>
          </SessionProvider>
        </ThemeWrapper>
        <Log />
        <Analytics />
      </body>
    </html>
  );
}
