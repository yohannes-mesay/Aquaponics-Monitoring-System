"use client";

import { Roboto_Mono } from "next/font/google";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={` ${geistMono.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
