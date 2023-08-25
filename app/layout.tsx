import { Roboto, Montserrat, Inter } from "next/font/google";
import SessionProvider from "@/components/Session";
import ToastNotification from "@/components/ToastNotification";
import ThemeWrapper from "@/components/Theme/ThemeWrapper";
import Log from "@/components/Log";
import { BASE_URL } from "@/config";
import "./globals.css";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Techpost",
    template: `%s | Techpost`,
  },
  description:
    "Unlock the world of technology with engaging and informative blog. Explore the latest trends and news",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const dark = '#121212'
  // const dark2 = '#1B1A1A'

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`text-black dark:text-gray-50 bg-gray-100 dark:bg-custom-gray ${roboto.variable} ${montserrat.variable} ${inter.className}`}
      >
        <ThemeWrapper>
          <ToastNotification
            toastOptions={{
              duration: 3000,
            }}
          />
          <div className="break-words">
            <SessionProvider>{children}</SessionProvider>
          </div>
        </ThemeWrapper>
        <Log />
      </body>
    </html>
  );
}
