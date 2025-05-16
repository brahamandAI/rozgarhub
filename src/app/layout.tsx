import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import Navbar from "@/components/layout/navbar";
import FooterWrapper from "@/components/layout/footer-wrapper";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "RozgarHub - Find Your Dream Job",
  description: "A modern job portal to connect job seekers with employers",
  keywords: ["jobs", "career", "employment", "recruitment", "hiring", "job portal"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased min-h-screen bg-gradient-to-b from-background to-background/95`}
      >
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
          <div className="flex flex-col min-h-screen relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />
            <Navbar />
            <main className="flex-grow relative z-10">
              {children}
            </main>
            <FooterWrapper />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
