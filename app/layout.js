import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CinematicHeroBackdrop from "@/components/home/CinematicHeroBackdrop";
import Navbar from "@/components/Navbar/navbar";
import PortfolioProviderWrapper from "@/components/PortfolioProvider";
import ThemeInit from "@/components/ThemeInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Umme Habiba",
  description:
    "This portfolio is made to showcase my work and my experience over the years",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} theme-light px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 h-full antialiased`}
    >
      <body className="relative flex min-h-dvh flex-col overflow-x-hidden overflow-y-auto">
        <ThemeInit />
        <CinematicHeroBackdrop />
        <Navbar />
        <PortfolioProviderWrapper>
          <main className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</main>
        </PortfolioProviderWrapper>
      </body>
    </html>
  );
}
