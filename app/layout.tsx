import SessionProvider from "@/components/Session";
import ToastNotification from "@/components/ToastNotification";
import { Roboto, Montserrat, Inter } from "next/font/google";
import "./globals.css";
import ThemeWrapper from "@/components/Theme/ThemeWrapper";
import Log from "@/components/Log";

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
  title: "NextJS 13 Fullstack Blog Website",
  description: "A fullstack blog website using nextjs app directory.",
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
          <div className="">
            <SessionProvider>{children}</SessionProvider>
          </div>
        </ThemeWrapper>
        <Log />
      </body>
    </html>
  );
}
