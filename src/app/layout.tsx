import type { Metadata } from "next";
import "./styling/globals.css";
import {Footer} from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import QueryClientProvider from "@/app/providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased min-h-screen flex flex-col justify-between`}
      >
      <QueryClientProvider >
          <Header />
          <main className={"flex-grow"}>{children}</main>
          <Footer />
      </QueryClientProvider>
      </body>
    </html>
  );
}
