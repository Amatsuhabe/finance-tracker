import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  SidebarProvider,
} from "@/components/ui/sidebar"
import "./globals.css";
import Header from "@/components/header";
import AppSidebar from "@/components/app-sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finio - Personal Finance Tracker",
  description: "Track your income, expenses, and budgets in one place",
  generator: "Next.js"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-background dark`}
    >
      <body className="min-h-full">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
