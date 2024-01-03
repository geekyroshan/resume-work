import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RootLayout } from "@/components/layout/root-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ResumeAI - Build Professional Resumes with AI",
  description: "Create professional resumes with AI-powered optimization and suggestions. Export to PDF, DOCX, and more.",
  keywords: ["resume", "AI", "professional", "job application", "career"],
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-background font-sans antialiased`}>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
