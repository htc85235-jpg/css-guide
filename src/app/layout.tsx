import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSS GUIDE — Pakistan Civil Superior Services Exam Hub",
  description:
    "Your complete companion for Pakistan's CSS competitive examination. Syllabus, subject details, exam schedule, preparation strategy, toppers' stories, motivational guidance and everything an aspirant needs.",
  keywords: [
    "CSS",
    "CSS Exam Pakistan",
    "CSS Syllabus",
    "FPSC",
    "Civil Superior Services",
    "Pakistan Competitive Exam",
    "CSS Preparation",
    "CSS Optional Subjects",
    "CSS Compulsory Subjects",
  ],
  authors: [{ name: "CSS GUIDE Team" }],
  icons: {
    icon: "/css-guide/logo.svg",
    shortcut: "/css-guide/logo.svg",
    apple: "/css-guide/logo.svg",
  },
  openGraph: {
    title: "CSS GUIDE — Pakistan CSS Exam Complete Resource",
    description:
      "Syllabus, subjects, exam details, preparation tips, and motivation for Pakistan CSS aspirants.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
