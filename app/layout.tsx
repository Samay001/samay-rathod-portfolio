import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "Samay Rathod — Associate Software Engineer",
  description: "Portfolio of Samay Rathod: full-stack products, call and web chatbots, RAG systems, and applied AI.",
  metadataBase: new URL("https://samay-rathod.vercel.app"),
  openGraph: {
    title: "Samay Rathod — Associate Software Engineer",
    description: "Full-stack products, call and web chatbots, RAG systems, and applied AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable}`}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
