"use client";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import { Poppins } from "next/font/google";
import { useEffect } from "react";
import axios from "axios";

const inter = Poppins({
  subsets: ["latin"],
  weight: "200",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    setInterval(() => {
      axios
        .post(
          `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
          {
            nallaData: "",
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => {
          // console.log(res);
        })
        .catch((e) => {
          // console.log(e);
        });
    }, 270000);
  }, []);

  return (
    <html lang="en">
      <body className={`font-sans ${inter.className}`}>
        <div className="w-screen bg-[#2463EB] h-auto flex items-center justify-center font-bold">*For Internal Testing Purposes Only*</div>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
